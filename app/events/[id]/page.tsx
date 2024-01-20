import { Button } from "@/components/ui/button";
import { getEventById } from "@/lib/services/events/getEventById";
import Image from "next/image";

interface EventPageParams {
  params: {
    id: string;
  }
}
export default async function EventPage({ params }: EventPageParams) {

  const event = await getEventById(params.id);
  return (
    <div className="w-full p-16">
      <h1 className="text-4xl font-bold">{event?.event_description}</h1>
      <h2 className="text-2xl font-semibold">{event?.event_description}</h2>
      <Image className="py-4" src={"/sample.jpg"} width={"600"} height={"500"} alt="Image" />
      <Button>Register</Button>
    </div>
  )
}

