import { db } from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server";
import { addDays, addMinutes, endOfDay, format, isBefore } from "date-fns";
import { deductCreditsForAppointment } from "./credits";
import { revalidatePath } from "next/cache";
import { Auth } from "@vonage/auth";




const credentials = new Auth({
    key: process.env.NEXT_PUBLIC_VONAGE_APPLICATION_ID,
    secret: process.env.VONAGE_PRIVATE_KEY,
});


const vonage = new Vonage(credentials,{});

export const getDoctorById = async (doctorId) => {
    try {
        const doctor = await db.user.findUnique({
            where: {
                id: doctorId,
                role: "DOCTOR",
                verificationStatus: "VERIFIED",
            },
        });
        if (!doctor) {
            throw new Error("Doctor not found");
        }
        return { doctor };
    } catch (error) {
        throw new Error(`Failed to fetch doctor's details: ${error.message}`);
    }
}



export const getAvailableTimeSlots = async (doctorId) => {
    try {
        const doctor = await db.user.findUnique({
            where: {
                id: doctorId,
                role: "DOCTOR",
                verificationStatus: "VERIFIED",
            },
        });
        if (!doctor) {
            throw new Error("Doctor not found");
        }
        
        const availability = await db.availability.findFirst({
            where: {
                doctorId: doctor.id,
                status: "AVAILABLE",
            },
        });
        if (!availability) {
            throw new Error("No available time slots found");
        }


        const now = new Date();
        const days = [now,addDays(now, 1), addDays(now, 2), addDays(now, 3)];

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

        for (let day of days) {
            const dayString = format(day, "yyyy-MM-dd");
            availableSlotsByDay[dayString] = [];

            const availabilityStart = new Date(availability.startTime);
            const availabilityEnd  = new Date(availability.endTime);

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
            const end = new Date(availabilityEnd);

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
                        (current >= aStart && current < aEnd) ||
                        (next > aStart && next <= aEnd) ||
                        (current <= aStart && next >= aEnd)
                    );
                });
                if (!overlaps) {
                    availableSlotsByDay[dayString].push({
                        startTime: current.toISOString(),
                        endTime: next.toISOString(),
                        formatted: `${format(current, "h:mm a")}-${format(next,
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
        throw new Error(`Failed to fetch doctor's details: ${error.message}`);
    }
}


export const bookAppointment = async (formData)=>{
    const { userId } = await auth();
    if (!userId) {
        throw new Error("Unauthorized")
    }
    try {
        const patient = await db.user.findUnique({
            where:{
                clerkUserId:userId,
                role:"PATIENT",
            },
        });
        if (!patient) {
            throw new Error("Patient not found");
        }

        const doctorId = formData.get("doctorId");
        const startTime = new Date(formData.get("startTime"));
        const endTime = new Date(formData.get("endTime"));
        const patientDescription = formData.get("description") || null;

        if (!doctorId || !startTime || !endTime) {
            throw new Error("Doctor, start time, and end time are required");
        }

        const doctor = await db.user.findUnique({
            where: {
                id: doctorId,
                role: "DOCTOR",
                verificationStatus: "VERIFIED",
            },
        });
        if (!doctor) {
            throw new Error("Doctor not found or not verified");
        }

        if (patient.credits < 2) {
            throw new Error("Insufficient credits to book an appointment");
        }
        const overlappingAppointment = await db.appointment.findUnique({
            where: {
                doctorId: doctorId,
                status: "SCHEDULED",
                OR: [
                    {
                        startTime: {
                            lte: startTime,
                        },
                        endTime: {
                            gte: startTime,
                        },
                    },
                    {
                        startTime: {
                            lt: endTime,
                        },
                        endTime: {
                            gte: endTime,
                        },
                    },
                    {
                        startTime: {
                            gte: startTime,
                        },
                        endTime: {
                            lte: endTime,
                        },
                    }
                ],
            }
        });
        
        if (!overlappingAppointment) {
            throw new Error("This time slot is already booked");
        }

        const sessionId = await createVideoSession();

        const result = await db.$transaction(async (tx) => {
            const { success, error } = await deductCreditsForAppointment(
                patient.id,
                doctor.id
            );
            if (!success) {
                throw new Error(error || "Failed to deduct credits");
            };

            const appointment = await tx.appointment.create({
                data: {
                    patientId: patient.id,
                    doctorId: doctor.id,
                    startTime,
                    endTime,
                    patientDescription,
                    status: "SCHEDULED",
                    videoSessionId: sessionId,
                },
            });
            return { appointment };
        });
        revalidatePath("/appointments");
        return { success: true, appointment: result.appointment };
        
    } catch (error) {
        throw new Error("Failed to book appointment:" + error.message);
    }
}


export const createVideoSession = async ()=>{
    |
}