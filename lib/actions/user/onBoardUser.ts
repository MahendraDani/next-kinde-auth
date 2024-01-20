"use server";

import { createUser } from "@/lib/services/user/createUser";
import { UserType } from "@/lib/types";
import { redirect } from "next/navigation";

export const onBoardUser = async (formData: FormData) => {
  const first_name = formData.get("first_name");
  const last_name = formData.get("last_name");
  const id = formData.get("id");
  const role = formData.get("role");
  const email = formData.get("email");
  console.log(first_name);
  console.log(last_name);
  console.log(id);
  console.log(role);
  console.log(email);
  const profile_image = formData.get("profile_image");
  const response = await fetch("http://localhost:3000/api/user", {
    method: "POST",
    body: JSON.stringify({
      id,
      first_name,
      last_name,
      role,
      email,
      profile_image,
    }),
  });
  redirect("/dashboard");
};
