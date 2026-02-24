import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import { verifyPassword } from "@/lib/auth-utils";
import { z } from "zod";

export const { auth, signIn, signOut, handlers } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({ username: z.string(), password: z.string().min(6) })
                    .safeParse(credentials);

                if (parsedCredentials.success) {
                    const { username, password } = parsedCredentials.data;
                    const user = await prisma.admin.findUnique({ where: { username } });
                    if (!user) return null;

                    const passwordsMatch = await verifyPassword(password, user.password);
                    if (passwordsMatch) return { id: user.id, name: user.username, email: user.username };
                }

                console.log("Invalid credentials");
                return null;
            },
        }),
    ],
});
