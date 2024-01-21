import { prisma } from "@/lib/prisma"

export const getRegistrant = async ({ event_id, user_id }: {
  event_id: string,
  user_id: string
}) => {
  try {
    let isRegistered = true;
    const response = await prisma.attendees.findUnique({
      where: {
        id: `${event_id}-${user_id}`
      }
    })

    if (!response) {
      isRegistered = false;
    }

    return isRegistered
  } catch (error) {
    console.log(error)
  }
}