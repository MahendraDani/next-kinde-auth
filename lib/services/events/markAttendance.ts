import { prisma } from "@/lib/prisma";

export const markAttendence = async ({
  user_id,
  event_id,
}: {
  user_id: string;
  event_id: string;
}) => {
  const response = await prisma.attendees.update({
    data: {
      is_present: true,
    },
    where: {
      id: `${event_id}-${user_id}`,
    },
  });

  const prev_attendee_count = await prisma.attendees.count({
    where: {
      is_present: true,
      event_id,
    },
  });

  const add_attendee_count = await prisma.event.update({
    data: {
      attendees_count: prev_attendee_count + 1,
    },
    where: {
      event_id,
    },
  });
};
