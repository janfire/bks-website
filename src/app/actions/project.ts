"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function uploadToCloudinary(buffer: Buffer, filename: string): Promise<string> {
    const base64 = buffer.toString("base64");
    const dataUri = `data:image/jpeg;base64,${base64}`;

    const body = new FormData();
    body.append("file", dataUri);
    body.append("upload_preset", "bks_unsigned");
    body.append("folder", "bks-projects");
    body.append("public_id", filename);

    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        { method: "POST", body }
    );

    if (!response.ok) {
        const error = await response.text();
        throw new Error(`Cloudinary upload failed: ${error}`);
    }

    const data = await response.json();
    return data.secure_url;
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
