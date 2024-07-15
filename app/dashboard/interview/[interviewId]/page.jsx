"use client";
import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { MOCKInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { Lightbulb, Rocket, WebcamIcon } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import rocketLaunch from "@/public/rocketLaunch.json";
import Lottie from "lottie-react";

const Interview = ({ params }) => {
  const [interviewData, setInterviewData] = useState();
  const [webCamEnable, setWebCamEnable] = useState(false);
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

      // console.log(result);
      setInterviewData(result[0]);
    } catch (error) {
      console.error("Error Fetching UserInterview Details: ", error);
    }
  };

  return (
    <div className="my-10">
      <h2 className="font-bold text-2xl">Let's Get Started</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Interview Details */}
        <div className="flex flex-col my-5 gap-5">
          <div className="flex flex-col p-5 rounded-lg border gap-5 overflow-hidden">
            <h2 className="text-lg">
              <strong>Job Role/Position:</strong>
              {interviewData?.jobPosition}
            </h2>
            <h2 className="text-lg">
              <strong>Job Description/Tech Stack:</strong>
              {interviewData?.jobDescription}
            </h2>
            <h2 className="text-lg">
              <strong>Years of Experience:</strong>
              {interviewData?.jobExperience}
            </h2>
          </div>

          {/* Instruction */}
          <div className="p-5 border rounded-lg border-yellow-300 bg-yellow-100">
            <h2 className="flex gap-2 items-center text-yellow-600">
              <Lightbulb />
              <strong>Information</strong>
            </h2>
            <h2 className="mt-3 text-yellow-500">
              Enable Video Web Cam and Microphone to Start your Al Generated
              Mock Interview, It Has 5 question which you can answer and at the
              last you will get the report on the basis of your answer. NOTE: We
              never record/store your video due to users privacy. You can
              disable Web cam access at any time by clicking the icon located
              before the WebURL.
            </h2>
          </div>
        </div>

        {/* WebCam section */}
        <div>
          {webCamEnable ? (
            <Webcam
              onUserMedia={() => setWebCamEnable(true)}
              onUserMediaError={() => setWebCamEnable(false)}
              mirrored={true}
              style={{
                height: 300,
                width: 300,
              }}
            />
          ) : (
            <>
              <WebcamIcon className="h-72 w-full my-7 p-20 bg-secondary rounded-lg border" />
              <Button
                variant="ghost"
                onClick={() => setWebCamEnable(true)}
                className="w-full bg-slate-200 hover:border-2 hover:border-primary"
              >
                Enable Web Cam and Microphone
              </Button>
              {/* <Lottie
                animationData={rocketLaunch}
                loop={true}
                className="w-8/12 h-96"
              /> */}
            </>
          )}
        </div>
      </div>
      {/* Start Button */}
      <div className="flex justify-end items-end">
        <Link href={"/dashboard/interview/" + params.interviewId + "/start"}>
          <Button className="flex gap-1">
            {/* <Rocket /> */}
            <Lottie
              animationData={rocketLaunch}
              loop={true}
              className="h-32 z-10 absolute"
            />
            Start Interview
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Interview;
