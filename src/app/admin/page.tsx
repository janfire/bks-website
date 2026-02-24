import { prisma } from "@/lib/prisma";
import Image from "next/image";
import { deleteProject } from "@/app/actions/project";
import Link from "next/link";
import { Plus, Trash2, MapPin } from "lucide-react";
import { getCurrentWeekId } from "@/lib/analytics";

export default async function AdminDashboard() {
    const projects = await prisma.project.findMany({
        orderBy: { createdAt: "desc" },
    });

    const views = await prisma.analytics.findUnique({
        where: { id: getCurrentWeekId() },
    });

    const inquiryCount = await prisma.inquiry.count();

    return (
        <div className="space-y-10">
            {/* Header */}
            <div className="flex items-end justify-between">
                <div>
                    <div className="text-sm font-medium uppercase tracking-wider text-accent">Overview</div>
                    <h1 className="mt-1 text-3xl font-bold tracking-tight text-foreground">Dashboard</h1>
                </div>
                <div className="flex items-center gap-3">
                    <Link
                        href="/admin/settings"
                        className="flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground transition-all hover:bg-accent/10"
                    >
                        <span>Settings</span>
                    </Link>
                    <Link
                        href="/admin/create"
                        className="group flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition-all hover:bg-foreground/90"
                    >
                        <Plus size={18} />
                        <span>New Project</span>
                    </Link>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                <div className="rounded-2xl border border-border bg-card p-6">
                    <div className="text-sm font-medium text-muted">Total Projects</div>
                    <div className="mt-2 text-3xl font-bold text-foreground">{projects.length}</div>
                </div>
                <div className="rounded-2xl border border-border bg-card p-6">
                    <div className="text-sm font-medium text-muted">Views (This Week)</div>
                    <div className="mt-2 text-3xl font-bold text-foreground">{views?.count ?? 0}</div>
                </div>
                <div className="rounded-2xl border border-border bg-card p-6">
                    <div className="text-sm font-medium text-muted">Client Inquiries</div>
                    <div className="mt-2 text-3xl font-bold text-foreground">{inquiryCount}</div>
                </div>
            </div>

            <div className="space-y-4">
                <h2 className="text-xl font-semibold tracking-tight text-foreground">Recent Projects</h2>

                {/* Gallery Grid */}
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {projects.map((project) => (
                        <div key={project.id} className="group relative overflow-hidden rounded-3xl border border-border bg-card transition-all hover:bg-accent/5">
                            {/* Image Aspect Ratio */}
                            <div className="relative aspect-[4/3] w-full overflow-hidden">
                                <Image
                                    src={project.imageSrc}
                                    alt={project.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                {/* Overlay Gradient on Hover */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                                {/* Delete Action - Visible on Hover */}
                                <div className="absolute top-4 right-4 z-10">
                                    <form action={deleteProject.bind(null, project.id)}>
                                        <button className="flex h-10 w-10 items-center justify-center rounded-full bg-background/50 text-foreground backdrop-blur-md transition-colors hover:bg-red-500 hover:text-white">
                                            <Trash2 size={18} />
                                        </button>
                                    </form>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-5">
                                <h3 className="text-lg font-semibold text-foreground tracking-tight">{project.title}</h3>
                                <div className="mt-2 flex items-center gap-1.5 text-sm text-muted">
                                    <MapPin size={14} className="text-accent" />
                                    {project.location}
                                </div>
                            </div>
                        </div>
                    ))}

                    {projects.length === 0 && (
                        <div className="col-span-full flex flex-col items-center justify-center rounded-3xl border border-dashed border-border py-24 text-center">
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-card">
                                <Plus className="text-muted" size={32} />
                            </div>
                            <h3 className="mt-4 text-lg font-medium text-foreground">No projects yet</h3>
                            <p className="mt-1 text-muted max-w-sm">Get started by creating your first project for the gallery.</p>
                            <Link
                                href="/admin/create"
                                className="mt-6 rounded-full bg-foreground px-6 py-2.5 text-sm font-semibold text-background transition-colors hover:bg-foreground/90"
                            >
                                Add Project
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
