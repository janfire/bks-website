import { createProject } from "@/app/actions/project";
import Link from "next/link";
import { ArrowLeft, UploadCloud } from "lucide-react";

export default function CreateProjectPage() {
    return (
        <div className="mx-auto max-w-2xl">
            <Link href="/admin" className="mb-6 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground">
                <ArrowLeft size={16} />
                Back to Dashboard
            </Link>

            <div className="mb-10">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">Add New Project</h1>
                <p className="mt-2 text-muted">Share your latest work with the world.</p>
            </div>

            <form action={createProject} className="space-y-8">

                {/* Project Details Group */}
                <div className="space-y-6 rounded-3xl border border-white/10 bg-white/[0.02] p-8">
                    <h2 className="text-lg font-semibold text-foreground">Project Details</h2>

                    <div className="grid gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-semibold tracking-wider text-muted uppercase">
                                Project Title
                            </label>
                            <input
                                name="title"
                                type="text"
                                required
                                className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-foreground placeholder:text-neutral-600 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-all"
                                placeholder="e.g. Modern Kitchen Fitment"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-semibold tracking-wider text-muted uppercase">
                                Location
                            </label>
                            <input
                                name="location"
                                type="text"
                                required
                                className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-foreground placeholder:text-neutral-600 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-all"
                                placeholder="e.g. Pretoria North"
                            />
                        </div>
                    </div>
                </div>

                {/* Image Upload Group */}
                <div className="space-y-6 rounded-3xl border border-white/10 bg-white/[0.02] p-8">
                    <h2 className="text-lg font-semibold text-foreground">Media</h2>

                    <div className="relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-white/10 bg-black/20 px-6 py-12 transition-all hover:border-accent/50 hover:bg-accent/5">
                        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/5 text-muted">
                            <UploadCloud size={32} />
                        </div>
                        <div className="text-center">
                            <label
                                htmlFor="file-upload"
                                className="relative cursor-pointer rounded-md font-semibold text-accent focus-within:outline-none focus-within:ring-2 focus-within:ring-accent focus-within:ring-offset-2 hover:text-accent/80"
                            >
                                <span>Click to upload multiple</span>
                                <input
                                    id="file-upload"
                                    name="image"
                                    type="file"
                                    className="sr-only"
                                    required
                                    accept="image/*"
                                    multiple
                                />
                            </label>
                            <p className="pl-1 inline text-muted">or drag and drop</p>
                        </div>
                        <p className="mt-2 text-xs text-muted/60">PNG, JPG up to 10MB</p>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-4 pt-4">
                    <Link href="/admin" className="rounded-full px-6 py-3 text-sm font-medium text-muted transition-colors hover:text-foreground">
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        className="rounded-full bg-foreground px-8 py-3 text-sm font-semibold text-background transition-all hover:bg-white/90 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                    >
                        Publish Projects
                    </button>
                </div>
            </form>
        </div>
    );
}
