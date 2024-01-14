import { prisma } from "@/lib/prisma";

interface CreateUserParams {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  profile_image?: string;
}
export const createUser = async ({
  id,
  first_name,
  last_name,
  email,
  role,
  profile_image,
}: CreateUserParams) => {
  const data = await prisma.user.create({
    data: {
      id,
      first_name,
      last_name,
      email,
      role,
      profile_image,
    },
  });
  return data;
};
