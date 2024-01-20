import { Button } from "@/components/ui/button";
import { getEventOrganizer } from "@/lib/services/events/getEventOrganizer";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"

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
        <Button variant={"destructive"} className="w-24 text-center">Delete</Button>
      </div> : <Button>Register</Button>}
    </div>
  )
}