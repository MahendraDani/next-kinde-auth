import { prisma } from "@/lib/prisma"

export const deleteEvent = async ({ event_id }: { event_id: string }) => {
  const response = await prisma.event.delete({
    where: {
      event_id,
    }
  })
}