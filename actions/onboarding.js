"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation"; // ✅ For server-side redirects

/**
 * Sets the user's role and related information
 */
export async function setUserRole(formData) {
    const { userId } = await auth();

    if (!userId) {
        return { error: "Unauthorized" };
    }

    const user = await db.user.findUnique({
        where: { clerkUserId: userId },
    });

    if (!user) {
        return { error: "User not found. Please register first." };
    }

    const role = formData.get("role");

    if (!role || !["PATIENT", "DOCTOR"].includes(role)) {
        return { error: "Invalid role selection" };
    }

    try {
        if (role === "PATIENT") {
            await db.user.update({
                where: { clerkUserId: userId },
                data: { role: "PATIENT" },
            });
            revalidatePath("/");
            return { success: true, redirect: "/doctors" };
        }

        if (role === "DOCTOR") {
            const speciality = formData.get("speciality"); // ✅ fixed spelling
            const experience = parseInt(formData.get("experience"), 10);
            const credentialUrl = formData.get("credentialUrl");
            const description = formData.get("description");

            if (!speciality || isNaN(experience) || !credentialUrl || !description) {
                throw new Error("All fields are required");
            }

            await db.user.update({
                where: { clerkUserId: userId },
                data: {
                    role: "DOCTOR",
                    speciality, // ✅ matches DB schema
                    experience,
                    credentialUrl,
                    description,
                    verificationStatus: "PENDING",
                },
            });

            revalidatePath("/");
            return { success: true, redirect: "/doctor/verification" };
        }
    } catch (error) {
        console.error("Failed to set user role:", error);
        return { error: `Failed to update user profile: ${error.message}` };
    }
}

/**
 * Gets the current user's complete profile information
 */
export async function getCurrentUser() {
    const { userId } = await auth();

    if (!userId) return null;

    try {
        return await db.user.findUnique({
            where: { clerkUserId: userId },
        });
    } catch (error) {
        console.error("Failed to get user information:", error);
        return null;
    }
}

/**
 * Handles user registration
 * Note: Password is not stored here since Clerk manages it
 */
export async function registerUser(formData) {
    const email = formData.get("email");
    const { userId: clerkUserId } = await auth();

    const existingUser = await db.user.findUnique({ where: { email } });
    if (existingUser) {
        return { error: "Email already registered" };
    }

    const newUser = await db.user.create({
        data: { email, clerkUserId }
    });

    return { success: true, user: newUser };
}

/**
 * Checks before booking
 */
export async function ensureUserBeforeBooking() {
    const user = await getCurrentUser();
    if (!user) {
        redirect("/register"); // ✅ server-safe redirect
    }
}
