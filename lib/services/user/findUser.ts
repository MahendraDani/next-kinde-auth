import { prisma } from "@/lib/prisma";

export const findUser = async (id: string) => {
  const data = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  return data;
};
