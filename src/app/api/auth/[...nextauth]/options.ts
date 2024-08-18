import { prisma } from "@/db/prisma";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import * as bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "email",
        },
        firstName: {
          label: "First Name",
          type: "text",
          placeholder: "firstName",
        },
        lastName: {
          label: "Last Name",
          type: "text",
          placeholder: "lastName",
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
            email: credentials?.email.toLowerCase(),
          },
          include: {
            UserRoles: {
              include: {
                roles: true,
              },
            },
          },
        });
        if (user && credentials?.password) {
          if (await bcrypt.compare(credentials.password, user.password)) {
            user.password = "";
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
  callbacks: {
    async jwt({ token, user, session }) {
      if (user) {
        (token.firstName = user.firstName),
          (token.lastName = user.lastName),
          (token.id = user.id);
        let roles = [];
        for (let i = 0; i < user.UserRoles.length; i++) {
          roles.push(user.UserRoles[i].roles.role);
        }
        token.roles = roles;
      }
      return token;
    },
    async session({ session, token, user }) {
      session.user.firstName = token.firstName;
      session.user.lastName = token.lastName;
      session.user.roles = token.roles;
      session.user.id = token.id;
      return session;
    },
  },
};
