"use client";
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
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs"
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
// import { signupUser } from "@/lib/actions/user/signupUser"
// import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"

export default function OnboardPage() {
  // const { getUser } = getKindeServerSession()
  // const user = await getUser();
  const [role, setRole] = useState<string>("");
  const { user } = useKindeBrowserClient();
  const router = useRouter();

  const handleCreateUser = async (e: FormEvent) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/api/user", {
      method: "POST",
      body: JSON.stringify({
        id: user?.id,
        first_name: user?.given_name,
        last_name: user?.family_name,
        email: user?.email,
        profile_image: user?.picture ? user.picture : "",
        role: role,
      })
    })
    response.status === 201 ? router.push("/dashboard") : alert("You were not supposed to send this request again man!")

  }
  return (
    <div className="w-full h-[80vh] flex justify-center items-center">
      <Card className="w-[20rem]">
        <CardHeader>
          <CardTitle>What is your role?</CardTitle>
          <CardDescription>You can set your role as individual user or organization in our application</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreateUser} className="flex justify-start items-start flex-col gap-4">
            <div className="w-full">
              <Label htmlFor="role">Your role</Label>
              <Select name="role" required defaultValue="INDIVIDUAL" onValueChange={(value: string) => { setRole(value) }}>
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