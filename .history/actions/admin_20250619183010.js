"use server"

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache";


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
    const status = formData.get("status");


    if (!doctorId || !["VERIFIED", "REJECTED"].includes(status)) {
        throw new Error("Invalid form input ");
    } 


    try {
        await db.user.update({
            where: {
                id: doctorId,
            },
            data: {
                verificationStatus: status,
            },
        });

        revalidatePath("/admin");
        return { success: true };
    } catch (error) {
        console.error("Failed to update doctor status:", error);
        throw new Error(`Failed to update doctor status ${error.message}`);
    }
}



export const updateDoctorActiveStatus = async (formData) => {
    const isAdmin = await verifyAdmin();
    if (!isAdmin) throw new Error("Unauthorized");


    const doctorId = formData.get("doctorId");
    const suspend = formData.get("suspend") === "true";


    if (!doctorId) {
        throw new Error("Doctor Id is Required ");
    }

    try {
        const status = suspend ? "PENDING" : "VERIFIED";

        await db.user.update({
            where: {
                id: doctorId,
            },
            data: {
                verificationStatus: true
            },
        });
        revalidatePath("/")
    } catch (error) {
        console.error("Failed to updateDoctorActiveStatus doctor status:", error);
        throw new Error(`Failed to update doctor status ${error.message}`);
    }
}