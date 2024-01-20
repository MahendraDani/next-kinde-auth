"use server";

import { createOrg } from "@/lib/services/org/createOrg";
import { createUser } from "@/lib/services/user/createUser";
import { UserType } from "@/lib/types";
import { redirect } from "next/navigation";

export const onBoardOrg = async (formData: FormData) => {
  try {
    const response = await createOrg({
      address: formData.get("address") as string,
      city: formData.get("city") as string,
      state: formData.get("state") as string,
      country: formData.get("country") as string,
      name: formData.get("name") as string,
      founder_name: formData.get("founder_name") as string,
      description: formData.get("description") as string,
      org_id: formData.get("org_id") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
    });
    redirect("/dashboard");
  } catch (error) {
    console.log("Error in creating org", error);
  }
};
