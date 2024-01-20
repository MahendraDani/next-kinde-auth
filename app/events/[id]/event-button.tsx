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

export const EventButton = async ({ event_id }: { event_id: string }) => {
  const { getUser } = getKindeServerSession()
  const user = await getUser();

  let isOrganizingOrg = false;
  let data;

  // Prisma query to join events and organiztion table to check whether the current user is the person who created the event
  if (user) {
    const response = await getEventOrganizer({ org_id: user.id, event_id })
    if (response) {
      data = response;
      isOrganizingOrg = true;
    }
  }
  return (
    <div>
      {isOrganizingOrg ? <div className="py-2 flex flex-col justify-start items-start gap-2">
        <Button className="w-24 text-center">Edit</Button>
        <DeleteButton event_id={event_id} />
      </div> : <Button>Register</Button>}
    </div>
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