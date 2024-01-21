import { prisma } from "@/lib/prisma"
import { Event } from "@prisma/client"

export const updateEventById = async (props:
  Pick<Event, "event_id" | "address" | "city" | "state" | "country" | "pincode" | "end_date" | "start_date" | "event_name" | "event_description">) => {
  try {
    const response = await prisma.event.update({
      data: {
        event_name: props.event_name,
        event_description: props.event_description,
        address: props.city,
        city: props.city,
        pincode: props.pincode,
        state: props.state,
        country: props.country,
        start_date: props.start_date,
        end_date: props.end_date
      }, where: {
        event_id: props.event_id
      }
    })
  } catch (error) {
    console.log(error)
  }
}