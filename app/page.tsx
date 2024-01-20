import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { redirect } from "next/navigation";

export default async function Home() {
  const { isAuthenticated } = getKindeServerSession();
  const isAuthed = await isAuthenticated();
  if (isAuthed) {
    redirect("/dashboard")
  }
  return (
    <main className=''>
      <div className='flex flex-col gap-4 justify-between'>
        <p>Landing page of the website</p>
      </div>
    </main>
  )
}
