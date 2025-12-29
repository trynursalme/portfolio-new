"use client"

import { deleteProjectAction } from "@/app/actions"
import { useFormStatus } from "react-dom"
import { Trash2, ExternalLink, Star, GitBranch, Edit } from "lucide-react"
import Link from "next/link"

function DeleteButton() {
    const { pending } = useFormStatus()
    return (
        <button
            type="submit"
            disabled={pending}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-input bg-background text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 text-destructive hover:text-destructive"
            aria-label="Delete project"
        >
            <Trash2 className="h-4 w-4" />
        </button>
    )
}

export function ProjectItem({ project }: { project: any }) {
    // We bind the ID to the action
    const deleteAction = deleteProjectAction.bind(null, project.id)

    return (
        <div className="flex items-center justify-between rounded-lg border bg-card p-4 text-card-foreground shadow-sm transition-all hover:bg-accent/5">
            <div className="space-y-1">
                <div className="flex items-center gap-2">
                    <h4 className="font-semibold leading-none tracking-tight">{project.title}</h4>
                    <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground bg-secondary">
                        {project.repoData?.language || "Unknown"}
                    </span>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-1">{project.description}</p>
                <div className="flex gap-4 text-xs text-muted-foreground mt-2">
                    <span className="flex items-center gap-1"><Star className="h-3 w-3" /> {project.repoData?.stars || 0}</span>
                </div>
            </div>

            <div className="flex items-center gap-2">
                <Link href={`/admin/projects/${project.id}`} className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-input bg-background text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground">
                    <Edit className="h-4 w-4" />
                </Link>
                <a href={project.githubUrl} target="_blank" rel="noreferrer" className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-input bg-background text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground">
                    <ExternalLink className="h-4 w-4" />
                </a>
                <form action={deleteAction}>
                    <DeleteButton />
                </form>
            </div>
        </div>
    )
}
