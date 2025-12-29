import { getDb } from "@/lib/db"
import { SkillsManager } from "@/components/admin/SkillsManager"

export const dynamic = 'force-dynamic'

export default async function SkillsPage() {
    const db = await getDb()
    // Ensure migrations by defaulting to empty array or what's in DB
    const skills = db.data.skills || []

    return (
        <div className="max-w-4xl pb-12">
            <div className="mb-6">
                <h2 className="text-xl font-semibold tracking-tight">Technical Expertise</h2>
                <p className="text-sm text-muted-foreground">Manage your skills and categories displayed on the home page.</p>
            </div>

            <SkillsManager initialSkills={skills} />
        </div>
    )
}
