import prisma from "@/app/libs/prismadb";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  const body = await request.json();
  const { user, password, confirmPassword } = body;

  console.log("USEEER", user);

  console.log("PASS", password, "CONFIRM", confirmPassword);

  if (!password || !confirmPassword) {
    return Response.json({ error: "Inserire la password" }, { status: 400 });
  }

  if (password !== confirmPassword) {
    return Response.json(
      { error: "Le password non coincidono" },
      { status: 400 }
    );
  }

  const now = new Date();

  if (user.resetPasswordTokenExpiry < now) {
    return Response.json(
      { error: "Il link di ripristino è scaduto" },
      { status: 400 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const updatedUser = await prisma.user.update({
    where: {
      email: user.email,
      resetPasswordToken: user.resetPasswordToken,
    },
    data: {
      resetPasswordToken: null,
      resetPasswordTokenExpiry: null,
      hashedPassword: hashedPassword,
    },
  });

  return Response.json({ message: "updated" });
}
