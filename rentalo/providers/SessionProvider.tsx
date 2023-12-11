import { SessionProvider } from "next-auth/react";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const SessionProviders = (props: Props) => {
  return <SessionProvider>{props.children}</SessionProvider>;
};

export default SessionProviders;
