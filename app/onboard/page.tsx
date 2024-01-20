import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { onBoardUser } from "@/lib/actions/user/onBoardUser"
import { prisma } from "@/lib/prisma"
import { findUser } from "@/lib/services/user/findUser"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { redirect } from "next/navigation"

export default async function OnboardPage() {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  if (user) {
    const existingUser = await prisma.user.findUnique({
      where: {
        id: user.id
      }
    })
    if (existingUser) {
      redirect("/dashboard");
    }
  }
  return (
    <div className="w-full h-[80vh] flex justify-center items-center">
      <Card className="w-[20rem]">
        <CardHeader>
          <CardTitle>What is your role?</CardTitle>
          <CardDescription>You can set your role as individual user or organization in our application</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={onBoardUser} className="flex justify-start items-start flex-col gap-4">
            <div className="w-full">
              <Label htmlFor="role">Your role</Label>
              <Select name="role" required defaultValue="INDIVIDUAL">
                <SelectTrigger id="role" >
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="INDIVIDUAL">Individual</SelectItem>
                  <SelectItem value="ORGANIZATION">Organization</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Input value={user?.given_name!} name="first_name" className="hidden" readOnly />
              <Input value={user?.family_name!} name="last_name" className="hidden" readOnly />
              <Input value={user?.email!} name="email" className="hidden" readOnly />
              <Input value={user?.id!} name="id" className="hidden" readOnly />
              <Input value={user?.picture ? user.picture : ''} name="profile_image" className="hidden" readOnly />
            </div>
            <div className="w-full text-center">
              <Button variant={"outline"} type="submit">Submit</Button>
            </div>
          </form>
        </CardContent>
      </Card>

    </div>
  )
}