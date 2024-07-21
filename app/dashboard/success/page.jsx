"use client";
import React, { useContext, useEffect, useState } from "react";
import Lottie from "lottie-react";
import PaymentSuccefull from "@/public/PaymentSuccefull.json";
import PaymentCheck from "@/public/PaymentCheck.json";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  MatchUserPaymentSecretKey,
  RemoveUserPaymentSecretKey,
  updateCreditsAndTotalSpent,
} from "@/app/_Serveractions";
import { useUser } from "@clerk/nextjs";
import { UserInfoContext } from "@/context/UserInfoContext";

const SuccessPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const paymentkeyQueryParam = searchParams.get("session_id");
  const [loading, setLoading] = useState(true);
  const { userInfo, setUserInfo } = useContext(UserInfoContext);
  const { user } = useUser();

  useEffect(() => {
    if (paymentkeyQueryParam && userInfo) {
      console.log("Payment key ✅✅✅", paymentkeyQueryParam);
      console.log("user Info 🤑🤑🤑: ", userInfo);
      const makebackendcall = async () => {
        userInfo && (await Matchpaymentsecretkey());
      };

      makebackendcall();
    }
  }, [userInfo, paymentkeyQueryParam]);

  const Matchpaymentsecretkey = async () => {
    try {
      const result = await MatchUserPaymentSecretKey(
        user?.primaryEmailAddress?.emailAddress,
        paymentkeyQueryParam
      );
      if (result) {
        console.log("User payment secret key matched 🚀", result);

        await DeletePaymentSecretKeyFromDB();
      } else {
        console.log("User payment secret key not matched 🚀", result);
      }
    } catch (error) {
      console.error("Error matching user payment secret key", error);
    }
  };

  const DeletePaymentSecretKeyFromDB = async () => {
    try {
      const result = await RemoveUserPaymentSecretKey(
        user?.primaryEmailAddress?.emailAddress
      );
      if (result) {
        console.log("User payment secret key deleted 🚀", result);
        await AddCreditsOnUserAccount(); //after deleting payment key Add 12 credits to the user's account
      } else {
        console.log("User payment secret key not deleted 🚀", result);
      }
    } catch (error) {
      console.error("Error deleting user payment secret key", error);
    }
  };

  const AddCreditsOnUserAccount = async () => {
    try {
      const currentCredits = userInfo?.credits || 0;
      const newCredits = currentCredits + 12;
      const email = user?.primaryEmailAddress?.emailAddress;
      let newTotalSpent = userInfo?.totalSpent || 0;
      newTotalSpent += 1;

      // if (!isNaN(newTotalSpent) && typeof newTotalSpent === "number") {
      //   newTotalSpent += 1;
      // }

      if (!isNaN(newCredits) && typeof newCredits === "number") {
        const creditsUpdated = await updateCreditsAndTotalSpent(
          email,
          newCredits,
          newTotalSpent
        );
        if (creditsUpdated) {
          // setUserInfo((prevUserInfo) => ({
          //   ...prevUserInfo,
          //   credits: newCredits,
          //   totalSpent: newTotalSpent,
          // }));
          console.log("User credits updated: 🎉🎉🎉", newCredits);
        }
      } else {
        console.log("Invalid credits value:", newCredits);
      }
    } catch (error) {
      console.error("Error updating user credits", error);
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
