import { FormTextInput } from "@/components/custom/FormTextInput";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { onBoardOrg } from "@/lib/actions/org/onBoardOrg";
import { prisma } from "@/lib/prisma";
import { findOrg } from "@/lib/services/org/findOrg";
import { findUser } from "@/lib/services/user/findUser";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export default async function OnBoardOrg() {
  const { getUser } = getKindeServerSession()
  const user = await getUser();

  if (user) {
    const existingOrg = await prisma.organization.findUnique({
      where: {
        org_id: user.id
      }
    })
    if (existingOrg) {
      redirect("/dashboard")
    }
    const existingUser = await prisma.user.findUnique({
      where: {
        id: user.id
      }
    })
    if (existingUser && existingUser.role === "INDIVIDUAL") {
      redirect("/dashboard")

    }
  }


  return (
    <div className="w-full mt-24 h-[80vh] grid place-content-center">
      <Card className="w-[30rem]">
        <CardHeader>
          <CardTitle>Tell us more!</CardTitle>
          <CardDescription>We use your organization details to improve your experience in the app</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={onBoardOrg} className="flex justify-start items-start flex-col gap-4">
            <input className="hidden" name="org_id" defaultValue={user?.id} />
            <FormTextInput label="Organization Name" name="name" placeholder="Green Club" />
            <FormTextInput label="Organization Description" name="description" placeholder="We save enviornment by ..." />
            <div className="w-full flex justify-between items-center gap-4">
              <FormTextInput label="Organization Email" name="email" placeholder="org@example.com" />
              <FormTextInput label="Phone Number" name="phone" placeholder="940 XXX XXXX" />
            </div>
            <FormTextInput label="Address" name="address" placeholder="123 Baker Street" />
            <FormTextInput label="City" name="city" placeholder="Bhopal" />
            <FormTextInput label="State" name="state" placeholder="Madhya Pradesh" />
            <FormTextInput label="Country" name="country" placeholder="India" />
            <FormTextInput label="Founder" name="founder_name" placeholder="Jhon Doe" />
            <div className="w-full text-center">
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}