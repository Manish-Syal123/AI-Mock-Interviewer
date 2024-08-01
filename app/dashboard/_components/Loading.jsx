"use client";
import Lottie from "lottie-react";
import React from "react";
import skelotenloading2 from "@/public/skelotenloading2.json";

const Loading = () => {
  return (
    <div className="flex justify-center items-center">
      <Lottie
        animationData={skelotenloading2}
        loop={true}
        speed={3.5}
        className="h-96 justify-center items-center"
      />
      {/* <h2 className="text-2xl text-bold">Loading.........</h2> */}
    </div>
  );
};

export default Loading;
