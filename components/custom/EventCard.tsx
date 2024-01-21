import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "../ui/button"
import { Event } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { getRegistrant } from "@/lib/services/events/getRegistrant"
import { getEventOrganizerId } from "@/lib/services/events/getEventOrganizerId"

export const EventCard = async (props: Event) => {

  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const isRegisteredAlready = await getRegistrant({
    event_id: props.event_id,
    user_id: user?.id as string,
  })
  const eventOrganizerId = await getEventOrganizerId({ event_id: props.event_id })
  const isEventOrganizer = eventOrganizerId === user?.id;
  return (
    <Card className="w-[25rem]">
      <CardHeader>
        <CardTitle>{props.event_name}</CardTitle>
        <Image className="w-full text-center rounded-md" src={"/sample.jpg"} width={"300"} height={"400"} alt="Event Image" />
        <CardDescription className="max-h-[10rem] truncate">{props.event_description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-full flex justify-start items-center gap-2">
          <p>From</p>
          <p>{props.start_date?.toLocaleString()}</p>
        </div>
        <div className="w-full flex justify-start items-center gap-2">
          <p>To</p>
          <p>{props.end_date?.toLocaleString()}</p>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col justify-start items-start gap-1">
        {isRegisteredAlready && (
          <div>
            <p className="text-green-400 w-full text-center font-mono">Registered </p>
          </div>
        )}
        <Link href={`/events/${props.event_id}`} className="w-full">
          {
            !isRegisteredAlready && !isEventOrganizer ? <Button className="w-full">Join</Button> : <Button className="w-full">View Details</Button>
          }
        </Link>
      </CardFooter>
    </Card>
  )
}
