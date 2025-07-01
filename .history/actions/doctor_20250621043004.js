"use server"

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

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
            if (slotsWithNoAppointments.length > 0) {
                await db.availability.deleteMany({
                    where: {
                        id: {
                            in: slotsWithNoAppointments.map((slot) => slot.id),
                        },
                    },
                });
            }
        }
        // create new availability slot
        const newSlot = await db.availability.create({
            data: {
                doctorId: doctor.id,
                startTime: new Date(startTime),
                endTime: new Date(endTime),
                status: "AVAILABLE"
            },
        });
        revalidatePath("/doctor");
        return { success: true, slot: newSlot };
    } catch (error) {
        throw new Error("Failed to set availability: " + error.message);
    }

};



export const getDoctorAvailability = async () => {
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
        const availabilitySlots = await db.availability.findMany({
            where: {
                doctorId: doctor.id,
            },
            orderBy: {
                startTime: "asc",
            },
        });
        return 
    } catch (error) {
        
    }
}