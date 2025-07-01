import { auth } from "@clerk/nextjs/server";

export const setAvailability = async (formData) => {
    const { userId } = await auth();

    if (!userId) {
        throw new Error("Unauthorized");
    }
};