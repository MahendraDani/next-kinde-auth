import { prisma } from "@/lib/prisma"

export const getEventOrganizer = async ({ org_id, event_id }: { org_id: string, event_id: string }) => {
  const response = await prisma.organization.findUnique({
    where: {
      org_id,
      events: {
        some: {
          event_id
        }
      }
    }
  })
  return (
    response
  )
}