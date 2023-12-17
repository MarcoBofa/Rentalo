import { NextResponse } from "next/server";
import { getCsrfToken } from "next-auth/react";
import bcrypt from "bcrypt";

import prisma from "@/app/libs/prismadb";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, name, surname, piva, password, role } = body;

  const userExists = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (userExists) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }

  if (
    email == null ||
    name == null ||
    surname == null ||
    piva == null ||
    password == null ||
    role == null
  ) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: {
      email,
      name,
      surname,
      piva,
      hashedPassword,
      role: "azienda",
    },
  });

  return NextResponse.json(user);
}
