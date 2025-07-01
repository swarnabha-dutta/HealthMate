import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server"




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
                verificationStatus:"PENDING",
            },
            orderBy: {
                createdAt:
            }
        }) 
    } catch (error) {
        
    }    
}