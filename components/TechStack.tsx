import { getDb } from "@/lib/db"
import { Database, Code, Terminal, Brain, Briefcase } from "lucide-react"

const ICON_MAP: Record<string, any> = {
    "Data Engineering": Database,
    "Programming": Code,
    "Deployment & MLOps": Terminal,
    "Machine Learning": Brain,
    "Career Skills": Briefcase
}

export async function TechStack() {
    const db = await getDb()
    const categories = db.data.skills || []

    return (
        <section className="container px-4 py-24">
            <div className="mb-12">
                <h2 className="text-3xl font-bold tracking-tight mb-4">Technical Expertise</h2>
                <p className="text-muted-foreground max-w-2xl">
                    A comprehensive overview of my skills across data engineering, machine learning, and software development.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((cat) => {
                    const Icon = ICON_MAP[cat.title] || Code
                    return (
                        <div key={cat.id} className="bg-card border border-border/50 rounded-xl p-6 hover:border-primary/50 transition-colors">
                            <div className="flex items-center gap-3 mb-6">
                                <Icon className="h-6 w-6 text-primary" />
                                <h3 className="font-semibold text-lg">{cat.title}</h3>
                            </div>
                            <ul className="space-y-2">
                                {cat.skills.map((skill, sIdx) => (
                                    <li key={sIdx} className="text-sm text-muted-foreground flex items-start gap-2">
                                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary/50 shrink-0" />
                                        {skill}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}
