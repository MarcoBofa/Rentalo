import { NextResponse } from "next/server";
import { getCsrfToken } from "next-auth/react";
import bcrypt from "bcrypt";

import prisma from "@/app/libs/prismadb";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, name, surname, password } = body;

  const userExists = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (userExists) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }

  if (email == null || name == null || surname == null || password == null) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: {
      email,
      name,
      surname,
      hashedPassword,
      role: "operatore",
    },
  });

  return NextResponse.json(user);
}
