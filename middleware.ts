import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 *
 * TODO
 * Use this middleware to check the auth status of a user who lands on any protected route add them to database
 */
export function middleware(request: NextRequest) {
  console.log("MIDDLEWARE working");
  const pathname = request.url.split(":3000")[1];
  console.log(pathname);
  // return NextResponse.redirect(new URL("/home", request.url));
}
export const config = {
  matcher: ["/dashboard"],
};
