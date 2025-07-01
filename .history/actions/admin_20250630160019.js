import { auth } from "@clerk/nextjs/dist/types/server"

export const verifyAdmin = async () => {
    const { userId } = await auth();
    if (!userId) {
        
    }
}