"use client";
import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import PaymentSuccefull from "@/public/PaymentSuccefull.json";
import PaymentCheck from "@/public/PaymentCheck.json";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { MatchUserPaymentSecretKey } from "@/app/_Serveractions";
import { useUser } from "@clerk/nextjs";

const SuccessPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const paymentkeyQueryParam = searchParams.get("session_id");
  const { user } = useUser();

  useEffect(() => {
    if (paymentkeyQueryParam) {
      console.log("Payment key ✅✅✅", paymentkeyQueryParam);
      Matchpaymentsecretkey();
    }
  }, []);

  const Matchpaymentsecretkey = async () => {
    try {
      const result = await MatchUserPaymentSecretKey(
        user?.primaryEmailAddress?.emailAddress,
        paymentkeyQueryParam
      );
      if (result) {
        console.log("User payment secret key matched 🚀", result);
      } else {
        console.log("User payment secret key not matched 🚀", result);
      }
      // console.log("User payment secret key matched 🚀", result);
    } catch (error) {
      console.error("Error matching user payment secret key", error);
    }
  };

  return (
    <>
      <div className="flex justify-start -mx-32 mt-3">
        <Button
          onClick={() => router.replace("/dashboard")}
          className="flex justify-center items-center gap-1 rounded-3xl cursor-pointer"
        >
          <ArrowLeft /> Go back
        </Button>
      </div>
      <div className="flex flex-col p-0">
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
    </>
  );
};

export default SuccessPage;
