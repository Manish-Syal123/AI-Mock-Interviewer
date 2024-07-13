import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import Webcam from "react-webcam";

const RecordAnswerSection = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col mt-20 justify-center items-center bg-black rounded-lg p-5">
        <Image
          src={"/webcam.png"}
          width={200}
          height={200}
          alt="webcam"
          className="absolute"
        />
        <Webcam
          mirrored={true}
          style={{
            height: 300,
            width: "100%",
            zIndex: 10,
          }}
        />
      </div>
      <Button variant="outline" className="my-10 border border-black">
        Record Answer
      </Button>
    </div>
  );
};

export default RecordAnswerSection;
