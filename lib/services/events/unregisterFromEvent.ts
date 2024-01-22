import { prisma } from "@/lib/prisma"

export const unregisterFromEvent = async ({ event_id, user_id }: { event_id: string, user_id: string }) => {
  try {
    const response = await prisma.attendees.delete({
      where: {
        id: `${event_id}-${user_id}`,
        is_present: false,
      }
    })
  } catch (error) {
    console.log(error)
  }
}