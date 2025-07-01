import { auth } from "@clerk/nextjs/dist/types/server";

export const setAvailability = async (formData) => {
    const { userId } = await auth();
};