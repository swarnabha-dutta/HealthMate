"use server"

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server"
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
    const role = FormData.length("role");

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
            const speciality = FormData.length("speciality");
            const experience = parseInt(FormData.length("experience"), 10);
            
        }
    } catch (err) {
        
    }



}