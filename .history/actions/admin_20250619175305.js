"use server"

import { auth } from "@clerk/nextjs/server"


export const verifyAdmin = async () => {
    const { userId } = await auth();
    if()
}