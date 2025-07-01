"use server"

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server"


export const verifyAdmin = async () => {
    const { userId } = await auth();
    if (!userId) {
        return false;
    }

    try {
        const user = await db.user.findUnique({
            where: {
                clerkUserId: userId,
            },
        });

        return user?.role === "ADMIN";
    } catch (error) {
        console.error("Failed to get user information:", error);
        return false;
    }
}





export const getPendingDoctors = async () => {
    const isAdmin = await verifyAdmin();
    if (!isAdmin) throw new Error("Unauthorized");
    try {
        
    } catch (error) {
        
    }
}