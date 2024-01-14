import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function middleware(request: NextRequest) {
  const pathname = request.url.split(":3000")[1];
  const { isAuthenticated, getUser } = getKindeServerSession();
  const isAuthed = await isAuthenticated();
  if (!isAuthed) {
    return NextResponse.redirect("http://localhost:3000");
  }

  if (pathname === "/onboard") {
    const user = await getUser();
    const response = await fetch(`http://localhost:3000/api/user/${user?.id}`, {
      method: "GET",
    });
    if (response.status === 200) {
      return NextResponse.redirect("http://localhost:3000/dashboard");
    }
  }
}
export const config = {
  matcher: ["/dashboard", "/onboard"],
};
