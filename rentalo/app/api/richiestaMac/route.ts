import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function POST(request: Request) {
  const body = await request.json();
  const { nome, telefono, email, regione, descrizione, noleggio, tipo } = body;

  if (
    nome == null ||
    telefono == null ||
    email == null ||
    regione == null ||
    descrizione == null ||
    noleggio == null ||
    tipo == null
  ) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  let n = true;
  if (noleggio === "noleggio") {
    n = true;
  } else {
    n = false;
  }

  const m = await prisma.macchinario.create({
    data: {
      nome,
      telefono,
      email,
      regione,
      noleggio: n,
      tipo,
      descrizione,
    },
  });

  return NextResponse.json(m);
}
