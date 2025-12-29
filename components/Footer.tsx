import { getDb } from "@/lib/db"
import Link from "next/link"
import { Github, Linkedin, Twitter, Mail } from "lucide-react"

export async function Footer() {
    const db = await getDb()
    const { user } = db.data

    return (
        <footer className="border-t border-border/50 bg-background py-12">
            <div className="container mx-auto flex flex-col items-center justify-between gap-6 px-4 md:flex-row">
                <div className="text-center md:text-left">
                    <p className="text-sm text-muted-foreground">
                        &copy; {new Date().getFullYear()} {user.name}. All rights reserved.
                    </p>
                </div>

                <div className="flex items-center gap-6">
                    {user.socials.github && (
                        <Link href={user.socials.github} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground">
                            <Github className="h-5 w-5" />
                            <span className="sr-only">GitHub</span>
                        </Link>
                    )}
                    {user.socials.linkedin && (
                        <Link href={user.socials.linkedin} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground">
                            <Linkedin className="h-5 w-5" />
                            <span className="sr-only">LinkedIn</span>
                        </Link>
                    )}
                    {user.socials.twitter && (
                        <Link href={user.socials.twitter} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground">
                            <Twitter className="h-5 w-5" />
                            <span className="sr-only">Twitter</span>
                        </Link>
                    )}
                    {user.email && (
                        <Link href={`mailto:${user.email}`} className="text-muted-foreground hover:text-foreground">
                            <Mail className="h-5 w-5" />
                            <span className="sr-only">Email</span>
                        </Link>
                    )}
                </div>
            </div>
        </footer>
    )
}
