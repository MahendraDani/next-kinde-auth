import { CreateEventForm } from "@/components/custom/CreateEventForm";
import { prisma } from "@/lib/prisma";
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
  return (
    <div className="w-full h-[80vh] grid place-content-center">
      {isAuthUserOrg && <CreateEventForm org_id={org?.org_id as string} />}

    </div>
  )
}