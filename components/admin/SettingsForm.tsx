"use client"

import { useActionState } from "react"
import { updateSettingsAction } from "@/app/actions"
import { useFormStatus } from "react-dom"
import { UserData } from "@/lib/db"

function SubmitButton() {
    const { pending } = useFormStatus()
    return (
        <button
            type="submit"
            disabled={pending}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-10"
        >
            {pending ? "Saving..." : "Save Changes"}
        </button>
    )
}

export function SettingsForm({ user }: { user: UserData }) {
    const [state, formAction] = useActionState(updateSettingsAction, null)

    return (
        <form action={formAction} className="space-y-8">
            <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                    <label className="text-sm font-medium">Full Name</label>
                    <input name="name" defaultValue={user.name} required className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <input name="email" type="email" defaultValue={user.email} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium">Phone</label>
                    <input name="phone" defaultValue={user.phone} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium">Location</label>
                    <input name="location" defaultValue={user.location} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium">Headline</label>
                <input name="headline" defaultValue={user.headline} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium">Sub Headline</label>
                <input name="subHeadline" defaultValue={user.subHeadline} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium">About</label>
                <textarea name="about" rows={5} defaultValue={user.about} className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" />
            </div>

            <div className="space-y-4">
                <h3 className="text-lg font-medium">Social Links</h3>
                <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">GitHub URL</label>
                        <input name="github" defaultValue={user.socials.github} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">LinkedIn URL</label>
                        <input name="linkedin" defaultValue={user.socials.linkedin} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Twitter URL</label>
                        <input name="twitter" defaultValue={user.socials.twitter} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" />
                    </div>
                </div>
            </div>

            <SubmitButton />
            {state?.success && <p className="text-green-600 text-sm">Settings saved successfully.</p>}
        </form>
    )
}
