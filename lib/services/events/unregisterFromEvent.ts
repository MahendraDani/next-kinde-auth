import { prisma } from "@/lib/prisma";

export const unregisterFromEvent = async ({
  event_id,
  user_id,
}: {
  event_id: string;
  user_id: string;
}) => {
  try {
    const prev_registrants_count = await prisma.attendees.count();
    const response = await prisma.attendees.delete({
      where: {
        id: `${event_id}-${user_id}`,
        is_present: false,
      },
    });

    const update_registrants_count = await prisma.event.update({
      data: {
        registrants_count: prev_registrants_count - 1,
      },
      where: {
        event_id,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
