import { db } from "@/lib/prisma"

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
        const availabilitySlots = await db.availability.findMany({
            where: {
                doctorId: doctorId,
            },
            orderBy: {
                startTime: "asc",
            },
        });
        return { slots: availabilitySlots };
    } catch (error) {
        throw new Error("Failed to fetch availability slots:", error);
    }
}