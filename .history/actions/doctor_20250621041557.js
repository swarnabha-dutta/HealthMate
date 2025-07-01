"use server"

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export const setAvailability = async (formData) => {
    const { userId } = await auth();

    if (!userId) {
        throw new Error("Unauthorized");
    }
    try {
        const user = await db.user.findUnique({
            where: {
                clerkUserId: userId,
                role: "DOCTOR",
            },
        });

        if (!doctor) {
            throw new Error("Doctor not found ");
        }
        //Get form Data 
        const startTime = formData.get("startTime");
        const endTime = formData.get("endTime");

        // Validate input 
        if (!startTime || !endTime) {
            throw new Error("Start time and end time are required ")
        }

        if (startTime >= endTime) {
            throw new Error("Start time must be before end time");
        }

        const existingSlots = await db.availability.findMany({
            where: {
                doctorId:doctor.id,
            },
        });
        if (existingSlots.length > 0) {
            const slotsWithNoAppointments = existingSlots.filter(
                (slot) => !slot.appointment
            );
            if (slotsWithNoAppointments)
        }
    } catch (error) {
        
    }

};