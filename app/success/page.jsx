"use client";
import React from "react";
import Lottie from "lottie-react";
import PaymentSuccefull from "@/public/PaymentSuccefull.json";
import PaymentCheck from "@/public/PaymentCheck.json";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
const SuccessPage = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col p-3">
      <div className="flex justify-start">
        <Button
          onClick={() => router.replace("/dashboard")}
          className="flex justify-center items-center gap-1 rounded-3xl cursor-pointer"
        >
          <ArrowLeft /> Go back
        </Button>
      </div>
      <div className="flex flex-col justify-center items-center -mt-12">
        <Lottie
          animationData={PaymentSuccefull}
          loop={true}
          className="h-screen -mt-32 justify-center items-center"
        />

        <Lottie
          animationData={PaymentCheck}
          loop={true}
          className=" flex h-52 justify-center items-center -mt-52"
        />

        <h2 className="font-bold text-2xl text-indigo-700">
          ⚡ Payment Succefull ⚡
        </h2>
        <h2 className="font-bold text-2xl">
          Thanks for buying Credits for Mock Interviews
        </h2>
      </div>
    </div>
  );
};

export default SuccessPage;
