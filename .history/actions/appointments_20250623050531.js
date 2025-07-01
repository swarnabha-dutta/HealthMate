import { db } from "@/lib/prisma"
import { VerificationStatus } from "@prisma/client";
import { addDays, addMinutes, endOfDay, isBefore } from "date-fns";
import { format } from  "date-fns";
import { deductCreditsForAppointment } from "./credits";

export const getDoctorById = async (doctorId) => {
    try {
        const doctor = await db.user.findUnique({
            where: {
                id: doctorId,
                role: "DOCTOR",
                VerificationStatus: "VERIFIED"
            }
        });
        if (!doctor) {
            throw new Error("Doctor not Found");
        }
        return { doctor };
    } catch (error) {
        throw new Error("Failed to fetch doctor details:", error);
    }
}


export const getAvailableTimeSlots = async (doctorId) => {
    try {
        const doctor = await db.user.findUnique({
            where: {
                id: doctorId,
                role: "DOCTOR",
                VerificationStatus: "VERIFIED"
            }
        });
        if (!doctor) {
            throw new Error("Doctor not Found");
        }
        const availability = await db.availability.findFirst({
            where: {
                doctorId: doctor.id,
                status: "AVAILABLE"
            },
        });

        if(!availability) {
            throw new Error("No available time slot");
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
        for (day of days) {
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
            let end = new Date(availabilityEnd);

            while (isBefore(addMinutes(current,30),end) || +addMinutes(current,30)===+end) {
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
        return { days:result };
    } catch (error) {
        throw new Error("Failed to fetch available time slot :", error);
    }
}

export const bookAppointment = async (formData)=>{
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
            throw new Error("Patient Not Found!");
        }
        // parse the form data 
        const doctorId = formData.get("doctorId");
        const startTime = formData.get("startTime");
        const endTime = formData.get("endTime");
        const patientDescription = formData.get("description") || null;



        if(!doctorId || !startTime || !endTime) {
            throw new Error("Doctor, start time and end time are required");
        }
        const doctor = await db.user.findUnique({
            where: {
                id: doctorId,
                role: "DOCTOR",
                VerificationStatus: "VERIFIED",
            },
        });

        if (!doctor) {
            throw new Error("Doctor Not Found or not verified");
        }
        if (patient.credits < 2) {
            throw new Error("Insufficient credits to book an appointment");
        }

        const overLappingAppointment = await db.appointment.findUnique({
            where: {
                doctorId: doctor.id,
                status: "SCHEDULED",
                OR: [
                    {
                        // New Appointments starts during an existing appointment 
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
                            lt:endTime,
                        },
                        endTime: {
                            gte:endTime,
                        },
                    },
                    {
                        // new Appointment completely overlaps an existing appointment 
                        startTime: {
                            gte:startTime,
                        },
                        endTime: {
                            lte:endTime,
                        },
                    },
                ],
            },
        });
        if (overLappingAppointment) {
            throw new Error("This time is already booked");
        }
        const sessionId = await createVideoSession();
        const result = await db.$transaction(async (tx) => {
            const {success,error} = await deductCreditsForAppointment
        })
    } catch (error) {
        
    }
}


export const createVideoSession = async () => {
    
}