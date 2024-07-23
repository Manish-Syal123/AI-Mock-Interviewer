"use client";
import { db } from "@/utils/db";
import { MOCKInterview } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { desc, eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import InterviewItemCard from "./InterviewItemCard";

const InterviewList = () => {
  const [interviewList, setInterviewList] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    user && GetInterviewList();
  }, [user]);
  const GetInterviewList = async () => {
    const result = await db
      .select()
      .from(MOCKInterview)
      .where(
        eq(MOCKInterview?.createdBy, user?.primaryEmailAddress?.emailAddress)
      )
      .orderBy(desc(MOCKInterview?.id));

    console.log("MOCKInterview 🚀 ", result);
    setInterviewList(result || []);
  };
  return (
    <div>
      <h2 className="font-semibold text-lg">Previous Mock Interview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3">
        {interviewList &&
          interviewList?.map((interview, index) => (
            <InterviewItemCard
              key={index}
              interview={interview}
              refreshCallBack={() => GetInterviewList()}
            />
          ))}
      </div>
    </div>
  );
};

export default InterviewList;
