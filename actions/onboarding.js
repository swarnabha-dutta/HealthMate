"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

/**
 * Sets the user's role and related information
 */
export async function setUserRole(formData) {
    const { userId } = await auth();

    if (!userId) {
        return { error: "Unauthorized" };
    }

    // Find user in our database
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
        // For patient role - simple update
        if (role === "PATIENT") {
            await db.user.update({
                where: {
                    clerkUserId: userId,
                },
                data: {
                    role: "PATIENT",
                },
            });

            revalidatePath("/");
            return { success: true, redirect: "/doctors" };
        }

        // For doctor role - need additional information
        if (role === "DOCTOR") {
            const speciality = formData.get("speciality");
            const experience = parseInt(formData.get("experience"), 10);
            const credentialUrl = formData.get("credentialUrl");
            const description = formData.get("description");

            // Validate inputs
            if (!speciality || !experience || !credentialUrl || !description) {
                throw new Error("All fields are required");
            }

            await db.user.update({
                where: {
                    clerkUserId: userId,
                },
                data: {
                    role: "DOCTOR",
                    speciality, // ✅ now matches the schema
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

    if (!userId) {
        return null;
    }

    try {
        const user = await db.user.findUnique({
            where: {
                clerkUserId: userId,
            },
        });

        return user;
    } catch (error) {
        console.error("Failed to get user information:", error);
        return null;
    }
}

/**
 * Handles user registration
 */
export async function registerUser(formData) {
    const email = formData.get("email");
    const password = formData.get("password");
    // Get clerkUserId from Clerk
    const { userId: clerkUserId } = await auth();
    // ...other data fields

    // Check if user already exists
    const existingUser = await db.user.findUnique({ where: { email } });
    if (existingUser) {
        // Handle already registered email
        return { error: "Email already registered" };
    }

    // Proceed to create user WITH clerkUserId
    const newUser = await db.user.create({ 
        data: { email, password, clerkUserId /*, ...otherData*/ } 
    });

    return { success: true, user: newUser };
}
