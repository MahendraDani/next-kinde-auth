import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FormTextInput } from "./FormTextInput"
import { createEventAction } from "@/lib/actions/events/createEventAction"
export const CreateEventForm = async ({ org_id }: { org_id: string }) => {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">New Event</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[35rem]">
          <DialogHeader>
            <DialogTitle>Create a new Event</DialogTitle>
            <DialogDescription>
              Spread awareness about our environments by events
            </DialogDescription>
          </DialogHeader>
          <div>
            <form action={createEventAction} className="flex justify-start items-start flex-col gap-4">
              {/* <input className="hidden" name="org_id" defaultValue={user?.id} /> */}
              <FormTextInput label="Event Name" name="event_name" placeholder="Go Green" />
              <FormTextInput label="Event Description" name="event_description" placeholder="We save enviornment by ..." />
              <FormTextInput label="Address" name="address" placeholder="123 Baker Street" />
              <div className="w-full flex justify-between items-center gap-4">
                <FormTextInput label="City" name="city" placeholder="Bhopal" />
                <FormTextInput label="Pincode" name="pincode" placeholder="445202" />
              </div>
              <div className="w-full flex justify-between items-center gap-4">
                <FormTextInput label="State" name="state" placeholder="Madhya Pradesh" />
                <FormTextInput label="Country" name="country" placeholder="India" />
              </div>
              <div className="w-full flex justify-between items-center gap-4">
                <Input type="datetime-local" name="start_date" />
                <Input type="datetime-local" name="end_date" />
              </div>
              <Input name="org_id" className="hidden" defaultValue={org_id} />
              <Button type="submit" className="w-full">Create Event</Button>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}