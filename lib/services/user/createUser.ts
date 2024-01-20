"use server";
import { prisma } from "@/lib/prisma";
import { User } from "@prisma/client";

export const createUser = async ({
  id,
  first_name,
  last_name,
  email,
  role,
}: Pick<User, "id" | "first_name" | "last_name" | "email" | "role">) => {
  const data = await prisma.user.create({
    data: {
      id,
      first_name,
      last_name,
      email,
      role,
      profile_image: "",
    },
  });
  return data;
};
