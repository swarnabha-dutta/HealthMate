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
        const pendingDoctors = await db.user.findMany({
            where: {
                role: "DOCTOR",
                verificationStatus: "PENDING",
            },
            orderBy: {
                createdAt: "desc"
            },
        });

        return { doctors: pendingDoctors };
    } catch (error) {
    throw new Error("Failed to get pending doctors information:", error);
    }
}





export const verifiedDoctors = async () => {
    const isAdmin = await verifyAdmin();
    if (!isAdmin) throw new Error("Unauthorized");
    try {
        const verifiedDoctors = await db.user.findMany({
            where: {
                role: "DOCTOR",
                verificationStatus: "VERIFIED",
            },
            orderBy: {
                createdAt: "desc"
            },
        });
    } catch (error) {
        throw new Error("Failed to get verified doctors information:", error);
    }
}



export const updateDoctorStatus = async (formData) => {
    const isAdmin = await verifyAdmin();
    if (!isAdmin) throw new Error("Unauthorized");


    const doctorId = formData.get("doctorId");
    const status =  formData.get("status")
}