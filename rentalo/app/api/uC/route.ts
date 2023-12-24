import getUser from "@/app/actions/getUser";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const currentUser = await getUser();
  if (!currentUser) {
    return NextResponse.json({ error: "Not authorized" }, { status: 401 });
  }

  const body = await request.json();
  const { user, nome, cognome } = body;

  if (currentUser.id !== user.id) {
    return NextResponse.json({ error: "Not authorized" }, { status: 401 });
  }

  if (!nome && !cognome) {
    return NextResponse.json(
      { error: "Inserire nome o cognome" },
      { status: 400 }
    );
  }

  try {
    const updatedUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        name: nome ? nome : user.name,
        surname: cognome ? cognome : user.surname,
      },
    });

    return NextResponse.json({ message: "Informazioni aggiornate!" });
  } catch (error) {
    return NextResponse.json(
      { message: "Si è verificato un errore" },
      { status: 500 }
    );
  }
}
