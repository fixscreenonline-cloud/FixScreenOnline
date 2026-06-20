import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { prisma } from "@/lib/prisma";
import {
  consumeOneTimeLoginToken,
  validateAdminSession,
} from "@/lib/auth/lockout";
import { SESSION_TIMEOUT_MS } from "@/lib/auth/constants";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      twoFactorEnabled: boolean;
    };
  }

  interface User {
    id: string;
    email: string;
    twoFactorEnabled: boolean;
    emailVerified?: Date | null;
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: process.env.AUTH_SECRET,
  trustHost: true,
  session: {
    strategy: "jwt",
    maxAge: SESSION_TIMEOUT_MS / 1000,
  },
  pages: {
    signIn: "/admin/login",
  },
  providers: [
    Credentials({
      id: "admin-token",
      name: "Admin Token",
      credentials: {
        loginToken: { label: "Login Token", type: "text" },
      },
      async authorize(credentials) {
        const loginToken = credentials?.loginToken as string | undefined;

        if (!loginToken) return null;

        const adminId = await consumeOneTimeLoginToken(loginToken);

        if (!adminId) return null;

        const admin = await prisma.admin.findUnique({ where: { id: adminId } });

        if (!admin) return null;

        return {
          id: admin.id,
          email: admin.email,
          twoFactorEnabled: admin.twoFactorEnabled,
          emailVerified: null,
        };
      },
    }),
    Credentials({
      id: "admin-session",
      name: "Admin Session",
      credentials: {
        sessionToken: { label: "Session Token", type: "text" },
      },
      async authorize(credentials) {
        const sessionToken = credentials?.sessionToken as string | undefined;

        if (!sessionToken) return null;

        const session = await validateAdminSession(sessionToken);

        if (!session) return null;

        return {
          id: session.admin.id,
          email: session.admin.email,
          twoFactorEnabled: session.admin.twoFactorEnabled,
          emailVerified: null,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.adminId = user.id;
        token.email = user.email;
        token.twoFactorEnabled = user.twoFactorEnabled;
      }

      return token;
    },
    async session({ session, token }) {
      if (token.adminId) {
        return {
          ...session,
          user: {
            id: token.adminId as string,
            email: (token.email as string) ?? "",
            twoFactorEnabled: Boolean(token.twoFactorEnabled),
          },
        };
      }

      return session;
    },
  },
});
