import { prisma } from "@/lib/prisma";

export const markEventAsCompleted = async ({
  event_id,
}: {
  event_id: string;
}) => {
  const resposne = await prisma.event.update({
    data: {
      is_completed: true,
    },
    where: {
      event_id,
    },
  });
};
