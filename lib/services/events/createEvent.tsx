import { prisma } from "@/lib/prisma"
import { Event } from "@prisma/client"
import { revalidatePath } from "next/cache"

export const createEvent = async (props: Pick<Event, "organizer_id" | "address" | "city" | "state" | "country" | "pincode" | "end_date" | "start_date" | "event_name" | "event_description">) => {
  try {
    const response = await prisma.event.create({
      data: {
        organizer_id: props.organizer_id,
        event_name: props.event_name,
        event_description: props.event_description,
        address: props.address,
        city: props.city,
        state: props.state,
        country: props.country,
        pincode: props.pincode,
        start_date: props.start_date,
        end_date: props.end_date,
      }
    })
    return response;
  } catch (error) {
    console.log("Some error creating error", error)
  }
}