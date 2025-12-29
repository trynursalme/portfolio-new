import { getDb } from "@/lib/db"
import { notFound } from "next/navigation"
import ReactMarkdown from 'react-markdown'
import Link from "next/link"
import { Github, ExternalLink, ArrowLeft } from "lucide-react"

interface Props {
    params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props) {
    const { id } = await params
    const db = await getDb()
    const project = db.data.projects.find(p => p.id === id)
    if (!project) return { title: 'Project Not Found' }
    return { title: `${project.title} | Portfolio` }
}

export default async function ProjectPage({ params }: Props) {
    const { id } = await params
    const db = await getDb()
    const project = db.data.projects.find(p => p.id === id)

    if (!project) notFound()

    return (
        <article className="container max-w-3xl mx-auto py-12 px-4">
            <Link href="/projects" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
            </Link>

            <header className="mb-12">
                {project.coverImage && (
                    <div className="aspect-video w-full overflow-hidden rounded-xl border mb-8">
                        <img
                            src={project.coverImage}
                            alt={project.title}
                            className="h-full w-full object-cover"
                        />
                    </div>
                )}
                <div className="flex flex-col gap-4">
                    <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">{project.title}</h1>
                    <p className="text-xl text-muted-foreground leading-relaxed">{project.description}</p>
                </div>

                <div className="flex flex-wrap gap-4 mt-8">
                    {project.repoData?.homepage && (
                        <a
                            href={project.repoData.homepage}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                        >
                            Visit Site <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                    )}
                    <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-6 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    >
                        GitHub <Github className="ml-2 h-4 w-4" />
                    </a>
                </div>
            </header>

            <div className="prose prose-zinc dark:prose-invert max-w-none">
                <ReactMarkdown>{project.content || "*No formatting available*"}</ReactMarkdown>
            </div>
        </article>
    )
}
