import { CreateEventForm } from "@/components/custom/CreateEventForm";
import { EventCard } from "@/components/custom/EventCard";
import { prisma } from "@/lib/prisma";
import { getAllEvents } from "@/lib/services/events/getAllEvents";
import { findOrg } from "@/lib/services/org/findOrg";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function EventsPage() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  let isAuthUserOrg = false;
  let org;
  if (user) {
    org = await prisma.organization.findUnique({
      where: {
        org_id: user.id
      }
    })
    if (org) {
      isAuthUserOrg = true
    } else {
      isAuthUserOrg = false;
    }
  }

  const events = await getAllEvents();
  return (
    <div className="w-full p-16">
      <div className="py-4">
        {isAuthUserOrg && <CreateEventForm org_id={org?.org_id as string} />}
      </div>
      <div className="w-full flex flex-rol flex-wrap justify-evenly items-center gap-4">
        {
          events.map((event, index) => {
            return (
              <EventCard {...event} key={index} />
            )
          })
        }
      </div>
    </div>
  )
}