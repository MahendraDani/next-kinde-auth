"use server";

import { redirect } from "next/navigation";

export const signupuser = (formData: FormData) => {
  console.log(formData.get("role"));
  redirect("/dashboard");
};
