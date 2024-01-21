"use server"

import { deleteEvent } from "@/lib/services/events/deleteEvent"
import { redirect } from "next/navigation"

export const deleteEventAction = async (formData: FormData) => {
  const response = await deleteEvent({
    event_id: formData.get("event_id") as string,
  })
  redirect("/events");
}