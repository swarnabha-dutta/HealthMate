"use server"

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server"

export const setUserRole = async () => {
    const { userId } = await auth();

    if (!userId) {
        throw new Error("Unauthorized");
    }
    // find user in our database 
    const user = await db.user.findUnique({
        where:{clerkUserId: userId}
    })
}