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

  const [att, sol, aut, pale] = await Promise.all([
    prisma.attrezzatura.findMany({
      where: {
        aziendaId: currentUser.id,
      },
    }),
    prisma.sollevamento.findMany({
      where: {
        aziendaId: currentUser.id,
      },
    }),
    prisma.autocarri.findMany({
      where: {
        aziendaId: currentUser.id,
      },
    }),
    prisma.pale.findMany({
      where: {
        aziendaId: currentUser.id,
      },
    }),
  ]);

  const combinedArray = [...att, ...sol, ...aut, ...pale];

  console.log(combinedArray);

  console.log("dataaaaaaaa ", combinedArray);

  return NextResponse.json(combinedArray);
}
