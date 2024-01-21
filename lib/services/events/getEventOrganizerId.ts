import { prisma } from "@/lib/prisma"

export const getEventOrganizerId = async ({ event_id }: { event_id: string; }) => {
  const response = await prisma.event.findUnique({
    where: {
      event_id
    }
  })

  if (response) {
    return response.organizer_id;
  }
}