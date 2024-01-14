"use server";

import { createUser } from "@/lib/services/user/createUser";
import { UserType } from "@/lib/types";
import { redirect } from "next/navigation";

export const signupUser = async (formData: FormData) => {
  const first_name = formData.get("first_name");
  const last_name = formData.get("last_name");
  const id = formData.get("id");
  const role = formData.get("role");
  const email = formData.get("email");
  const profile_image = formData.get("profile_image");
  const response = await createUser({
    id,
    first_name,
    last_name,
    role,
    email,
    profile_image,
  });
  // redirect("/dashboard");
};
