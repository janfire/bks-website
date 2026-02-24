'use client'

import { createAdmin } from "@/app/actions/admin"
// import { useFormStatus } from "react-dom" // Not used if using simple form or useActionState
import { useActionState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const initialState = {
    message: "",
    errors: {},
}

export function CreateAdminForm() {
    const [state, formAction, isPending] = useActionState(createAdmin, initialState)

    return (
        <form action={formAction} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input id="username" name="username" placeholder="newadmin" required minLength={3} />
                {state?.errors?.username && (
                    <p className="text-sm text-red-500">{state.errors.username.join(", ")}</p>
                )}
            </div>
            <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" type="password" required minLength={6} />
                {state?.errors?.password && (
                    <p className="text-sm text-red-500">{state.errors.password.join(", ")}</p>
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
                {isPending ? "Creating..." : "Create Admin"}
            </Button>
        </form>
    )
}
