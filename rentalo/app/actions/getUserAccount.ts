"use server";

import { getServerSession } from "next-auth/next";
import authOptions from "@/app/api/auth/[...nextauth]/option";
import prisma from "@/app/libs/prismadb";

export default async function getUserAccount() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return null;
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    });

    if (!currentUser) {
      return null;
    }

    const account = await prisma.account.findFirst({
      where: {
        userId: currentUser.id,
      },
    });

    if (!account) {
      return null;
    }

    return account;
  } catch (error: any) {
    return null;
  }
}
