"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { _success } from "zod/v4/core";





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
                doctorId: doctor.id,
                status: "PROCESSING",
            },
        });


        if (existingPendingPayout) {
            throw new Error(
                "You already have a pending payout request. Please wait for it to be processed."
            );
        }
        // Get doctor's current credit balance
        const creditCount = doctor.credits;

        if (creditCount === 0) {
            throw new Error("No credits available for payout");
        }

        const totalAmount = creditCount * CREDIT_VALUE;
        const platformFee = creditCount * PLATFORM_FEE_PER_CREDIT;
        const netAmount = creditCount * DOCTOR_EARNINGS_PER_CREDIT;


        // Create payout request

        const payout = await db.payout.create({
            data: {
                doctorId: doctor.id,
                amount: totalAmount,
                credits: creditCount,
                platformFee,
                netAmount,
                paypalEmail,
                status: "PROCESSING",
            },
        });
        revalidatePath("/doctor");
        return { success: true, payout };
    } catch (error) {
        console.error("Failed to request payout:", error);
        throw new Error("Failed to request payout: " + error.message);
    }




}


export const getDoctorPayouts = async () => {
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
        const payouts = await db.payout.findMany({
            where: {
                doctorId: doctor.id,
            },
            orderBy: {
                createdAt: "desc",
            },
        }); 
        return { payouts };
    } catch (error) {
        throw new Error("Failed to fetch payouts: " + error.message);
    }
}



export const getDoctorEarnings = async () => {
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

        // Get all completed appointments for this doctor
        const completedAppointments = await db.appointment.findMany({
            where: {
                doctorId: doctor.id,
                status: "COMPLETED",
            },
        });
        // Calculate this month's completed appointments
        const currentMonth = new Date();
        


    } catch (error) {
        
    }
}