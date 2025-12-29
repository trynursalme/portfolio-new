import { getDb } from "@/lib/db"
import { AddProjectForm } from "@/components/admin/AddProjectForm"
import { ProjectItem } from "@/components/admin/ProjectItem"

export const dynamic = 'force-dynamic'

export default async function AdminPage() {
    const db = await getDb()
    const projects = db.data.projects

    return (
        <div className="max-w-5xl mx-auto">
            <AddProjectForm />

            <div className="space-y-4">
                <h2 className="text-xl font-semibold tracking-tight">Existing Projects ({projects.length})</h2>
                {projects.length === 0 ? (
                    <div className="text-center py-12 border rounded-lg border-dashed text-muted-foreground">
                        No projects yet. Add one above!
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {projects.map((project) => (
                            <ProjectItem key={project.id} project={project} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
