import { Input } from "../ui/input"
import { Label } from "../ui/label"

interface FormTextInputProps {
  label: string
  name: string
  placeholder?: string
}
export const FormTextInput = ({ label, name, placeholder }: FormTextInputProps) => {
  return (
    <div className="w-full flex flex-col justify-start items-start gap-2">
      <Label>{label}</Label>
      <Input name={name} placeholder={placeholder} />
    </div>
  )
}