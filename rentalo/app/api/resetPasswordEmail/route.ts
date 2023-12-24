import { RecoverEmailTemplate } from "@/app/email-templates/recoverEmail";
import { Resend } from "resend";
import prisma from "@/app/libs/prismadb";
import crypto from "crypto";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const body = await request.json();
  const { email } = body;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (user) {
    const account = await prisma.account.findFirst({
      where: {
        userId: user.id,
      },
    });

    if (
      account &&
      (account.provider == "google" ||
        account.provider == "facebook" ||
        account.provider == "github")
    ) {
      return Response.json(
        {
          error:
            "Siamo spiacenti ma non è possibile ripristinare la password di un account creato tramite social, la preghiamo di riprovare sul sito del provider utilizzato",
        },
        { status: 400 }
      );
    }

    const resetPasswordToken = crypto.randomBytes(64).toString("base64url");
    const now = new Date();
    const expiryDate = new Date(); // Create a new Date object for the expiry time
    expiryDate.setMinutes(now.getMinutes() + 15); // Set the expiry time to 15 minutes later

    const updatedUser = await prisma.user.update({
      where: {
        email,
      },
      data: {
        resetPasswordToken: resetPasswordToken,
        resetPasswordTokenExpiry: expiryDate,
      },
    });

    let userName = user.name || "";
    try {
      const data = await resend.emails.send({
        from: "Rentalo <info@rentaloo.net>",
        to: [email],
        subject: "Ripristina la tua password",
        react: RecoverEmailTemplate({
          firstName: userName,
          resetLink: `https://rentaloo.net/resetPassword?token=${resetPasswordToken}`,
        }) as React.ReactElement,
      });

      return Response.json({ message: "sent" });
    } catch (error) {
      return Response.json({ error });
    }
  } else return Response.json({ message: "sent" });
}
