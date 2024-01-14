import { findUser } from "@/lib/services/user/findUser";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  const id = req.url.split("user/")[1];
  const user = await findUser(id);
  if (!user) {
    return NextResponse.json(
      { mesage: "User does not exists in db" },
      { status: 404 }
    );
  }
  return NextResponse.json({ data: user }, { status: 200 });
};
