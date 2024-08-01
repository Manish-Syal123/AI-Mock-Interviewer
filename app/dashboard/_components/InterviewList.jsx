"use client";
import { db } from "@/utils/db";
import { MOCKInterview } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { desc, eq } from "drizzle-orm";
import React, { useEffect, useState, useCallback } from "react";
import InterviewItemCard from "./InterviewItemCard";
import Loading from "./Loading";

const InterviewList = () => {
  const [interviewList, setInterviewList] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();

  const GetInterviewList = useCallback(async () => {
    if (!user) return;

    try {
      setLoading(true);
      const result = await db
        .select()
        .from(MOCKInterview)
        .where(
          eq(MOCKInterview.createdBy, user.primaryEmailAddress.emailAddress)
        )
        .orderBy(desc(MOCKInterview.id));

      console.log("MOCKInterview 🚀 ", result);
      setInterviewList(result || []);
    } catch (error) {
      console.log("Error Fetching Interview List", error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    GetInterviewList();
  }, [GetInterviewList]);
  return (
    <div>
      <h2 className="font-semibold text-lg">Previous Mock Interview</h2>
      {loading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3">
          {interviewList && interviewList?.length > 0 ? (
            interviewList?.map((interview, index) => (
              <InterviewItemCard
                key={index}
                interview={interview}
                refreshCallBack={GetInterviewList}
              />
            ))
          ) : (
            <div className="col-span-3">
              <NoDataFound message="No interviews found !! Please Add new Interview" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default InterviewList;
