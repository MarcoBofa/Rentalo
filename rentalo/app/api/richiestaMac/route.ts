import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function POST(request: Request) {
  const body = await request.json();
  const { nome, telefono, email, macchinario } = body;

  if (
    nome == null ||
    telefono == null ||
    email == null ||
    macchinario[0].regione == "" ||
    macchinario[0].operatore == "" ||
    macchinario[0].tipo == "" ||
    macchinario[0].descrizione == ""
  ) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  let operatore: Boolean[] = [];

  macchinario.forEach((macchinario: { operatore: string }) => {
    if (macchinario.operatore == "si") {
      operatore.push(true);
    } else {
      operatore.push(false);
    }
  });

  // Create the richiestaNoleggio and associated macchinari
  const m = await prisma.richiestaNoleggio.create({
    data: {
      nome,
      telefono,
      email,
      // Create the related Macchinario records
      macchinari: {
        create: macchinario.map(
          (
            macchinario: {
              tipo: string;
              regione: string;
              descrizione: string;
              operatore: boolean;
            },
            index: number
          ) => ({
            tipo: macchinario.tipo,
            regione: macchinario.regione,
            descrizione: macchinario.descrizione,
            operatore: operatore[index],
          })
        ),
      },
    },
  });

  return NextResponse.json(m);
}
