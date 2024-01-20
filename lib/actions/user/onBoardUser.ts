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
  if (role === "INDIVIDUAL") {
    redirect("/dashboard");
  } else {
    redirect("/onboard/org");
  }
};
