import { createUser } from "@/lib/services/user/createUser";
import { findUser } from "@/lib/services/user/findUser";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { id, first_name, last_name, email, role } = await req.json();

  const existingUser = await findUser(id);
  if (existingUser) {
    return NextResponse.json(
      { message: "User already exists in database" },
      { status: 400 }
    );
  }
  const user = await createUser({
    id,
    first_name,
    last_name,
    email,
    role,
  });

  return NextResponse.json(
    { user, message: "User created successfully" },
    { status: 201 }
  );
};
