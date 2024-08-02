import getUser from "@/app/actions/getUser";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const currentUser = await getUser();
  if (!currentUser) {
    return NextResponse.json({ error: "Not authorized" }, { status: 401 });
  }

  const body = await request.json();
  const { email, mac } = body;

  if (mac.id == "" || mac.categoria == "") {
    return NextResponse.json(
      { error: "Campi obbligatori mancanti" },
      { status: 400 }
    );
  }

  if (currentUser.email !== email) {
    return NextResponse.json({ error: "Not authorized" }, { status: 401 });
  }

  console.log("datiii macccc: ", mac);

  if (mac.tipo === "attrezzatura") {
    const macchinario = await prisma.attrezzatura.findUnique({
      where: { id: mac.id },
    });

    if (!macchinario) {
      return NextResponse.json(
        { error: "Macchinario non trovato" },
        { status: 400 }
      );
    }
    await prisma.attrezzatura.delete({
      where: { id: mac.id },
    });
  } else if (mac.tipo === "sollevamento") {
    const macchinario = await prisma.sollevamento.findUnique({
      where: { id: mac.id },
    });

    if (!macchinario) {
      return NextResponse.json(
        { error: "Macchinario non trovato" },
        { status: 400 }
      );
    }
    await prisma.sollevamento.delete({
      where: { id: mac.id },
    });
  } else if (mac.tipo === "autocarri") {
    const macchinario = await prisma.autocarri.findUnique({
      where: { id: mac.id },
    });

    if (!macchinario) {
      return NextResponse.json(
        { error: "Macchinario non trovato" },
        { status: 400 }
      );
    }
    await prisma.autocarri.delete({
      where: { id: mac.id },
    });
  }
  return NextResponse.json({ message: "Macchinario rimosso" });
}
