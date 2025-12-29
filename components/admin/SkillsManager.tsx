"use client"

import { useActionState, useState } from "react"
import { updateSkillsAction } from "@/app/actions"
import { useFormStatus } from "react-dom"
import { Plus, X, Trash2, GripVertical, Save } from "lucide-react"

interface SkillCategory {
    id: string;
    title: string;
    skills: string[];
}

function SubmitButton() {
    const { pending } = useFormStatus()
    return (
        <button
            type="submit"
            disabled={pending}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-10 gap-2"
        >
            {pending ? "Saving..." : <><Save className="h-4 w-4" /> Save Changes</>}
        </button>
    )
}

export function SkillsManager({ initialSkills }: { initialSkills: SkillCategory[] }) {
    const [skills, setSkills] = useState<SkillCategory[]>(initialSkills)
    const [state, formAction] = useActionState(updateSkillsAction, null)

    const addCategory = () => {
        const newCategory: SkillCategory = {
            id: crypto.randomUUID(),
            title: "New Category",
            skills: []
        }
        setSkills([...skills, newCategory])
    }

    const removeCategory = (id: string) => {
        setSkills(skills.filter(c => c.id !== id))
    }

    const updateCategoryTitle = (id: string, title: string) => {
        setSkills(skills.map(c => c.id === id ? { ...c, title } : c))
    }

    const addSkill = (catId: string) => {
        setSkills(skills.map(c => {
            if (c.id === catId) {
                return { ...c, skills: [...c.skills, "New Skill"] }
            }
            return c
        }))
    }

    const updateSkill = (catId: string, index: number, value: string) => {
        setSkills(skills.map(c => {
            if (c.id === catId) {
                const newSkills = [...c.skills]
                newSkills[index] = value
                return { ...c, skills: newSkills }
            }
            return c
        }))
    }

    const removeSkill = (catId: string, index: number) => {
        setSkills(skills.map(c => {
            if (c.id === catId) {
                const newSkills = c.skills.filter((_, i) => i !== index)
                return { ...c, skills: newSkills }
            }
            return c
        }))
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <p className="text-sm text-muted-foreground">Manage your technical expertise sections.</p>
                <button
                    onClick={addCategory}
                    type="button"
                    className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                    <Plus className="mr-2 h-4 w-4" /> Add Category
                </button>
            </div>

            <form action={formAction} className="space-y-6">
                <input type="hidden" name="skillsJson" value={JSON.stringify(skills)} />

                <div className="space-y-6">
                    {skills.map((category, catIdx) => (
                        <div key={category.id} className="rounded-xl border bg-card text-card-foreground shadow-sm">
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-4 gap-4">
                                    <input
                                        value={category.title}
                                        onChange={(e) => updateCategoryTitle(category.id, e.target.value)}
                                        className="flex h-10 w-full md:w-1/2 rounded-md border border-input bg-background px-3 py-2 text-lg font-semibold ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                        placeholder="Category Name"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeCategory(category.id)}
                                        className="text-muted-foreground hover:text-destructive transition-colors relative"
                                        title="Delete Category"
                                    >
                                        <Trash2 className="h-5 w-5" />
                                    </button>
                                </div>

                                <div className="space-y-3">
                                    {category.skills.map((skill, skillIdx) => (
                                        <div key={skillIdx} className="flex items-center gap-2">
                                            <GripVertical className="h-4 w-4 text-muted-foreground/50 cursor-move" />
                                            <input
                                                value={skill}
                                                onChange={(e) => updateSkill(category.id, skillIdx, e.target.value)}
                                                className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeSkill(category.id, skillIdx)}
                                                className="text-muted-foreground hover:text-destructive"
                                            >
                                                <X className="h-4 w-4" />
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={() => addSkill(category.id)}
                                        className="inline-flex items-center text-sm text-primary hover:text-primary/80 mt-2"
                                    >
                                        <Plus className="mr-1 h-3 w-3" /> Add Skill
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex justify-end pt-4">
                    <SubmitButton />
                </div>
                {state?.success && <p className="text-green-600 text-sm text-right mt-2">Skills saved successfully.</p>}
                {state?.error && <p className="text-destructive text-sm text-right mt-2">{state.error}</p>}
            </form>
        </div>
    )
}
