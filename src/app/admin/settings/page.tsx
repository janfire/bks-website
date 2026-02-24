import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { CreateAdminForm } from "@/components/admin/create-admin-form";
import { ChangePasswordForm } from "@/components/admin/change-password-form";
import { AdminList } from "@/components/admin/admin-list";
import { ThemeToggle } from "@/components/admin/theme-toggle";

export default async function AdminSettingsPage() {
    const session = await auth();
    if (!session?.user) return null;

    const admins = await prisma.admin.findMany({
        select: { id: true, username: true, createdAt: true },
        orderBy: { createdAt: "desc" },
    });

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-foreground">Admin Settings</h1>
                <p className="text-muted">
                    Manage admin accounts, security settings, and system preferences.
                </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
                <div className="space-y-8">
                    <section className="space-y-4 rounded-lg border border-white/10 bg-white/[0.02] p-6">
                        <h2 className="text-xl font-semibold text-foreground">Theme Preferences</h2>
                        <p className="text-sm text-muted">Select the visual appearance of the system.</p>
                        <ThemeToggle />
                    </section>

                    <section className="space-y-4 rounded-lg border border-white/10 bg-white/[0.02] p-6">
                        <h2 className="text-xl font-semibold text-foreground">Change Password</h2>
                        <ChangePasswordForm />
                    </section>

                    <section className="space-y-4 rounded-lg border border-white/10 bg-white/[0.02] p-6">
                        <h2 className="text-xl font-semibold text-foreground">Create New Admin</h2>
                        <CreateAdminForm />
                    </section>
                </div>

                <div className="space-y-8">
                    <section className="space-y-4 rounded-lg border border-white/10 bg-white/[0.02] p-6">
                        <h2 className="text-xl font-semibold text-foreground">Existing Admins</h2>
                        <AdminList admins={admins} currentUserId={session.user.id || ""} />
                    </section>
                </div>
            </div>
        </div>
    );
}
