import { prisma } from "@/lib/prisma";
import { Attendees } from "@prisma/client";

export const registerToEvent = async ({
  event_id,
  user_id,
}: Pick<Attendees, "event_id" | "user_id">) => {
  try {
    // Adds the new registrant to attendees table
    const response = await prisma.attendees.create({
      data: {
        id: `${event_id}-${user_id}`,
        event_id,
        user_id,
      },
    });

    // gets the total number of registrants after insertion
    const registrants = await prisma.attendees.count({
      where: {
        event_id,
        is_present: false,
      },
    });

    // Updates the regitrants_count field in Event table
    const increment_registrants_count = await prisma.event.update({
      data: {
        registrants_count: registrants,
      },
      where: {
        event_id,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
