"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { VerificationStatus } from "@prisma/client";
import { addDays, addMinutes, endOfDay, isBefore, format } from "date-fns";
import { deductCreditsForAppointment } from "./credits";
import { revalidatePath } from "next/cache";
import { Auth } from "@vonage/auth";
import { Vonage } from "@vonage/server-sdk";

const credentials = new Auth({
    applicationId: process.env.NEXT_PUBLIC_VONAGE_APPLICATION_ID,
    privateKey: process.env.VONAGE_PRIVATE_KEY,
});

// vonage object initialization
const vonage = new Vonage(credentials, {});

export const getDoctorById = async (doctorId) => {
    try {
        const doctor = await db.user.findUnique({
            where: {
                id: doctorId,
                role: "DOCTOR",
                VerificationStatus: "VERIFIED" // Fixed: was VerificationStatus
            }
        });
        if (!doctor) {
            throw new Error("Doctor not found");
        }
        return { doctor };
    } catch (error) {
        console.error("Failed to fetch doctor:", error);
        throw new Error("Failed to fetch doctor details");
    }
}

export const getAvailableTimeSlots = async (doctorId) => {
    try {
        const doctor = await db.user.findUnique({
            where: {
                id: doctorId,
                role: "DOCTOR",
                VerificationStatus: "VERIFIED" // Fixed: was VerificationStatus
            }
        });
        if (!doctor) {
            throw new Error("Doctor not found or not verified");
        }

        const availability = await db.availability.findFirst({
            where: {
                doctorId: doctor.id,
                status: "AVAILABLE"
            },
        });

        if (!availability) {
            throw new Error("No availability set by doctor"); // Fixed error message
        }

        const now = new Date();
        const days = [now, addDays(now, 1), addDays(now, 2), addDays(now, 3)];
        const lastDay = endOfDay(days[3]);

        const existingAppointments = await db.appointment.findMany({
            where: {
                doctorId: doctor.id,
                status: "SCHEDULED",
                startTime: {
                    lte: lastDay,
                },
            },
        });

        const availableSlotsByDay = {};

        // Fixed: Added 'const' before 'day'
        for (const day of days) {
            const dayString = format(day, "yyyy-MM-dd");
            availableSlotsByDay[dayString] = [];

            const availabilityStart = new Date(availability.startTime);
            const availabilityEnd = new Date(availability.endTime);

            availabilityStart.setFullYear(
                day.getFullYear(),
                day.getMonth(),
                day.getDate()
            );
            availabilityEnd.setFullYear(
                day.getFullYear(),
                day.getMonth(),
                day.getDate()
            );

            let current = new Date(availabilityStart);
            const end = new Date(availabilityEnd); // Fixed: Added 'const'

            while (isBefore(addMinutes(current, 30), end) || +addMinutes(current, 30) === +end) {
                const next = addMinutes(current, 30);
                if (isBefore(current, now)) {
                    current = next;
                    continue;
                }

                const overlaps = existingAppointments.some(appointment => {
                    const aStart = new Date(appointment.startTime);
                    const aEnd = new Date(appointment.endTime);

                    return (
                        (current >= aStart && current < aEnd)
                        ||
                        (next > aStart && next <= aEnd)
                        ||
                        (current <= aStart && next >= aEnd)
                    );
                });

                if (!overlaps) {
                    availableSlotsByDay[dayString].push({
                        startTime: current.toISOString(),
                        endTime: next.toISOString(),
                        formatted: `${format(current, "h:mm a")} - ${format(
                            next,
                            "h:mm a"
                        )}`,
                        day: format(current, "EEEE, MMMM d"),
                    });
                }
                current = next;
            }
        }

        const result = Object.entries(availableSlotsByDay).map(([date, slots]) => ({
            date,
            displayDate:
                slots.length > 0
                    ? slots[0].day
                    : format(new Date(date), "EEEE, MMMM d"),
            slots,
        }));

        return { days: result };
    } catch (error) {
        console.error("Failed to fetch available slots:", error);
        throw new Error("Failed to fetch available time slots: " + error.message);
    }
}

