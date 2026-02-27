// Removed unused Link import
import { signOut, auth } from "@/auth";
import { redirect } from "next/navigation";
import { AdminSidebar } from "@/components/admin/admin-sidebar";

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

    // Server Action for signing out
    async function handleSignOut() {
        "use server";
        await signOut();
    }

    return (
        <div className="flex min-h-screen bg-background text-foreground selection:bg-accent/30 lg:flex-row flex-col">
            <AdminSidebar onSignOut={handleSignOut} />

            {/* Main Content */}
            <main className="flex-1 lg:ml-72 w-full max-w-[100vw] overflow-x-hidden">
                <div className="container mx-auto p-4 sm:p-8 lg:p-12">
                    {children}
                </div>
            </main>
        </div>
    );
}
