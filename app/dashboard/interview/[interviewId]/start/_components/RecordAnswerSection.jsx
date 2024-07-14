"use client";
import { Button } from "@/components/ui/button";
import { AudioLines } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import useSpeechToText from "react-hook-speech-to-text";
import Webcam from "react-webcam";
import voiceline from "./../../../../../../public/voicelines.json";
import webcamlottie from "./../../../../../../public/webcamlottie.json";
import Lottie from "lottie-react";
import { toast } from "sonner";
import { chatSession } from "@/utils/GeminiAIModal";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment";

const RecordAnswerSection = ({
  mockInterviewQuestion,
  activeQuestionIndex,
  interviewData,
}) => {
  const [userAnswer, setUserAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const {
    error,
    interimResult,
    isRecording,
    results,
    setResults,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  useEffect(() => {
    results.map((result) =>
      setUserAnswer((prevAns) => prevAns + result.transcript)
    );
  }, [results]);

  useEffect(() => {
    // when user stops recording then only we have to store the user result into the DB.
    if (!isRecording && userAnswer.length > 10) {
      UpdateUserAnswer();
    }
    // if (userAnswer?.length < 10) {
    //   setLoading(false);
    //   toast.error("Error while saving your answer, Please Record again!");
    //   return;
    // }
  }, [userAnswer]);

  const StartStopRecording = async () => {
    if (isRecording) {
      stopSpeechToText();
    } else {
      startSpeechToText();
    }
  };

  const UpdateUserAnswer = async () => {
    console.log("UserAnswer 🔥 ", userAnswer);
    setLoading(true);
    const feedbackPrompt =
      "Question:" +
      mockInterviewQuestion[activeQuestionIndex]?.question +
      ", User Answer: " +
      userAnswer +
      ". Depends on question and user answer for given interview question," +
      " please give us rating for answer and feedback as area of improvement if any," +
      " in just 3 to 5 lines to improve it in JSON format with rating field and feedback field.";

    try {
      const result = await chatSession.sendMessage(feedbackPrompt);
      const mockJsonResp = result.response
        .text()
        .replace("```json", "")
        .replace("```", "");

      console.log("Feedback resp: ✅", mockJsonResp);
      const JsonFeedbackResp = JSON.parse(mockJsonResp);

      try {
        const resp = await db.insert(UserAnswer).values({
          mockIdRef: interviewData?.mockId,
          question: mockInterviewQuestion[activeQuestionIndex]?.question,
          correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
          userAns: userAnswer,
          feedback: JsonFeedbackResp?.feedback,
          rating: JsonFeedbackResp?.rating,
          useEmail: user?.primaryEmailAddress?.emailAddress,
          createdAt: moment().format("DD-MM-YYYY"),
        });

        if (resp) {
          toast.success("User Answer Recorded Succefully!!");
          setUserAnswer("");
          setResults([]);
        }
        setResults([]);
        setLoading(false);
      } catch (error) {
        toast.error(
          "Something went wrong while recording your Answer! Please try again."
        );
        console.error(
          "Error in Storing user recorded ans and ai feedback into the database :",
          error
        );
        setLoading(false);
      }
    } catch (error) {
      console.error("Error generating Feedback for question: ", error);
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col mt-20 justify-center items-center bg-black rounded-lg p-5">
        {/* <Image
          src={"/webcam.png"}
          width={200}
          height={200}
          alt="webcam"
          className="absolute"
        /> */}
        <Lottie animationData={webcamlottie} loop={true} className="absolute" />
        <Webcam
          mirrored={true}
          style={{
            height: 300,
            width: "100%",
            zIndex: 10,
          }}
        />
      </div>

      <Button
        disabled={loading}
        onClick={StartStopRecording}
        variant="outline"
        className="my-10 border border-black"
      >
        {isRecording ? (
          <h2 className="text-red-600 flex gap-2 justify-center items-center text-center">
            {/* <AudioLines /> Stop Recording{" "} */}
            <Lottie
              animationData={voiceline}
              loop={true}
              className="w-12 h-16"
            />{" "}
            <span>Stop Recording</span>
          </h2>
        ) : (
          "Record Answer"
        )}
      </Button>
    </div>
  );
};

export default RecordAnswerSection;

// This will show/display the user spoken text on screen
// <ul>
//   {results.map((result) => (
//     <li key={result.timestamp}>{result.transcript}</li>
//   ))}
//   {interimResult && <li>{interimResult}</li>}
// </ul>
