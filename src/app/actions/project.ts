"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";

export async function createProject(formData: FormData) {
    const title = formData.get("title") as string;
    const location = formData.get("location") as string;
    const images = formData.getAll("image") as File[];

    console.log(`BATCH UPLOAD START: Received ${images.length} files.`);

    if (!images || images.length === 0 || images[0].size === 0) {
        console.error("BATCH UPLOAD ERROR: No images found in request.");
        throw new Error("No images uploaded");
    }

    const uploadDir = join(process.cwd(), "public", "uploads");

    try {
        // Ensure directory exists
        try {
            await mkdir(uploadDir, { recursive: true });
        } catch (e) {
            console.error("Error creating upload directory", e);
        }

        // Process images sequentially to avoid SQLite locking issues
        for (const image of images) {
            const bytes = await image.arrayBuffer();
            const buffer = Buffer.from(bytes);

            // Create unique filename
            const filename = `${Date.now()}-${Math.random().toString(36).substring(7)}-${image.name.replace(/\s/g, "-")}`;
            const filepath = join(uploadDir, filename);

            await writeFile(filepath, buffer);

            const imageSrc = `/uploads/${filename}`;

            // Save to Database
            await prisma.project.create({
                data: {
                    title,
                    location,
                    imageSrc,
                    imageAlt: title, // Default alt text
                },
            });
        }
    } catch (e) {
        console.error("BATCH UPLOAD ERROR:", e);
        throw e; // Re-throw to ensure the client sees the error, or handle gracefully
    }

    revalidatePath("/gallery");
    revalidatePath("/admin");
    redirect("/admin");
}

export async function deleteProject(id: string) {
    await prisma.project.delete({
        where: { id },
    });
    revalidatePath("/gallery");
    revalidatePath("/admin");
}
