'use client'

import { changePassword } from "@/app/actions/admin"
import { useActionState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const initialState = {
    message: "",
    errors: {},
}

export function ChangePasswordForm() {
    const [state, formAction, isPending] = useActionState(changePassword, initialState)

    return (
        <form action={formAction} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input id="currentPassword" name="currentPassword" type="password" required />
                {state?.errors?.currentPassword && (
                    <p className="text-sm text-red-500">{state.errors.currentPassword.join(", ")}</p>
                )}
            </div>
            <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input id="newPassword" name="newPassword" type="password" required minLength={6} />
                {state?.errors?.newPassword && (
                    <p className="text-sm text-red-500">{state.errors.newPassword.join(", ")}</p>
                )}
            </div>
            <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input id="confirmPassword" name="confirmPassword" type="password" required minLength={6} />
                {state?.errors?.confirmPassword && (
                    <p className="text-sm text-red-500">{state.errors.confirmPassword.join(", ")}</p>
                )}
            </div>

            {state?.message && !state?.success && (
                <Alert variant="destructive">
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{state.message}</AlertDescription>
                </Alert>
            )}

            {state?.success && (
                <Alert className="bg-green-50 text-green-900 border-green-200">
                    <AlertTitle>Success</AlertTitle>
                    <AlertDescription>{state.message}</AlertDescription>
                </Alert>
            )}

            <Button type="submit" disabled={isPending}>
                {isPending ? "Changing..." : "Change Password"}
            </Button>
        </form>
    )
}
