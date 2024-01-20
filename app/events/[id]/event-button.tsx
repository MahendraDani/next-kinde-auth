import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"

export const EventButton = async ({ event_id }: { event_id: string }) => {
  const { getUser } = getKindeServerSession()
  const user = await getUser();

  let isOrganizingOrg = false;
  let data;

  // Prisma query to join events and organiztion table to check whether the current user is the person who created the event
  if (user) {
    const response = await prisma.organization.findUnique({
      where: {
        org_id: user.id,
        events: {
          some: {
            event_id
          }
        }
      }
    })
    if (response) {
      data = response;
      isOrganizingOrg = true;
    }
  }
  return (
    <div>
      {isOrganizingOrg ? <div className="flex justify-start items-center gap-3">
        <Button>Edit</Button>
        <Button variant={"destructive"}>Delete</Button>
      </div> : <Button>Register</Button>}
    </div>
  )
}