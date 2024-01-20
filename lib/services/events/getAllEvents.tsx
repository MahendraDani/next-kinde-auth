import { prisma } from "@/lib/prisma"
import { Event } from "@prisma/client";

export const getAllEvents = async (): Promise<Event[]> => {
  const events = await prisma.event.findMany();
  return events;
}