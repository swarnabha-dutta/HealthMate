"use server"

import { auth } from "@clerk/nextjs/server"

export const setUserRole = async () => {
    const { userId } = await auth();

    if (!userId) {
        throw new Error("Unauthorized");
    
    }
}