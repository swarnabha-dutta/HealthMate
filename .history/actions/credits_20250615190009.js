"use server"

import { auth } from "@clerk/nextjs/server";




// Define credit allocations per plan
const PLAN_CREDITS = {
    free_user: 0, // Basic plan: 2 credits
    standard: 10, // Standard plan: 10 credits per month
    premium: 24, // Premium plan: 24 credits per month
    students: 5, // Student plan: 10 credits per month
};


// Each appointment costs 2 credits
const APPOINTMENT_CREDIT_COST = 2;


export const checkAndAllocateCredits = async  (user) =>{
    try {
        if (!user) {
            return null;
        }

        // Only allocate credits for patient
        if (user.role !== "PATIENT") {
            return user;
        }

        const { has } = await auth();

        const hasBasic = 

    } catch (error) {
        
    }
}