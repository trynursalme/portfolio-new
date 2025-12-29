"use client"

import { useActionState } from "react"
import { updatePasswordAction } from "@/app/actions"
import { useFormStatus } from "react-dom"

function SubmitButton() {
    const { pending } = useFormStatus()
    return (
        <button
            type="submit"
            disabled={pending}
            className="inline-flex items-center justify-center rounded-md bg-destructive px-4 py-2 text-sm font-medium text-destructive-foreground shadow transition-colors hover:bg-destructive/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-10"
        >
            {pending ? "Updating..." : "Update Password"}
        </button>
    )
}

export function ChangePasswordForm() {
    const [state, formAction] = useActionState(updatePasswordAction, null)

    return (
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm mt-8">
            <div className="flex flex-col space-y-1.5 p-6">
                <h3 className="text-2xl font-semibold leading-none tracking-tight">Security</h3>
                <p className="text-sm text-muted-foreground">Change your admin password.</p>
            </div>
            <div className="p-6 pt-0">
                <form action={formAction} className="space-y-4 max-w-md">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Current Password</label>
                        <input name="currentPassword" type="password" required className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">New Password</label>
                        <input name="newPassword" type="password" required className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Confirm New Password</label>
                        <input name="confirmPassword" type="password" required className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" />
                    </div>

                    <SubmitButton />

                    {state?.error && (
                        <p className="text-destructive text-sm">{state.error}</p>
                    )}
                    {state?.success && (
                        <p className="text-green-600 text-sm">Password updated successfully.</p>
                    )}
                </form>
            </div>
        </div>
    )
}
