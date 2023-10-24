"use server"
import { prisma } from "@/db"

export async function togglePostVisibility (id: string, postVisible: boolean) {
    await prisma.blogPost.update({ where: { id }, data: { postVisible }})
}
