import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { signupuser } from "@/lib/actions/user/signupUser"

export default async function OnboardPage() {

  return (
    <div className="w-full h-[80vh] flex justify-center items-center">
      <Card className="w-[20rem]">
        <CardHeader>
          <CardTitle>What is your role?</CardTitle>
          <CardDescription>You can set your role as individual user or organization in our application</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={signupuser} className="flex justify-start items-start flex-col gap-4">
            <div className="w-full">
              <Label htmlFor="role">Your role</Label>
              <Select name="role">
                <SelectTrigger id="role" >
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="INDIVIDUAL">Individual</SelectItem>
                  <SelectItem value="ORGANIZATION">Organization</SelectItem>
                </SelectContent>
              </Select>
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