"use client";
import React, { useEffect } from "react";
import AddNewInterview from "./_components/AddNewInterview";
import InterviewList from "./_components/InterviewList";
import YourCredits from "./_components/YourCredits";
import { useUser } from "@clerk/nextjs";
import { RemoveUserPaymentSecretKey } from "../_Serveractions";

const Dashboard = () => {
  const { user } = useUser();

  // useEffect(() => {

  //   removePaymentKey();
  // }, []);

  const removePaymentKey = async () => {
    try {
      const result = await RemoveUserPaymentSecretKey(
        user?.primaryEmailAddress?.emailAddress
      );
      if (result) {
        console.log("User payment secret key deleted 🚀", result);
      } else {
        console.log("User payment secret key not deleted 🚀", result);
      }
    } catch (error) {
      console.error("Error deleting user payment secret key", error);
    }
  };
  return (
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
  );
};

export default Dashboard;
