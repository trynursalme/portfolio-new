"use client"

import { useActionState } from "react"
import { updateProjectAction } from "@/app/actions"
import { useFormStatus } from "react-dom"
import { Project } from "@/lib/db"

function SubmitButton() {
    const { pending } = useFormStatus()
    return (
        <button
            type="submit"
            disabled={pending}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-10"
        >
            {pending ? "Saving..." : "Save Changes"}
        </button>
    )
}

export function EditProjectForm({ project }: { project: Project }) {
    const updateAction = updateProjectAction.bind(null, project.id)
    const [state, formAction] = useActionState(updateAction, null)

    return (
        <form action={formAction} className="space-y-6 max-w-2xl bg-card p-6 rounded-lg border">
            <div className="space-y-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium">Project Title</label>
                    <input name="title" defaultValue={project.title} required className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Description</label>
                    <textarea name="description" rows={3} defaultValue={project.description} className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Cover Image URL</label>
                    <input name="coverImage" defaultValue={project.coverImage || ""} placeholder="https://..." className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Sort Order</label>
                    <input name="order" type="number" defaultValue={project.order} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" />
                    <p className="text-xs text-muted-foreground">Lower numbers appear first.</p>
                </div>
            </div>

            <div className="flex justify-end gap-4">
                <SubmitButton />
            </div>
            {state?.error && <p className="text-destructive text-sm">{state.error}</p>}
            {state?.success && <p className="text-green-600 text-sm">Project updated successfully.</p>}
        </form>
    )
}
