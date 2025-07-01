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
            
        })
    } catch (error) {
        throw new Error(`Failed to fetch doctor's details: ${error.message}`);
    }
}