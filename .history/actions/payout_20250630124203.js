"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";





const CREDIT_VALUE = 10;//$10 credit total 
const PLATFORM_FEE_PER_CREDIT = 2;//$2 platform fee
const DOCTOR_EARNINGS_PER_CREDIT = 8; //$8  to doctor


/**
 * Request payout for all remaining credits
 */

export const requestPayout = async (formData) => {
    const { userId } = await auth();
    if (!userId) {
        throw new Error("Unauthorized");
    }
    try {
        const doctor = await db.user.findUnique({
            where: {
                clerkUserId: userId,
                role: "DOCTOR",
            },
        });
        if (!doctor) {
            throw new Error("Doctor not found");
        }

        const paypalEmail = formData.get("paypalEmail");


        if (!paypalEmail) {
            throw new Error("PayPal email is required");
        }

        const existingPendingPayout = await db.payout.findFirst({
            where: {
                
            }
        })
    } catch (error) {
        
    }




}