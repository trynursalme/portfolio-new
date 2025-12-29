"use client"

import { useActionState } from "react"
import { addProjectAction } from "@/app/actions"
import { useFormStatus } from "react-dom"
import { Plus, Github } from "lucide-react"

function SubmitButton() {
    const { pending } = useFormStatus()
    return (
        <button
            type="submit"
            disabled={pending}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-10"
        >
            {pending ? "Fetching..." : <> <Plus className="mr-2 h-4 w-4" /> Add Project </>}
        </button>
    )
}

export function AddProjectForm() {
    const [state, formAction] = useActionState(addProjectAction, null)

    return (
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm mb-8">
            <div className="flex flex-col space-y-1.5 p-6">
                <h3 className="text-2xl font-semibold leading-none tracking-tight">Add New Project</h3>
                <p className="text-sm text-muted-foreground">Paste a GitHub repository URL to auto-fetch details.</p>
            </div>
            <div className="p-6 pt-0">
                <form action={formAction} className="flex flex-col sm:flex-row gap-4 items-end">
                    <div className="grid w-full gap-1.5">
                        <label className="text-sm font-medium leading-none" htmlFor="githubUrl">Repository URL</label>
                        <div className="relative">
                            <Github className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <input
                                id="githubUrl"
                                name="githubUrl"
                                placeholder="https://github.com/owner/repo"
                                required
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pl-9 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            />
                        </div>
                    </div>
                    <div className="grid w-full gap-1.5">
                        <label className="text-sm font-medium leading-none" htmlFor="coverImage">Cover Image URL (Optional)</label>
                        <input
                            id="coverImage"
                            name="coverImage"
                            placeholder="https://example.com/image.jpg"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        />
                    </div>
                    <SubmitButton />
                </form>
                {state?.error && (
                    <p className="mt-4 text-sm text-destructive">{state.error}</p>
                )}
            </div>
        </div>
    )
}
