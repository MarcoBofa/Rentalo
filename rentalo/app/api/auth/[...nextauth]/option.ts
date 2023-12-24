import bcrypt from "bcrypt";
import { AuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import prisma from "../../../libs/prismadb";

interface ExtendedUser extends User {
  role: string;
}

const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      profile(profile: any) {
        let userRole = "privato";

        if (profile?.email === process.env.ADMIN_EMAIL) {
          userRole = "admin";
        }

        return {
          id: profile.id,
          email: profile?.email,
          name: profile?.login,
          surname: null,
          image: profile?.avatar_url,
          birthDate: null,
          role: userRole,
          email_verified: true,
          emailVerificationToken: null,
          resetPasswordToken: null,
          resetPasswordTokenExpiry: null,
        };
      },
      clientId:
        process.env.NODE_ENV === "development"
          ? (process.env.GITHUB_ID_DEV as string)
          : (process.env.GITHUB_ID as string),
      clientSecret:
        process.env.NODE_ENV === "development"
          ? (process.env.GITHUB_SECRET_DEV as string)
          : (process.env.GITHUB_SECRET as string),
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      profile(profile) {
        return {
          id: profile.sub,
          name: `${profile.given_name} ${profile.family_name}`,
          surname: null,
          email: profile.email,
          image: profile.picture,
          birthDate: profile.birthdate || null,
          role: profile.role ? profile.role : "privato",
          email_verified: profile.email_verified,
          emailVerificationToken: null,
          resetPasswordToken: null,
          resetPasswordTokenExpiry: null,
        };
      },
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !user?.hashedPassword) {
          throw new Error("Invalid credentials");
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        if (!isCorrectPassword) {
          throw new Error("Invalid credentials");
        }

        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // Cast user to the extended type
        const extendedUser = user as ExtendedUser;
        token.role = extendedUser.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        // Extend the session's user type
        (session.user as ExtendedUser).role = token.role as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/",
  },
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
    maxAge: 3 * 24 * 60 * 60, // Session will expire after 30 days
    updateAge: 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default authOptions;
