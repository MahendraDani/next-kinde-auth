import { prisma } from "@/lib/prisma";

export const getEventAttendee = async ({
  user_id,
  event_id,
}: {
  user_id: string;
  event_id: String;
}) => {
  const response = await prisma.attendees.findUnique({
    where: {
      id: `${event_id}-${user_id}`,
      is_present: true,
    },
  });
  if (response) {
    return { data: response, success: true };
  } else {
    return { data: null, success: false };
  }
};
