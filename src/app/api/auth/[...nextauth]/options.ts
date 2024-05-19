import { prisma } from "@/db/prisma";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import * as bcrypt from "bcrypt";
export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "email",
        },
        password: {
          label: "Password:",
          type: "password",
          placeholder: "",
        },
      },
      async authorize(credentials) {
        const user = await prisma.users.findUnique({
          where: {
            email: credentials?.email,
          },
        });
        if (user && credentials?.password) {
          if (await bcrypt.compare(credentials.password, user.password)) {
            return user;
          }
          return null;
        } else {
          return null;
        }
      },
    }),
  ],
  // Can create own signin/signup pages
  pages: {
    signIn: "/auth/signin",
  },
};
