"use client";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUpDown, House } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import NoResultFound from "@/public/NoResultFound.json";
import Lottie from "lottie-react";

const Feedback = ({ params }) => {
  const [feedbackList, setFeedbackList] = useState([]);
  const router = useRouter();

  useEffect(() => {
    GetFeedback();
  }, []);

  const GetFeedback = async () => {
    try {
      const result = await db
        .select()
        .from(UserAnswer)
        .where(eq(UserAnswer?.mockIdRef, params.interviewId))
        .orderBy(UserAnswer.id);

      console.log(result);
      setFeedbackList(result || []);
    } catch (error) {
      console.error("Error while fetching Feedback data :", error);
    }
  };
  return (
    <div className="p-10">
      {feedbackList?.length == 0 ? (
        <div className="flex flex-col justify-center items-center">
          <Lottie
            animationData={NoResultFound}
            loop={true}
            className="w-8/12 h-96"
          />

          <p className="font-bold">No Interview Feedback result found! </p>
        </div>
      ) : (
        <>
          <h2 className="text-3xl font-bold text-green-500">
            Congratulation!!
          </h2>
          <h2 className="font-bold text-2xl">
            Here is your interview feedback
          </h2>
          {/* <h2>
        Your overall interview rating: <strong>7/10</strong>{" "}
      </h2> */}

          <h2 className="text-sm text-gray-500">
            Find below interview Question with correct answer, your answer and
            feedback for improvement.
          </h2>

          {feedbackList &&
            feedbackList?.map((item, index) => (
              <Collapsible key={index} className="mt-7">
                <CollapsibleTrigger className=" flex justify-between gap-7 items-center p-2 bg-secondary border border-black rounded-lg my-2 text-left w-full">
                  {item?.question} <ChevronsUpDown className="h-5 w-5" />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="flex flex-col gap-2">
                    <h2 className="text-red-500 p-2 border rounded-lg">
                      <strong>Rating: </strong>
                      {item?.rating}/10
                    </h2>
                    <h2 className="p-2 border rounded-lg bg-red-50 text-sm text-red-900">
                      <strong>Your Answer: </strong>
                      {item?.userAns}
                    </h2>
                    <h2 className="p-2 border rounded-lg bg-green-50 text-sm text-green-900">
                      <strong>Correct Answer: </strong>
                      {item?.correctAns}
                    </h2>
                    <h2 className="p-2 border rounded-lg bg-yellow-50 text-sm text-yellow-600">
                      <strong>Feedback: </strong>
                      {item?.feedback}
                    </h2>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
        </>
      )}
      <div className="flex justify-center items-center">
        <Button
          onClick={() => router.replace("/dashboard")}
          className="flex justify-center items-center gap-2 mt-6"
        >
          <House /> Go Home
        </Button>
      </div>
    </div>
  );
};

export default Feedback;
