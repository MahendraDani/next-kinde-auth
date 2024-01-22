"use server";

import { createEvent } from "@/lib/services/events/createEvent";
import { revalidatePath } from "next/cache";
import dayjs from "dayjs";
export const createEventAction = async (formData: FormData) => {
  try {
    const isEndDateBefore = dayjs(formData.get("end_date") as string).isBefore(
      dayjs(formData.get("start_date") as string)
    );
    if (isEndDateBefore) {
      console.log("End date should be after start date");
      return;
    }
    const response = await createEvent({
      organizer_id: formData.get("org_id") as string,
      event_description: formData.get("event_description") as string,
      event_name: formData.get("event_name") as string,
      start_date: new Date(formData.get("start_date") as string),
      end_date: new Date(formData.get("end_date") as string),
      address: formData.get("address") as string,
      city: formData.get("city") as string,
      state: formData.get("state") as string,
      country: formData.get("country") as string,
      pincode: parseInt(formData.get("pincode") as string),
    });
    revalidatePath("/events");
  } catch (error) {
    console.log("Some error in create event action", error);
  }
};
