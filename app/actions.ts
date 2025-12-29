"use server"

import { getDb, Project } from "@/lib/db"
import { createSession, deleteSession } from "@/lib/auth"
import { fetchGitHubRepo } from "@/lib/github"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"


const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123"

export async function loginAction(prevState: any, formData: FormData) {
    const password = formData.get("password") as string
    const db = await getDb()
    const storedPassword = db.data.settings.password || process.env.ADMIN_PASSWORD || "admin123"

    if (password === storedPassword) {
        await createSession("admin")
        redirect("/admin")
    } else {
        return { error: "Invalid password" }
    }
}

export async function logoutAction() {
    await deleteSession()
    redirect("/login")
}

export async function addProjectAction(prevState: any, formData: FormData) {
    const githubUrl = formData.get("githubUrl") as string

    if (!githubUrl) {
        return { error: "GitHub URL is required" }
    }

    // Fetch from GitHub
    const repoData = await fetchGitHubRepo(githubUrl)
    if (!repoData) {
        // Fallback if fetch fails? Or error?
        // Requirement: "If GitHub API is unavailable, use cached data". 
        // This implies we can manual entry? Or maybe we just can't fetch.
        // For now, let's error or allow manual overrides in a real app.
        // I'll return error to UI.
        return { error: "Could not fetch GitHub repository. Check URL or API limits." }
    }

    const db = await getDb()
    const newProject: Project = {
        id: crypto.randomUUID(),
        title: repoData.name, // Allow user to override later? Yes via edit.
        description: repoData.description || "",
        githubUrl,
        repoName: repoData.full_name,
        repoData: {
            stars: repoData.stargazers_count,
            language: repoData.language || "Unknown",
            updatedAt: repoData.updated_at,
            description: repoData.description || "",
            homepage: repoData.homepage || ""
        },
        content: repoData.readme || "",
        coverImage: formData.get("coverImage") as string || "",
        order: db.data.projects.length, // Append to end
        tags: []
    }

    db.data.projects.push(newProject)
    await db.write()

    revalidatePath("/")
    revalidatePath("/projects")
    revalidatePath("/admin")
    redirect("/admin")
}

export async function updateSettingsAction(prevState: any, formData: FormData) {
    const db = await getDb()

    db.data.user.name = formData.get("name") as string
    db.data.user.headline = formData.get("headline") as string
    db.data.user.subHeadline = formData.get("subHeadline") as string
    db.data.user.about = formData.get("about") as string
    db.data.user.email = formData.get("email") as string
    db.data.user.phone = formData.get("phone") as string
    db.data.user.location = formData.get("location") as string
    db.data.user.socials.github = formData.get("github") as string
    db.data.user.socials.linkedin = formData.get("linkedin") as string
    db.data.user.socials.twitter = formData.get("twitter") as string

    await db.write()
    revalidatePath("/")
    return { success: true }
}

export async function updateProjectAction(id: string, prevState: any, formData: FormData) {
    const db = await getDb()
    const projectIndex = db.data.projects.findIndex(p => p.id === id)

    if (projectIndex === -1) return { error: "Project not found" }

    const project = db.data.projects[projectIndex]

    project.title = formData.get("title") as string
    project.description = formData.get("description") as string
    project.coverImage = formData.get("coverImage") as string
    project.order = Number(formData.get("order"))

    // Optionally update Github Data again if requested, but for now just manual overrides

    await db.write()
    revalidatePath("/admin")
    revalidatePath("/projects")
    revalidatePath(`/projects/${id}`)

    return { success: true }
}

export async function deleteProjectAction(id: string) {
    const db = await getDb()
    db.data.projects = db.data.projects.filter(p => p.id !== id)
    await db.write()
    revalidatePath("/admin")
    revalidatePath("/projects")
}

export async function updatePasswordAction(prevState: any, formData: FormData) {
    const db = await getDb()
    const currentPassword = formData.get("currentPassword") as string
    const newPassword = formData.get("newPassword") as string
    const confirmPassword = formData.get("confirmPassword") as string

    // Check current password
    const storedPassword = db.data.settings.password || "admin123"
    if (currentPassword !== storedPassword) {
        return { error: "Incorrect current password" }
    }

    if (newPassword !== confirmPassword) {
        return { error: "New passwords do not match" }
    }

    if (newPassword.length < 6) {
        return { error: "Password must be at least 6 characters" }
    }

    db.data.settings.password = newPassword
    await db.write()

    return { success: true }
}

export async function updateSkillsAction(prevState: any, formData: FormData) {
    const db = await getDb()
    const skillsJson = formData.get("skillsJson") as string

    try {
        const skillsData = JSON.parse(skillsJson)
        db.data.skills = skillsData
        await db.write()
        revalidatePath("/")
        revalidatePath("/admin/skills")
        return { success: true }
    } catch (e) {
        return { error: "Invalid JSON data" }
    }
}
