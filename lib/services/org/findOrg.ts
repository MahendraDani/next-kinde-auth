import { prisma } from "@/lib/prisma";
import { Organization } from "@prisma/client";

export const findOrg = async (org_id: string) => {
  const data = await prisma.organization.findUnique({
    where: {
      org_id,
    },
  });
  return { data, success: true };
};
