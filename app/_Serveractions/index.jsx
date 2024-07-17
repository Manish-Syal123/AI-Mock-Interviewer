"use server";
import { db } from "@/utils/db";
import { MOCKInterview, UserDetails } from "@/utils/schema";
import { desc, eq } from "drizzle-orm";

export const GetInterviewList = async (email) => {
  try {
    const result = await db
      .select()
      .from(MOCKInterview)
      .where(eq(MOCKInterview?.createdBy, email))
      .orderBy(desc(MOCKInterview?.id));

    console.log("MOCKInterview 🚀 ", result);
    return result || [];
  } catch (error) {
    console.log("Error Fetching Interview List", error);
    return [];
  }
};

export const UpdateUserCredits = async (email, newCredits) => {
  try {
    const result = await db
      .update(UserDetails)
      .set({ credits: newCredits })
      .where(eq(UserDetails.userEmail, email));
    console.log("User credits updated 🚀", result);
    return result;
  } catch (error) {
    console.log("Error updating user credits", error);
    throw error;
  }
};
