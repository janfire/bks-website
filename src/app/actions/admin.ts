'use server';

import { prisma } from "@/lib/prisma";
import { hashPassword, verifyPassword } from "@/lib/auth-utils";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const ChangePasswordSchema = z.object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(6, "New password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm password must be at least 6 characters"),
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

const CreateAdminSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

export async function changePassword(prevState: any, formData: FormData) {
    const session = await auth();
    if (!session?.user?.id) {
        return { message: "Unauthorized" };
    }

    const currentPassword = formData.get("currentPassword") as string;
    const newPassword = formData.get("newPassword") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    const validatedFields = ChangePasswordSchema.safeParse({
        currentPassword,
        newPassword,
        confirmPassword,
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Validation failed",
        };
    }

    const admin = await prisma.admin.findUnique({
        where: { id: session.user.id },
    });

    if (!admin) {
        return { message: "User not found" };
    }

    const isPasswordValid = await verifyPassword(currentPassword, admin.password);
    if (!isPasswordValid) {
        return {
            errors: { currentPassword: ["Incorrect password"] },
            message: "Validation failed",
        };
    }

    const hashedPassword = await hashPassword(newPassword);

    await prisma.admin.update({
        where: { id: session.user.id },
        data: { password: hashedPassword },
    });

    revalidatePath("/admin");
    return { success: true, message: "Password updated successfully" };
}

export async function createAdmin(prevState: any, formData: FormData) {
    const session = await auth();
    if (!session?.user?.id) {
        return { message: "Unauthorized" };
    }

    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    const validatedFields = CreateAdminSchema.safeParse({
        username,
        password,
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Validation failed",
        };
    }

    const existingUser = await prisma.admin.findUnique({
        where: { username },
    });

    if (existingUser) {
        return {
            errors: { username: ["Username already taken"] },
            message: "Validation failed",
        };
    }

    const hashedPassword = await hashPassword(password);

    await prisma.admin.create({
        data: {
            username,
            password: hashedPassword,
        },
    });

    revalidatePath("/admin/settings");
    return { success: true, message: "Admin created successfully" };
}

export async function deleteAdmin(id: string) {
    const session = await auth();
    if (!session?.user?.id) {
        return { message: "Unauthorized" };
    }

    try {
        if (session.user.id === id) {
            return { message: "Cannot delete yourself." };
        }

        await prisma.admin.delete({
            where: { id }
        });
        revalidatePath("/admin/settings");
        return { success: true, message: "Admin deleted successfully" };
    } catch (error) {
        return { message: "Failed to delete admin" };
    }
}
