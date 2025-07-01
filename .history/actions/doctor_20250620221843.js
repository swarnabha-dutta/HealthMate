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
                clerkUserId:user
            }
        })
    } catch (error) {
        
    }

};