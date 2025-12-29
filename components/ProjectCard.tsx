import Link from "next/link"
import { Github, ExternalLink, Star } from "lucide-react"
import { Project } from "@/lib/db"

export function ProjectCard({ project }: { project: Project }) {
    return (
        <div className="group relative overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md hover:-translate-y-1 flex flex-col h-full">
            {project.coverImage && (
                <div className="aspect-video w-full overflow-hidden border-b">
                    <img
                        src={project.coverImage}
                        alt={project.title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                </div>
            )}
            <div className="p-6 flex flex-col h-full">
                <div className="flex items-center justify-between mb-4">
                    <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors text-foreground">
                        {project.repoData?.language || "Project"}
                    </div>
                    {project.repoData?.stars !== undefined && (
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Star className="h-4 w-4 fill-current" />
                            <span>{project.repoData.stars}</span>
                        </div>
                    )}
                </div>
                <h3 className="text-xl font-bold tracking-tight mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                </h3>
                <p className="text-muted-foreground mb-6 line-clamp-3 flex-1">
                    {project.description}
                </p>

                <div className="flex items-center gap-4 mt-auto relative z-10 pt-4">
                    <Link href={project.githubUrl} target="_blank" className="inline-flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary">
                        <Github className="h-4 w-4" /> Code
                    </Link>
                    {project.repoData?.homepage && (
                        <Link href={project.repoData.homepage} target="_blank" className="inline-flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary">
                            <ExternalLink className="h-4 w-4" /> Live Demo
                        </Link>
                    )}
                </div>
            </div>
            <Link href={`/projects/${project.id}`} className="absolute inset-0 z-0 bg-transparent" aria-label={`View ${project.title}`}>
            </Link>
        </div>
    )
}
