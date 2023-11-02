"use server"

import { prisma } from "@/db";


interface userType {
    id: string,
    username: string,
}

export async function getUserSave(user: userType) {
    
    const userSave = await prisma.userSave.findFirst({
        where: {
            saveUser: {
                id: user.id
            }
        }
    })

    await prisma.$disconnect();

    return userSave;
}