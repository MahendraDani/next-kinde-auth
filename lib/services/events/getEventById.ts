import { prisma } from "@/lib/prisma";
import { Event } from "@prisma/client";

export const getEventById = async (event_id: string) => {
  const event = await prisma.event.findUnique({
    where: {
      event_id
    }
  })
  return event;
}