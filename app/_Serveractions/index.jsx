"use server";
import { db } from "@/utils/db";
import { MOCKInterview, UserDetails } from "@/utils/schema";
import { and, desc, eq } from "drizzle-orm";

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
    console.error("Error Fetching Interview List", error);
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
    console.error("Error updating user credits", error);
    throw error;
  }
};

export const UpdateUserPaymentSecretKey = async (
  email,
  newPaymentSecretKey
) => {
  try {
    const result = await db
      .update(UserDetails)
      .set({ paymentSecretKey: newPaymentSecretKey })
      .where(eq(UserDetails?.userEmail, email));
    console.log("User payment secret key updated 🚀", result);
    return result;
  } catch (error) {
    console.error("Error updating user payment secret key", error);
    throw error;
  }
};

export const MatchUserPaymentSecretKey = async (email, paymentSecretKey) => {
  try {
    const result = await db
      .select()
      .from(UserDetails)
      .where(
        and(
          eq(UserDetails?.userEmail, email),
          eq(UserDetails?.paymentSecretKey, paymentSecretKey)
        )
      );
    console.log("User payment secret key matched 🚀", result);
    return result.length > 0;
  } catch (error) {
    console.error("Error matching user payment secret key", error);
    throw error;
  }
};

export const RemoveUserPaymentSecretKey = async (email) => {
  try {
    const result = await db
      .update(UserDetails)
      .set({ paymentSecretKey: "" })
      .where(eq(UserDetails?.userEmail, email));

    // console.log("User payment secret key removed 🚀", result);
    return result;
  } catch (error) {
    console.error("Error removing user payment secret key", error);
    throw error;
  }
};

export const updateCreditsAndTotalSpent = async (
  email,
  newCredits,
  newTotalSpent
) => {
  try {
    const result = await db
      .update(UserDetails)
      .set({ credits: newCredits, totalAmountSpent: newTotalSpent })
      .where(eq(UserDetails?.userEmail, email));

    console.log("User credits and total spent updated 🚀", result);
    return result;
  } catch (error) {
    console.error("Error updating user credits and total spent", error);
    throw error;
  }
};
