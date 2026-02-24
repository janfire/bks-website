"use client";

import { useActionState } from "react";
import { authenticate } from "@/app/actions/auth";

export default function LoginPage() {
    const [errorMessage, formAction, isPending] = useActionState(
        authenticate,
        undefined,
    );

    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background">
            {/* Background Ambience */}
            <div className="absolute -top-[20%] -left-[10%] h-[600px] w-[600px] rounded-full bg-accent/5 blur-[120px]" />
            <div className="absolute -bottom-[20%] -right-[10%] h-[600px] w-[600px] rounded-full bg-accent/5 blur-[120px]" />

            <div className="relative w-full max-w-md p-8">
                <div className="overflow-hidden rounded-2xl border border-card-border bg-card/50 backdrop-blur-xl shadow-2xl">
                    <div className="p-8">
                        <div className="mb-10 text-center">
                            <h1 className="text-3xl font-bold tracking-tight text-foreground">
                                Welcome Back
                            </h1>
                            <p className="mt-2 text-sm text-muted">
                                Sign in to manage your gallery.
                            </p>
                        </div>

                        <form action={formAction} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-semibold tracking-wider text-muted uppercase">
                                    Username
                                </label>
                                <input
                                    name="username"
                                    type="text"
                                    required
                                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-foreground placeholder:text-neutral-500 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-all duration-200"
                                    placeholder="admin"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-semibold tracking-wider text-muted uppercase">
                                    Password
                                </label>
                                <input
                                    name="password"
                                    type="password"
                                    required
                                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-foreground placeholder:text-neutral-500 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-all duration-200"
                                    placeholder="••••••••"
                                />
                            </div>

                            {errorMessage && (
                                <div
                                    className="rounded-lg bg-red-500/10 p-3 text-sm text-red-500"
                                    aria-live="polite"
                                >
                                    {errorMessage}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={isPending}
                                className="group relative w-full overflow-hidden rounded-lg bg-foreground px-4 py-3 text-sm font-semibold text-background transition-all hover:bg-white/90 disabled:opacity-50"
                            >
                                {isPending ? "Signing in..." : "Sign In"}
                            </button>
                        </form>
                    </div>
                </div>

                <div className="mt-6 text-center text-xs text-muted/50">
                    Protected by BKS Secure Admin
                </div>
            </div>
        </div>
    );
}
