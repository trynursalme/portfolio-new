import { getDb } from "@/lib/db"
import { Mail, Phone, MapPin } from "lucide-react"

export const dynamic = 'force-dynamic'

export default async function ContactPage() {
    const db = await getDb()
    const { user } = db.data

    return (
        <div className="container max-w-2xl mx-auto px-4 py-12 md:py-20 lg:py-24">
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-8">Contact</h1>
            <p className="text-xl text-muted-foreground mb-12">
                Interested in working together? Feel free to reach out.
            </p>

            <div className="grid gap-8">
                {user.email && (
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center">
                            <Mail className="h-6 w-6" />
                        </div>
                        <div>
                            <h3 className="font-medium">Email</h3>
                            <a href={`mailto:${user.email}`} className="text-muted-foreground hover:text-foreground transition-colors">
                                {user.email}
                            </a>
                        </div>
                    </div>
                )}

                {user.phone && (
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center">
                            <Phone className="h-6 w-6" />
                        </div>
                        <div>
                            <h3 className="font-medium">Phone</h3>
                            <p className="text-muted-foreground">{user.phone}</p>
                        </div>
                    </div>
                )}

                {user.location && (
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center">
                            <MapPin className="h-6 w-6" />
                        </div>
                        <div>
                            <h3 className="font-medium">Location</h3>
                            <p className="text-muted-foreground">{user.location}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
