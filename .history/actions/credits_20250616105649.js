"use server"

import { auth } from "@clerk/nextjs/server";
import { format } from "date-fns";




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

        const hasBasic = has({ plan: "free_user" });
        const hasStandard = has({ plan: "standard" });
        const hasPremium = has({ plan: "premium" });
        const hasStudents = has({ plan: "students" });


        let currentPlan = null;
        let creditsToAllocate = 0;



        if (hasPremium) {
            currentPlan = "premium";
            creditsToAllocate = PLAN_CREDITS.premium;
        } else if (hasStandard) {
            currentPlan = "standard";
            creditsToAllocate = PLAN_CREDITS.standard;
        } else if (hasStudents) {
            currentPlan = "students";
            creditsToAllocate = PLAN_CREDITS.students;
        } else if (hasBasic) {
            currentPlan = "free_user";
            creditsToAllocate = PLAN_CREDITS.free_user;
        }

        if (!currentPlan) {
            return user;
        }
        const currentMonth = format(new Date(), "yyyy-MM");
        if (user.transactions.length > 0) {
            const latestTransaction = user.transactions[0];
            const transca
        }
    } catch (error) {
        
    }
}