import { Button } from "@/components/ui/button";
import { getEventOrganizer } from "@/lib/services/events/getEventOrganizer";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input";
import { deleteEventAction } from "@/lib/actions/events/deleteEventAction";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { FormTextInput } from "@/components/custom/FormTextInput";
import { Event } from "@prisma/client";
import { updateEventAction } from "@/lib/actions/events/updateEventAction";
import { getRegistrant } from "@/lib/services/events/getRegistrant";
import { registerToEventAction } from "@/lib/actions/events/registerToEventAction";
import { unregisterFromEventAction } from "@/lib/actions/events/unregisterFromEventAction";
import Link from "next/link";
import dayjs from "dayjs";

export const EventButton = async ({ event }: { event: Event }) => {
  const { getUser } = getKindeServerSession()
  const user = await getUser();

  let isOrganizingOrg = false;
  let data;

  // Prisma query to join events and organiztion table to check whether the current user is the person who created the event
  if (user) {
    const response = await getEventOrganizer({ org_id: user.id, event_id: event.event_id })
    if (response) {
      data = response;
      isOrganizingOrg = true;
    }
  }

  const isPresentDateAfterEndDate = dayjs().isAfter(event.end_date);
  return (
    <div>
      {isOrganizingOrg ? <div className="py-2 flex flex-col justify-start items-start gap-2">
        {isPresentDateAfterEndDate && <p className="bg-green-400 p-1 rounded-sm">The event is already completed</p>}
        <EditButton event={event} />
        <DeleteButton event_id={event.event_id} />
      </div> : (
        !isPresentDateAfterEndDate ? <RegisterButton event_id={event.event_id} user_id={user?.id as string} /> : <div className="bg-green-400 p-1 rounded-sm">The event is already completed</div>
      )}
    </div>
  )
}



const RegisterButton = async ({ event_id, user_id }: { event_id: string; user_id: string; }) => {
  const isRegisteredAlready = await getRegistrant({ event_id, user_id });
  return (
    <div>
      {isRegisteredAlready ? (
        <div className="flex flex-col justify-start items-start gap-1">
          <p className="text-green-400">You are already registered for the Event</p>
          <Link href={`/attendee/${event_id}/${user_id}`}>
            <Button variant={"outline"}>Show QR</Button>
          </Link>
          <UnregisterButton event_id={event_id} user_id={user_id} />
        </div>
      ) : (
        <form action={registerToEventAction}>
          <Input name="event_id" className="hidden" value={event_id} />
          <Input name="user_id" className="hidden" value={user_id} />
          <Button type="submit">Register</Button>
        </form>
      )}
    </div>
  )
}

const UnregisterButton = async ({ event_id, user_id }: { event_id: string, user_id: string }) => {
  return (
    <form action={unregisterFromEventAction}>
      <Input className="hidden" name="event_id" value={event_id} />
      <Input className="hidden" name="user_id" value={user_id} />
      <Button type="submit" variant={"destructive"}>Un register</Button>
    </form>
  )
}
const DeleteButton = async ({ event_id }: { event_id: string }) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Delete Event</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            event and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <form action={deleteEventAction}>
            <Input className="hidden" name="event_id" defaultValue={event_id} />
            <Button type="submit" className="w-full">Delete</Button>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}


const EditButton = async ({ event }: { event: Event; }) => {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Edit</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[35rem]">
          <DialogHeader>
            <DialogTitle>Edit event</DialogTitle>
          </DialogHeader>
          <div>
            <form action={updateEventAction} className="flex justify-start items-start flex-col gap-4">
              {/* <input className="hidden" name="org_id" defaultValue={user?.id} /> */}
              <FormTextInput label="Event Name" name="event_name" placeholder="Go Green" defaultValue={event.event_name} />
              <FormTextInput label="Event Description" name="event_description" placeholder="We save enviornment by ..." defaultValue={event.event_description} />
              <FormTextInput label="Address" name="address" placeholder="123 Baker Street" defaultValue={event.address} />
              <div className="w-full flex justify-between items-center gap-4">
                <FormTextInput label="City" name="city" placeholder="Bhopal" defaultValue={event.city} />
                <FormTextInput label="Pincode" name="pincode" placeholder="445202" defaultValue={event.pincode} />
              </div>
              <div className="w-full flex justify-between items-center gap-4">
                <FormTextInput label="State" name="state" placeholder="Madhya Pradesh" defaultValue={event.state} />
                <FormTextInput label="Country" name="country" placeholder="India" defaultValue={event.country} />
              </div>
              <div className="w-full flex justify-between items-center gap-4">
                <Input required type="datetime-local" name="start_date" defaultValue={event.start_date?.toLocaleString()} />
                <Input required type="datetime-local" name="end_date" defaultValue={event.end_date?.toLocaleString()} />
              </div>
              <Input name="event_id" className="hidden" defaultValue={event.event_id} />
              <Button type="submit" className="w-full">Edit Event</Button>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}