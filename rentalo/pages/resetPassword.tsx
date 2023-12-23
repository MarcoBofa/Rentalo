import ResetPassForm from "@/app/components/authentication/resetPassForm";
import prisma from "@/app/libs/prismadb";
import React from "react";
import { safeUser } from "@/types";

export default function resetPassword({ user }: { user: safeUser }) {
  // Use 'token' as needed

  return (
    <>
      <ResetPassForm user={user} />
    </>
  );
}

export async function getServerSideProps(context: any) {
  // Extract 'token' from the query parameters
  let { token } = context.query;

  if (!token) {
    return {
      redirect: {
        destination: "/", // Redirect to the home page
        permanent: false, // Temporary redirect
      },
    };
  }

  const user = await prisma.user.findFirst({
    where: {
      resetPasswordToken: token,
    },
  });

  if (!user) {
    return {
      redirect: {
        destination: "/", // Redirect to the home page
        permanent: false, // Temporary redirect
      },
    };
  } else {
    const now = new Date();
    if (user.resetPasswordTokenExpiry && user.resetPasswordTokenExpiry < now) {
      return {
        redirect: {
          destination: "/", // Redirect to the home page
          permanent: false, // Temporary redirect
        },
      };
    }
  }
  if (user && user.resetPasswordTokenExpiry) {
    // Transform User object to safeUser
    const safeUser: safeUser = {
      ...user,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
      resetPasswordTokenExpiry: user.resetPasswordTokenExpiry.toISOString(),
    };

    return { props: { user: safeUser } };
  }
}
