import { getDb } from "@/lib/db"
import { SettingsForm } from "@/components/admin/SettingsForm"
import { ChangePasswordForm } from "@/components/admin/ChangePasswordForm"

export const dynamic = 'force-dynamic'

export default async function SettingsPage() {
    const db = await getDb()
    const { user } = db.data

    return (
        <div className="max-w-2xl pb-12">
            <div className="mb-6">
                <h2 className="text-xl font-semibold tracking-tight">Profile Settings</h2>
                <p className="text-sm text-muted-foreground">Manage your personal information and social links.</p>
            </div>
            <SettingsForm user={user} />

            <ChangePasswordForm />
        </div>
    )
}
