"use server";

import { createUser } from "@/lib/services/user/createUser";
import { UserType } from "@/lib/types";
import { redirect } from "next/navigation";

export const onBoardOrg = async (formData: FormData) => {
  const name = formData.get("name");
  const description = formData.get("description");
  const org_id = formData.get("org_id");
  const address = formData.get("address");
  const city = formData.get("city");
  const state = formData.get("state");
  const country = formData.get("country");
  const founder_name = formData.get("founder_name");
  const email = formData.get("email");
  const phone = formData.get("phone");
  const response = await fetch("http://localhost:3000/api/org", {
    method: "POST",
    body: JSON.stringify({
      name,
      description,
      org_id,
      address,
      city,
      state,
      country,
      founder_name,
      email,
      phone,
    }),
  });
  redirect("/dashboard");
};
