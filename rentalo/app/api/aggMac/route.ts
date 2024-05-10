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
    console.log("ciaospcapsncsapnc", categoria);
    const m = await prisma.attrezzatura.create({
      data: {
        nome,
        descrizione,
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
    console.log("messagee", m);
  }

  return NextResponse.json("User already exists");
}
