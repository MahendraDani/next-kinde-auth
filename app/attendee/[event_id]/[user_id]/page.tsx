import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getEventAttendee } from "@/lib/services/events/getEventAttendee";
import { getEventById } from "@/lib/services/events/getEventById";
import { getRegistrant } from "@/lib/services/events/getRegistrant";
import { markAttendence } from "@/lib/services/events/markAttendance";
import { findOrg } from "@/lib/services/org/findOrg";
import { findUser } from "@/lib/services/user/findUser";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

interface AttendeePageParams {
  params: {
    event_id: string;
    user_id: string;
  }
}

// user_id : Is the user_id of the person who has registered the event but we will have to check who is seeing this page also?
export default async function AttendeePage({ params }: AttendeePageParams) {
  const { getUser } = await getKindeServerSession()
  const visitingUser = await getUser();
  // IF the organizer opens this page marks the user with user_id as present for that event (DATE constraints will be considered later)
  let registrant = await findUser(params.user_id);
  let event = await getEventById(params.event_id);

  if (!registrant || !event) {
    return (
      <div className="w-full h-[92vh] grid place-content-center">
        <h1 className="text-7xl font-bold">OOps, You are not at the correct event ID and User ID URL</h1>
      </div>
    )
  }

  const isOrganizingOrg = event?.organizer_id === visitingUser?.id;
  if (isOrganizingOrg) {
    await markAttendence({ event_id: params.event_id, user_id: params.user_id })
  }
  return (
    <div className="w-full h-[92vh] grid place-content-center bg-gradient-to-br from-teal-200 via-yellow-100 to-purple-200">
      <Card className="w-[35rem]">
        <CardHeader>
          <CardTitle>{event?.event_name}</CardTitle>
          <CardDescription>{event?.event_description}</CardDescription>
        </CardHeader>
        <CardContent>
          <p ><span className="text-green-500 font-bold">{registrant?.first_name} {registrant?.last_name} </span>is attending this event</p>
          <p>{isOrganizingOrg && "If you are seeing this means that you created this event and now this attendee should be marked as present"}</p>
          <p>Total Attendees : {event?.attendees_count}</p>
          <AttendanceStatusComponent user_id={params.user_id} event_id={params.event_id} />
        </CardContent>
      </Card>

    </div>
  )
}


export const AttendanceStatusComponent = async ({ user_id, event_id }: { user_id: string, event_id: string }) => {
  const { data, success } = await getEventAttendee({ user_id, event_id });
  return (
    <div>
      {
        success ? <p className="bg-green-400 rounded-sm p-1">Marked as present</p> : <p className="bg-sky-400 rounded-sm p-1">Registered</p>
      }
    </div>
  )
}