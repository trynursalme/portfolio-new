import Link from "next/link"
import { logoutAction } from "@/app/actions"
import { LayoutDashboard, Settings, LogOut } from "lucide-react"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="container mx-auto py-10 px-4 md:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between mb-8 border-b border-border pb-6 gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                    <p className="text-muted-foreground">Manage your portfolio content</p>
                </div>
                <div className="flex items-center gap-6">
                    <Link href="/admin" className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary">
                        <LayoutDashboard className="h-4 w-4" /> Projects
                    </Link>
                    <Link href="/admin/skills" className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary">
                        <LayoutDashboard className="h-4 w-4" /> Skills
                    </Link>
                    <Link href="/admin/settings" className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary">
                        <Settings className="h-4 w-4" /> Settings
                    </Link>
                    <form action={logoutAction}>
                        <button className="flex items-center gap-2 text-sm font-medium text-destructive transition-colors hover:text-destructive/80">
                            <LogOut className="h-4 w-4" /> Logout
                        </button>
                    </form>
                </div>
            </div>
            {children}
        </div>
    )
}
