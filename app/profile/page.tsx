import { prisma } from "@/lib/prisma";
import { findUser } from "@/lib/services/user/findUser";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"

export default async function ProfilePage() {
  const { getUser } = getKindeServerSession()
  const currrentUser = await getUser();
  const user = await prisma.user.findMany({
    where: {
      id: currrentUser?.id
    }
  })
  const output = await prisma.attendees.findMany({
    include: {
      event: true,
    }
  })

  let registeredEvents = output.filter((e) => {
    if (e.user_id === currrentUser?.id && e.is_present === false) {
      return e;
    }
  })

  let attendedEvents = output.filter((e) => {
    if (e.user_id === currrentUser?.id && e.is_present === true) {
      return e;
    }
  })
  return (
    <div>
      <div className="bg-sky-100">
        <div className="font-mono font-bold">My Details </div>
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </div>
      <div className="bg-green-100">
        <div className="font-mono font-bold">My registered Events </div>
        <pre>{JSON.stringify(registeredEvents, null, 2)}</pre>
      </div>

      <div className="bg-purple-100">
        <div className="font-mono font-bold">My Attended Events </div>
        <pre>{JSON.stringify(attendedEvents, null, 2)}</pre>
      </div>
    </div>
  )
}