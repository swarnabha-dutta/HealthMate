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
 * Updates a doctor's verification status
 */


export const updateDoctorStatus = async () => {
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
export const updateDoctorActiveStatus = async () => {
    const isAdmin = await verifyAdmin();
    if (!isAdmin) throw new Error("Unauthorized");

    const doctorId = formData.get("doctorId");
    const suspend = 
}