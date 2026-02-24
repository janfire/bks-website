import Link from "next/link";
import { signOut, auth } from "@/auth";
import { LayoutDashboard, PlusCircle, LogOut, ExternalLink, Box, Settings } from "lucide-react";
import { redirect } from "next/navigation";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();
    console.log("ADMIN LAYOUT DEBUG: Session found for:", session?.user?.email);
    console.log("ADMIN LAYOUT DEBUG: AUTH_SECRET loaded:", process.env.AUTH_SECRET ? "YES" : "NO");
    if (!session?.user) {
        redirect("/login");
    }

    return (
        <div className="flex min-h-screen bg-background text-foreground selection:bg-accent/30">
            {/* Sidebar */}
            <aside className="fixed inset-y-0 left-0 w-72 border-r border-border bg-card">
                <div className="flex h-full flex-col">
                    {/* Brand */}
                    <div className="flex h-20 items-center border-b border-border px-8">
                        <div className="flex items-center gap-2.5">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-foreground text-background">
                                <Box size={20} strokeWidth={2.5} />
                            </div>
                            <span className="text-lg font-bold tracking-tight">BKS Admin</span>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 space-y-1 px-4 py-8">
                        <Link
                            href="/admin"
                            className="group flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-muted transition-all hover:bg-foreground/5 hover:text-foreground"
                        >
                            <LayoutDashboard size={18} />
                            Dashboard
                        </Link>
                        <Link
                            href="/admin/create"
                            className="group flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-muted transition-all hover:bg-foreground/5 hover:text-foreground"
                        >
                            <PlusCircle size={18} />
                            Add Project
                        </Link>
                        <Link
                            href="/admin/settings"
                            className="group flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-muted transition-all hover:bg-foreground/5 hover:text-foreground"
                        >
                            <Settings size={18} />
                            Settings
                        </Link>
                        <Link
                            href="/"
                            target="_blank"
                            className="group flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-muted transition-all hover:bg-foreground/5 hover:text-foreground"
                        >
                            <ExternalLink size={18} />
                            View Live Site
                        </Link>
                    </nav>

                    {/* User/Sign Out */}
                    <div className="border-t border-border p-4">
                        <form
                            action={async () => {
                                "use server";
                                await signOut();
                            }}
                        >
                            <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-red-400 transition-all hover:bg-red-500/10 hover:text-red-300">
                                <LogOut size={18} />
                                Sign Out
                            </button>
                        </form>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="ml-72 flex-1">
                <div className="container mx-auto max-w-6xl p-8 lg:p-12">
                    {children}
                </div>
            </main>
        </div>
    );
}
