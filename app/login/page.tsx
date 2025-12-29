"use client"

import { useActionState } from "react"
import { loginAction } from "@/app/actions"
import { useFormStatus } from "react-dom"

function SubmitButton() {
    const { pending } = useFormStatus()
    return (
        <button
            type="submit"
            disabled={pending}
            className="w-full h-10 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90"
        >
            {pending ? "Logging in..." : "Login"}
        </button>
    )
}

export default function LoginPage() {
    const [state, formAction] = useActionState(loginAction, null)

    return (
        <div className="flex min-h-[calc(100vh-200px)] items-center justify-center p-4">
            <form action={formAction} className="w-full max-w-sm space-y-6 border border-border p-8 rounded-lg shadow-sm bg-card text-card-foreground">
                <div className="flex flex-col space-y-2 text-center">
                    <h1 className="text-2xl font-bold tracking-tight">Admin Login</h1>
                    <p className="text-sm text-muted-foreground">Enter password to access dashboard</p>
                </div>

                {state?.error && (
                    <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md text-center">
                        {state.error}
                    </div>
                )}

                <div className="space-y-2">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="password">
                        Password
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                </div>
                <SubmitButton />
            </form>
        </div>
    )
}
