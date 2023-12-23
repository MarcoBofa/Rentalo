import { RecoverEmailTemplate } from "@/app/email-templates/recoverEmail";
import { Resend } from "resend";
import prisma from "@/app/libs/prismadb";

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
    let userName = user.name || "";
    try {
      const data = await resend.emails.send({
        from: "Rentalo <info@rentaloo.net>",
        to: [email],
        subject: "Ripristina la tua password",
        react: RecoverEmailTemplate({
          firstName: userName,
          resetLink: "https://rentaloo.net",
        }) as React.ReactElement,
      });

      return Response.json({ message: "sent" });
    } catch (error) {
      return Response.json({ error });
    }
  } else return Response.json({ message: "sent" });
}
