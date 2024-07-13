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

const RecordAnswerSection = () => {
  const [userAnswer, setUserAnswer] = useState("");

  const {
    error,
    interimResult,
    isRecording,
    results,
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
        onClick={isRecording ? stopSpeechToText : startSpeechToText}
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
      <Button onClick={() => console.log(userAnswer)}>
        Show My Answer on Console
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
