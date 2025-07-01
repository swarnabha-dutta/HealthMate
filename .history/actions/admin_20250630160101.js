import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/dist/types/server"

export const verifyAdmin = async () => {
    const { userId } = await auth();
    if (!userId) {
        return false;
    }
    try {
        const user = await db.user.findUnique({
            where: {
                
            }
        })
    } catch (error) {
        
    }
}