"use client";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { db } from "@/utils/db";
import { UserDetails } from "@/utils/schema";
import moment from "moment";
import { useEffect } from "react";
import { toast } from "sonner";
import { eq } from "drizzle-orm";
import LandingPage from "./_Serveractions/LandingPage";

export default function Home() {
  const { user, isSignedIn } = useUser();

  useEffect(() => {
    if (user && isSignedIn) {
      addUserDetailsToDB();
    }
  }, [user, isSignedIn]);

  const addUserDetailsToDB = async () => {
    try {
      // Check if the user email already exists
      const existingUser = await db
        .select()
        .from(UserDetails)
        .where(
          eq(UserDetails?.userEmail, user?.primaryEmailAddress?.emailAddress)
        );

      // console.log(existingUser);

      if (existingUser.length === 0) {
        // If user email does not exist, insert new user details
        const resp = await db.insert(UserDetails).values({
          userEmail: user?.primaryEmailAddress?.emailAddress,
          createdAt: moment().format("YYYY-MM-DD"), // Use a standard format for dates
        });

        if (resp) {
          toast.success("User Details added successfully");
        }
      } else {
        // toast.info("User email already exists");
        // console.log("User email already exists");
      }
    } catch (error) {
      console.error("Error adding user details:", error);
      // toast.error("Error adding user details");
    }
  };
  return (
    <div>
      <LandingPage />
    </div>
  );
}
