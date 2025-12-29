import { getDb } from "@/lib/db"
import { notFound } from "next/navigation"
import { EditProjectForm } from "@/components/admin/EditProjectForm"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const dynamic = 'force-dynamic'

interface Props {
    params: Promise<{ id: string }>
}

export default async function EditProjectPage({ params }: Props) {
    const { id } = await params
    const db = await getDb()
    const project = db.data.projects.find(p => p.id === id)

    if (!project) notFound()

    return (
        <div className="max-w-3xl">
            <Link href="/admin" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
            </Link>
            <h2 className="text-2xl font-bold tracking-tight mb-8">Edit Project: {project.title}</h2>
            <EditProjectForm project={project} />
        </div>
    )
}
