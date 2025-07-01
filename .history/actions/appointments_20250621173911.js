import { db } from "@/lib/prisma"
import { addDays, endOfDay } from "date-fns";
import { format } from  "date-fns";

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
            )
        }

    } catch (error) {
        throw new Error("Failed to fetch doctor details:", error);
    }
}