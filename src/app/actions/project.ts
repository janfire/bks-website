"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function uploadToCloudinary(buffer: Buffer, filename: string): Promise<string> {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
            {
                folder: "bks-projects",
                public_id: filename,
                resource_type: "image",
            },
            (error, result) => {
                if (error || !result) return reject(error);
                resolve(result.secure_url);
            }
        ).end(buffer);
    });
}

export async function createProject(formData: FormData) {
    const title = formData.get("title") as string;
    const location = formData.get("location") as string;
    const images = formData.getAll("image") as File[];

    console.log(`BATCH UPLOAD START: Received ${images.length} files.`);

    if (!images || images.length === 0 || images[0].size === 0) {
        console.error("BATCH UPLOAD ERROR: No images found in request.");
        throw new Error("No images uploaded");
    }

    try {
        for (const image of images) {
            const bytes = await image.arrayBuffer();
            const buffer = Buffer.from(bytes);

            const filename = `${Date.now()}-${Math.random().toString(36).substring(7)}`;

            // Upload to Cloudinary instead of local disk
            const imageSrc = await uploadToCloudinary(buffer, filename);

            await prisma.project.create({
                data: {
                    title,
                    location,
                    imageSrc,
                    imageAlt: title,
                },
            });
        }
    } catch (e) {
        console.error("BATCH UPLOAD ERROR:", e);
        throw e;
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
