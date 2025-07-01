"use"


import { auth } from "@clerk/nextjs/server"

export const setUserRole = async () => {
    await auth
}