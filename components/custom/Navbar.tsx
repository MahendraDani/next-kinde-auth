import { LoginLink, LogoutLink, RegisterLink, getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Button } from "../ui/button"
import Link from "next/link";

export const Navbar = async () => {
  const { isAuthenticated } = getKindeServerSession()
  const isAuthed = await isAuthenticated();
  return (
    <header className="sticky top-0 left-0 right-0 flex justify-between items-center px-16 py-4 bg-teal-50">
      <div>
        Logo
      </div>
      <div>{
        isAuthed ? <div className="flex justify-between items-center gap-2">
          <Link href={"/events"}><Button variant={"ghost"}>Events</Button></Link>
          <Link href={"/shop"}><Button variant={"ghost"}>Shop</Button></Link>
          <Link href={"/profile"}><Button variant={"ghost"}>Profile</Button></Link>
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