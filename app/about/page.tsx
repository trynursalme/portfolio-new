import { getDb } from "@/lib/db"

export const dynamic = 'force-dynamic'

export default async function AboutPage() {
    const db = await getDb()
    const { user } = db.data

    return (
        <div className="container max-w-2xl mx-auto px-4 py-12 md:py-20 lg:py-24">
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-8">About Me</h1>
            <div className="prose prose-zinc dark:prose-invert">
                <p className="text-xl text-muted-foreground leading-relaxed whitespace-pre-wrap">
                    {user.about}
                </p>
            </div>
        </div>
    )
}
