"use client";
import React, { createContext, ReactNode } from "react";
import { safeUser } from "@/types"; // Adjust the import path to your `SafeUser` type
import { Account } from "@prisma/client";

interface UserContextType {
  currentUser: safeUser | null;
  userAccount: Account | null;
}

const defaultContextValue: UserContextType = {
  currentUser: null,
  userAccount: null,
};

const UserContext = createContext<UserContextType>(defaultContextValue);

export const UserProvider: React.FC<{
  children: ReactNode;
  value: UserContextType;
}> = ({ children, value }) => {
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContext;
