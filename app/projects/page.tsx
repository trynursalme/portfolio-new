import { getDb } from "@/lib/db"
import { ProjectCard } from "@/components/ProjectCard"

export const dynamic = 'force-dynamic'

export default async function ProjectsPage() {
    const db = await getDb()
    const projects = db.data.projects

    return (
        <div className="container px-4 py-12 md:py-20 lg:py-24">
            <div className="flex flex-col gap-4 mb-12">
                <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">Projects</h1>
                <p className="text-xl text-muted-foreground max-w-2xl">
                    A collection of my work, experiments, and open source contributions.
                </p>
            </div>

            {projects.length === 0 ? (
                <div className="text-center py-20 bg-muted/30 rounded-lg">
                    <p className="text-muted-foreground">No projects found. Check back later!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
            )}
        </div>
    )
}
