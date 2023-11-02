"use server"

import { prisma } from "@/db"
import { useSession } from 'next-auth/react';

export async function logInAuthorizedEmail(email: string) {
    if (!email || email == "") {
        console.error('(!) cannot log in authorized email (', email, ')')
        return;
    }

    const user = await prisma.users.findFirst({
        where: {
            email: email
        }
    });

    if (!user) {
        console.log('no user found')
    }

    console.log(user)
}
