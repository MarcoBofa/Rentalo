import { User } from "@prisma/client";
import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: User;
  }
}

declare module "next-auth/jwt" {
  type JWT = User;
}

export type IFormInput = {
  name?: string;
  surname?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  role?: string;
};

export type ModalForm = {
  email?: string;
};

export type safeUser = Omit<User, "createdAt" | "updatedAt"> & {
  createdAt: string;
  updatedAt: string;
};

interface watchlistProps {
  watchlist: string[];
  setWatchlist: React.Dispatch<React.SetStateAction<string[]>>;
}
