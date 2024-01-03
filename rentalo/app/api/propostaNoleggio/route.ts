import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function POST(request: Request) {
  const body = await request.json();
  const { nome, telefono, email, macchinario, businessType } = body; // Note that this should be 'macchinari' to match the model

  //console.log("BODDYYY", body);

  if (
    nome == null ||
    telefono == null ||
    email == null ||
    businessType == null ||
    macchinario[0].regione == "" ||
    macchinario[0].operatore == "" ||
    macchinario[0].tipo == "" ||
    macchinario[0].descrizione == ""
  ) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  let impresa = true;
  let operatore: Boolean[] = [];

  if (businessType == "concessionaria") {
    impresa = false;
  }

  macchinario.forEach((macchinario: { operatore: string }) => {
    if (macchinario.operatore == "si") {
      operatore.push(true);
    } else {
      operatore.push(false);
    }
  });

  const m = await prisma.propostaNoleggio.create({
    data: {
      nome,
      telefono,
      email,
      impresa: impresa,
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
