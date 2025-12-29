import { getDb } from "@/lib/db"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { TechStack } from "@/components/TechStack"

export default async function Home() {
  const db = await getDb()
  const { user } = db.data

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="container flex flex-col justify-center px-4 py-24 md:py-32 lg:py-40">
        <div className="flex flex-col items-start gap-8 max-w-4xl animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl leading-tight">
            {user.headline}
          </h1>
          <p className="text-xl text-muted-foreground md:text-2xl max-w-2xl leading-relaxed">
            {user.subHeadline}
          </p>
          <div className="flex flex-wrap gap-4 mt-4">
            <Link
              href="/projects"
              className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 text-base font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              View Projects <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex h-12 items-center justify-center rounded-full border border-input bg-background px-8 text-base font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              Contact Me
            </Link>
          </div>
        </div>
      </section>

      <TechStack />
      {/* Intro / About Teaser could go here */}
    </div>
  )
}
