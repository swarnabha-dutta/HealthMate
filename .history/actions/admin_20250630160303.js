import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/dist/types/server"




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