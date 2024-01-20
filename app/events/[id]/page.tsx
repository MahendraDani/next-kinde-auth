import { Button } from "@/components/ui/button";
import { getEventById } from "@/lib/services/events/getEventById";
import Image from "next/image";
import { EventButton } from "./event-button";

interface EventPageParams {
  params: {
    id: string;
  }
}
export default async function EventPage({ params }: EventPageParams) {

  const event = await getEventById(params.id);
  return (
    <div className="w-full p-16">
      <h1 className="text-4xl font-bold">{event?.event_name}</h1>
      <h2 className="text-lg text-gray-800">{event?.event_description}</h2>
      <Image className="py-4" src={"/sample.jpg"} width={"400"} height={"500"} alt="Image" />
      <p>Venue : {event?.address}</p>
      <p>City : {event?.city}</p>
      <p>State : {event?.state}</p>
      <p>Country : {event?.country}</p>
      {/* <Button>Register</Button> */}
      <EventButton event_id={event?.event_id as string} />
    </div>
  )
}

