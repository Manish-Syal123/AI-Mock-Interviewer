"use client";
import React, { useEffect, useState } from "react";
import AddNewInterview from "./_components/AddNewInterview";
import InterviewList from "./_components/InterviewList";
import YourCredits from "./_components/YourCredits";
import { useUser } from "@clerk/nextjs";
import { db } from "@/utils/db";
import { UserDetails } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { UserInfoContext } from "@/context/UserInfoContext";

const Dashboard = () => {
  const [userInfo, setUserInfo] = useState();
  const { user } = useUser();

  useEffect(() => {
    user && GetUserInfo();
  }, [user]);
  const GetUserInfo = async () => {
    try {
      const result = await db
        .select()
        .from(UserDetails)
        .where(
          eq(UserDetails?.userEmail, user?.primaryEmailAddress?.emailAddress)
        );

      // console.log("User Details/Info : ", result[0]);
      if (result) {
        setUserInfo(result[0]);
        console.log(userInfo);
      }
    } catch (error) {
      console.error("Error Fetching UserInfo : ", error);
    }
  };

  return (
    <UserInfoContext.Provider value={{ userInfo, setUserInfo }}>
      <div className="p-10">
        <h2 className="font-bold text-2xl">Dashboard</h2>
        <h2 className="text-gray-500">
          Create and Start your AI Mockup Interview
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-5">
          <AddNewInterview />
          <div></div>
          <YourCredits />
        </div>

        {/* List of Interviews */}
        <InterviewList />
      </div>
    </UserInfoContext.Provider>
  );
};

export default Dashboard;
