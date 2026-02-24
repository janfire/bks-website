'use client'

import { deleteAdmin } from "@/app/actions/admin"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react" // Assuming lucide-react is available
import { useState } from "react"
import { useRouter } from "next/navigation"

interface Admin {
    id: string
    username: string
    createdAt: Date
}

interface AdminListProps {
    admins: Admin[]
    currentUserId: string
}

export function AdminList({ admins, currentUserId }: AdminListProps) {
    const [deletingId, setDeletingId] = useState<string | null>(null)
    const router = useRouter() // Not strictly needed if action revalidates, but good for refresh if needed

    async function handleDelete(id: string) {
        if (!confirm("Are you sure you want to delete this admin?")) return

        setDeletingId(id)
        const result = await deleteAdmin(id)
        setDeletingId(null)

        if (!result?.success) {
            alert(result?.message || "Failed to delete admin")
        }
    }

    return (
        <div className="space-y-4">
            {admins.map((admin) => (
                <div key={admin.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                        <p className="font-medium">{admin.username}</p>
                        <p className="text-sm text-muted-foreground">
                            Created: {new Date(admin.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                    {admin.id !== currentUserId && (
                        <Button
                            variant="destructive"
                            size="icon"
                            onClick={() => handleDelete(admin.id)}
                            disabled={deletingId === admin.id}
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    )}
                    {admin.id === currentUserId && (
                        <span className="text-xs text-muted-foreground italic">(You)</span>
                    )}
                </div>
            ))}
            {admins.length === 0 && <p className="text-muted-foreground">No admins found.</p>}
        </div>
    )
}
