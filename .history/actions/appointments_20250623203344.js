import { db } from "@/lib/prisma"
import { VerificationStatus } from "@prisma/client"


export const getDoctorById = async (doctorId) => {
    try {
        const doctor = await db.user.findUnique({
            where: {
                id: doctorId,
                role: "DOCTOR",
                VerificationStatus: "VERIFIED",
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
                VerificationStatus: "VERIFIED",
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
        const days = [now,addDays(now, 1), addDays(now, 2), addDays(now, 3), addDays(now, 4), addDays(now, 5), addDays(now, 6)];
    } catch (error) {
        throw new Error(`Failed to fetch doctor's details: ${error.message}`);
    }
}