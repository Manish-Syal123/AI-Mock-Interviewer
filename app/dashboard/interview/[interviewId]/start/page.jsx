"use client";
import { db } from "@/utils/db";
import { MOCKInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import QuestionsSection from "./_components/QuestionsSection";
import RecordAnswerSection from "./_components/RecordAnswerSection";

const StartInterview = ({ params }) => {
  const [interviewData, setInterviewData] = useState();
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState();
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  useEffect(() => {
    GetInterviewDetails();
  }, []);
  // Get Interview Details by mockId/Interview ID
  const GetInterviewDetails = async () => {
    try {
      const result = await db
        .select()
        .from(MOCKInterview)
        .where(eq(MOCKInterview.mockId, params.interviewId));

      const jsonMockResp = JSON.parse(result[0].jsonMockResp);

      console.log(jsonMockResp);
      setMockInterviewQuestion(jsonMockResp);
      setInterviewData(result[0]);
    } catch (error) {
      console.error("Error Fetching UserInterview Details: ", error);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Questions */}
        <QuestionsSection
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
        />
        {/* Video/Audio Recording */}
        <RecordAnswerSection />
      </div>
    </div>
  );
};

export default StartInterview;
