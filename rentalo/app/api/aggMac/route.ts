import getUser from "@/app/actions/getUser";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const currentUser = await getUser();
  if (!currentUser) {
    return NextResponse.json({ error: "Not authorized" }, { status: 401 });
  }

  const body = await request.json();
  const {
    nome,
    categoria,
    descrizione,
    produttore,
    peso,
    altezzaLavoro,
    portata,
    dimensioneCarro,
    dimensioneCassone,
    customFields,
    user,
  } = body;

  console.log("pesoooooooo", peso);

  if (nome == "" || categoria == "" || descrizione == "" || produttore == "") {
    return NextResponse.json(
      { error: "Campi obbligatori mancanti" },
      { status: 400 }
    );
  }

  if (currentUser.id !== user.id) {
    return NextResponse.json({ error: "Not authorized" }, { status: 401 });
  }

  if (categoria === "Attrezzatura") {
    const m = await prisma.attrezzatura.create({
      data: {
        nome,
        descrizione,
        tipo: "attrezzatura",
        peso: Number(peso),
        produttore,
        attributi: customFields,
        azienda: {
          connect: {
            id: user.id,
          },
        },
      },
    });
  } else if (categoria === "Sollevamento") {
    const m = await prisma.sollevamento.create({
      data: {
        nome,
        descrizione,
        portata: Number(portata),
        tipo: "sollevamento",
        produttore,
        peso: peso,
        altezzaLavoro: altezzaLavoro ? altezzaLavoro : null,
        dimensioneCarro: dimensioneCarro ? dimensioneCarro : null,
        attributi: customFields,
        azienda: {
          connect: {
            id: user.id,
          },
        },
      },
    });
  } else if (categoria === "Autocarri") {
    const m = await prisma.autocarri.create({
      data: {
        nome,
        descrizione,
        portata: Number(portata),
        tipo: "autocarri",
        produttore,
        peso: Number(peso),
        dimensioneCarro: dimensioneCarro ? dimensioneCarro : null,
        attributi: customFields,
        azienda: {
          connect: {
            id: user.id,
          },
        },
      },
    });
  }
  return NextResponse.json({ message: "Macchinario aggiunto" });
}
