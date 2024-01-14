import { LoginLink, LogoutLink, RegisterLink, getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Button } from "../ui/button"

export const Navbar = async () => {
  const { isAuthenticated } = getKindeServerSession()
  const isAuthed = await isAuthenticated();
  return (
    <header className="sticky top-0 left-0 right-0 flex justify-between items-center px-16 py-4 bg-teal-50">
      <div>
        Logo
      </div>
      <div>{
        isAuthed ? <div>
          <Button><LogoutLink>Logout</LogoutLink></Button>
        </div> : <div className="flex justify-between gap-4 items-center">
          <Button variant={"outline"}>
            <LoginLink>Login</LoginLink>
          </Button>
          <Button variant={"outline"}>
            <RegisterLink>Signup</RegisterLink>
          </Button>
        </div>
      }
      </div>
    </header>
  )
}