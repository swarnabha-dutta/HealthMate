import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache";




/**
 * Verifies if current user has admin role
 */
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
        console.error("Failed to verify Admin : ", error);
        return false;
    }
}


/**
 * Gets all doctors with pending verification
 */


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
                createdAt: "desc",
            },
        });
        return { doctors: pendingDoctors };
    } catch (error) {
        throw new Error("Failed to fetch pending doctors");
    }
}




/**
 * Gets all verified doctors
 */

export const getVerifiedDoctors = async () => {
    const isAdmin = await verifyAdmin();
    if (!isAdmin) throw new Error("Unauthorized");
    try {
        const verifiedDoctors = await db.user.findMany({
            where: {
                role: "DOCTOR",
                verificationStatus: "VERIFIED",
            },
            orderBy: {
                name: "asc",
            },
        });
        return { doctors: verifiedDoctors };
    } catch (error) {
        console.error("Failed to get verified doctors:", error);
        return { error: "Failed to fetch verified doctors" };
    }
}



/**
 * Updates a doctor's verification status
 */


export const updateDoctorStatus = async (formData) => {
    const isAdmin = await verifyAdmin();
    if (!isAdmin) throw new Error("Unauthorized");

    const doctorId = formData.get("doctorId");
    const status = formData.get("status");

    if (!doctorId || !["VERIFIED", "REJECTED"].includes(status)) {
        throw new Error("Invalid input");
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
        throw new Error(`Failed to update doctor status: ${error.message}`);
    }
}



/**
 * Suspends or reinstates a doctor
 */
export const updateDoctorActiveStatus = async (formData) => {
    const isAdmin = await verifyAdmin();
    if (!isAdmin) throw new Error("Unauthorized");

    const doctorId = formData.get("doctorId");
    const suspend = formData.get("suspend") === "true";

    if (!doctorId) {
        throw new Error("Doctor ID is required");
    }

    try {
        const status = suspend ? "PENDING" : "VERIFIED";

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
        console.error("Failed to update doctor active status:", error);
        throw new Error(`Failed to update doctor status: ${error.message}`);
    }
}

/**
 * Gets all pending payouts that need admin approval
 */

export const getPendingPayouts = async () => {
    const isAdmin = await verifyAdmin();
    if (!isAdmin) throw new Error("Unauthorized");


    try {
        const pendingPayouts = await db.payout.findMany({
            where: {
                status: "PROCESSING",
            },
            include: {
                doctor: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        speciality: true,
                        credits: true
                    },
                },
            },
            orderBy:{
                createdAt:"desc",
            }
        });
        return { payouts: pendingPayouts };

    } catch (error) {
        console.error("Failed to fetch pending payouts:", error);
        throw new Error("Failed to fetch pending payouts");
    }
}




/**
 * Approves a payout request and deducts credits from doctor's account
 */

export const approvePayout = async (formData) => {
    const isAdmin = await verifyAdmin();
    if (!isAdmin) throw new Error("Unauthorized");

    const payoutId = formData.get("payoutId");
    if (!payoutId) {
        throw new Error("Payout ID is required");
    }

    try {
        // Get Admin user info 
        const { userId } = await auth();
        const admin = await db.user.findUnique({
            where: {
                clerkUserId: userId
            },
        });
        // Find the payout request
        const payout = await db.payout.findUnique({
            where: {
                id: payoutId,
                status: "PROCESSING",
            },
            include: {
                doctor: true,
            },
        });
        if (!payout) {
            throw new Error("Payout request not found or already processed");
        }

        if (payout.doctor.credits < payout.credits) {
            throw new Error("Doctor doesn't have enough credits for this payout");
        }
        // Process the payout in a transaction
        await db.$transaction(async(tx))
    } catch (error) {
        
    }
}
