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

export const EventCard = (props: Event) => {
  return (
    <Card className="min-w-[25rem]">
      <CardHeader>
        <CardTitle>{props.event_name}</CardTitle>
        <Image className="w-full text-center rounded-md" src={"/sample.jpg"} width={"300"} height={"400"} alt="Event Image" />
        <CardDescription>{props.event_description}</CardDescription>
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
      <CardFooter>
        <Button className="w-full">Join</Button>
      </CardFooter>
    </Card>
  )
}