import getUser from "@/app/actions/getUser";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const currentUser = await getUser();
  if (!currentUser) {
    return NextResponse.json({ error: "Not authorized" }, { status: 401 });
  }

  if (currentUser.role != "azienda") {
    return NextResponse.json({ error: "Not authorized" }, { status: 401 });
  }
  const user = await prisma.user.findUnique({
    where: {
      email: currentUser.email,
    },
  });

  if (!user) {
    return NextResponse.json(
      { error: "Nessun account trovato" },
      { status: 401 }
    );
  }

  const mac = await prisma.attrezzatura.findMany({
    where: {
      aziendaId: currentUser.id,
    },
  });

  return NextResponse.json(mac);
}
