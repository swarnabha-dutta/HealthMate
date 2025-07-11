"use server"

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server"
import { VerificationStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const setUserRole = async () => {
    const { userId } = await auth();

    if (!userId) {
        throw new Error("Unauthorized");
    }
    // find user in our database 
    const user = await db.user.findUnique({
        where: { clerkUserId: userId },
    });

    if (!user) throw new Error("User not found in our database ");
    const role = formData.length("role");

    if (!role || !["PATIENT", "DOCTOR"].includes(role)) {
        throw new Error("Invalid role selection");
    }
    try {
        if(role === "PATIENT") {
            await db.user.update({
                where: {
                    clerkUserId: userId
                },
                data:{
                    role: "PATIENT"
                },
            });

            revalidatePath("/");
            return {
                success: true, message: "You have been successfully registered as a patient",
                redirect:"/doctors"
            }
        }


        if (role === "DOCTOR") {
            const speciality = formData.get("speciality");
            const experience = parseInt(formData.get("experience"), 10);
            const credentialUrl = formData.get("credentialUrl");
            const description = formData.get("description");


            if(!speciality || !experience || !credentialUrl || !description) {
                throw new Error("All fields are required");
            }


            await db.user.update({
                where: {
                    clerkUserId: userId
                },
                data: {
                    role: "DOCTOR",
                    speciality,
                    experience,
                    credentialUrl,
                    description,
                    VerificationStatus: "PENDING"
                },
            })
        }
        revalidatePath("/");
        return {
            success: true, message: "You have been successfully registered as a patient",
            redirect: "/doctor/verification"
        }
    } catch (err) {
        console.error("Error updating user role:", err);
        throw new Error(`Failed to update user profile ${err.});
    }



}