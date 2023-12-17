"use client";
import React, { createContext, ReactNode } from "react";
import { safeUser } from "@/types"; // Adjust the import path to your `SafeUser` type

interface UserContextType {
  currentUser: safeUser | null;
}

const defaultContextValue: UserContextType = {
  currentUser: null,
};

const UserContext = createContext<UserContextType>(defaultContextValue);

export const UserProvider: React.FC<{
  children: ReactNode;
  value: UserContextType;
}> = ({ children, value }) => {
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContext;
