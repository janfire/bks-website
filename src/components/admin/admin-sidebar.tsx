"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";
import { LayoutDashboard, PlusCircle, LogOut, ExternalLink, Box, Settings, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";

interface AdminSidebarProps {
    onSignOut: () => void;
}

export function AdminSidebar({ onSignOut }: AdminSidebarProps) {
    const pathname = usePathname();
    const [open, setOpen] = React.useState(false);

    // Close sidebar when route changes on mobile
    React.useEffect(() => {
        setOpen(false);
    }, [pathname]);

    const navigation = [
        { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
        { href: "/admin/create", label: "Add Project", icon: PlusCircle },
        { href: "/admin/settings", label: "Settings", icon: Settings },
    ];

    const sidebarContent = (
        <div className="flex h-full flex-col bg-card">
            {/* Brand */}
            <div className="flex h-16 lg:h-20 items-center justify-between border-b border-border px-6 lg:px-8">
                <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-foreground text-background">
                        <Box size={20} strokeWidth={2.5} />
                    </div>
                    <span className="text-lg font-bold tracking-tight">BKS Admin</span>
                </div>
                {/* Mobile Close Button inside Sidebar */}
                <button
                    onClick={() => setOpen(false)}
                    className="lg:hidden text-muted hover:text-foreground"
                >
                    <X size={24} />
                </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-1 overflow-y-auto px-4 py-8">
                {navigation.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "group flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all",
                                isActive
                                    ? "bg-foreground/5 text-foreground"
                                    : "text-muted hover:bg-foreground/5 hover:text-foreground"
                            )}
                        >
                            <item.icon size={18} />
                            {item.label}
                        </Link>
                    );
                })}

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
                <button
                    onClick={onSignOut}
                    className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-red-500 transition-all hover:bg-red-500/10"
                >
                    <LogOut size={18} />
                    Sign Out
                </button>
            </div>
        </div>
    );

    return (
        <>
            {/* Mobile Header Bar (Only visible on small screens) */}
            <div className="flex h-16 items-center justify-between border-b border-border bg-card px-4 lg:hidden sticky top-0 z-40">
                <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-foreground text-background">
                        <Box size={20} strokeWidth={2.5} />
                    </div>
                    <span className="font-bold">BKS Admin</span>
                </div>
                <button
                    onClick={() => setOpen(true)}
                    className="flex h-10 w-10 items-center justify-center rounded-md border border-border bg-background"
                >
                    <Menu size={20} />
                </button>
            </div>

            {/* Desktop Static Sidebar (Hidden on mobile) */}
            <aside className="fixed inset-y-0 left-0 hidden w-72 border-r border-border bg-card lg:block z-30">
                {sidebarContent}
            </aside>

            {/* Mobile Off-Canvas Sidebar */}
            <AnimatePresence>
                {open && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setOpen(false)}
                            className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
                        />
                        {/* Drawer */}
                        <motion.aside
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", bounce: 0, duration: 0.3 }}
                            className="fixed inset-y-0 left-0 z-50 w-[80%] max-w-sm border-r border-border bg-card shadow-xl lg:hidden"
                        >
                            {sidebarContent}
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