export const bookAppointment = async (formData) => {
    const { userId } = await auth();
    if (!userId) {
        throw new Error("Unauthorized");
    }

    try {
        const patient = await db.user.findUnique({
            where: {
                clerkUserId: userId,
                role: "PATIENT",
            },
        });

        if (!patient) {
            throw new Error("Patient not found"); // Fixed capitalization
        }

        // parse the form data 
        const doctorId = formData.get("doctorId");
        const startTime = new Date(formData.get("startTime")); // Fixed: Convert to Date
        const endTime = new Date(formData.get("endTime")); // Fixed: Convert to Date
        const patientDescription = formData.get("description") || null;

        if (!doctorId || !startTime || !endTime) {
            throw new Error("Doctor, start time, and end time are required"); // Fixed grammar
        }

        const doctor = await db.user.findUnique({
            where: {
                id: doctorId,
                role: "DOCTOR",
                VerificationStatus: "VERIFIED", // Fixed: was VerificationStatus
            },
        });

        if (!doctor) {
            throw new Error("Doctor not found or not verified"); // Fixed capitalization
        }

        if (patient.credits < 2) {
            throw new Error("Insufficient credits to book an appointment");
        }

        // Fixed: Use findFirst instead of findUnique for complex OR queries
        const overlappingAppointment = await db.appointment.findFirst({
            where: {
                doctorId: doctor.id,
                status: "SCHEDULED",
                OR: [
                    {
                        // New appointment starts during an existing appointment 
                        startTime: {
                            lte: startTime,
                        },
                        endTime: {
                            gt: startTime,
                        },
                    },
                    {
                        // new appointment ends during an existing appointment 
                        startTime: {
                            lt: endTime,
                        },
                        endTime: {
                            gte: endTime,
                        },
                    },
                    {
                        // new appointment completely overlaps an existing appointment 
                        startTime: {
                            gte: startTime,
                        },
                        endTime: {
                            lte: endTime,
                        },
                    },
                ],
            },
        });

        if (overlappingAppointment) {
            throw new Error("This time slot is already booked"); // Fixed message
        }

        const sessionId = await createVideoSession();

        const { success, error } = await deductCreditsForAppointment(
            patient.id,
            doctor.id
        );

        if (!success) {
            throw new Error(error || "Failed to deduct credits");
        }

        // Fixed: Remove 'tx.' prefix and create appointment directly
        const appointment = await db.appointment.create({
            data: {
                patientId: patient.id,
                doctorId: doctor.id,
                startTime,
                endTime,
                patientDescription,
                status: "SCHEDULED",
                videoSessionId: sessionId, // store the Vonage session ID
            }
        });

        revalidatePath("/appointments");
        return { success: true, appointment: appointment };

    } catch (error) {
        console.error("Failed to book appointment:", error);
        throw new Error("Failed to book appointment: " + error.message); // Fixed error handling
    }
}

export const createVideoSession = async () => {
    try {
        const session = await vonage.video.createSession({ mediaMode: "routed" });
        return session.sessionId;
    } catch (error) {
        throw new Error("Failed to create video session: " + error.message);
    }
}

/**
 * Generate a token for a video session
 * This will be called when either doctor or patient is about to join the call
 */
export async function generateVideoToken(formData) {
    const { userId } = await auth();

    if (!userId) {
        throw new Error("Unauthorized");
    }

    try {
        const user = await db.user.findUnique({
            where: {
                clerkUserId: userId,
            },
        });

        if (!user) {
            throw new Error("User not found");
        }

        const appointmentId = formData.get("appointmentId");

        if (!appointmentId) {
            throw new Error("Appointment ID is required");
        }

        // Find the appointment and verify the user is part of it
        const appointment = await db.appointment.findUnique({
            where: {
                id: appointmentId,
            },
        });

        if (!appointment) {
            throw new Error("Appointment not found");
        }

        // Verify the user is either the doctor or the patient for this appointment
        if (appointment.doctorId !== user.id && appointment.patientId !== user.id) {
            throw new Error("You are not authorized to join this call");
        }

        // Verify the appointment is scheduled
        if (appointment.status !== "SCHEDULED") {
            throw new Error("This appointment is not currently scheduled");
        }

        // Verify the appointment is within a valid time range
        const now = new Date();
        const appointmentTime = new Date(appointment.startTime);
        const timeDifference = (appointmentTime - now) / (1000 * 60); // difference in minutes

        if (timeDifference > 30) {
            throw new Error(
                "The call will be available 30 minutes before the scheduled time"
            );
        }

        // Generate a token for the video session
        const appointmentEndTime = new Date(appointment.endTime);
        const expirationTime =
            Math.floor(appointmentEndTime.getTime() / 1000) + 60 * 60; // 1 hour after end time

        const connectionData = JSON.stringify({
            name: user.name,
            role: user.role,
            userId: user.id,
        });

        const token = vonage.video.generateClientToken(appointment.videoSessionId, {
            role: "publisher",
            expireTime: expirationTime,
            data: connectionData,
        });

        // Update the appointment with the token
        await db.appointment.update({
            where: {
                id: appointmentId,
            },
            data: {
                videoSessionToken: token,
            },
        });

        return {
            success: true,
            videoSessionId: appointment.videoSessionId,
            token: token,
        };
    } catch (error) {
        console.error("Failed to generate video token:", error);
        throw new Error("Failed to generate video token: " + error.message);
    }
}