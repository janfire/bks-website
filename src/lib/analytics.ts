import { prisma } from "@/lib/prisma";

export function getCurrentWeekId() {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    // Set to Monday
    d.setDate(d.getDate() - d.getDay() + (d.getDay() === 0 ? -6 : 1));
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `views_week_of_${year}-${month}-${day}`;
}

export async function incrementViews() {
    try {
        const weekId = getCurrentWeekId();
        await prisma.analytics.upsert({
            where: { id: weekId },
            update: { count: { increment: 1 } },
            create: { id: weekId, count: 1 },
        });
    } catch (error) {
        console.error("Failed to increment views:", error);
    }
}
