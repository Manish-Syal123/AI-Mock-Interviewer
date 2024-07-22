"use client";
import { GetInterviewList } from "@/app/_Serveractions";
import { UserInfoContext } from "@/context/UserInfoContext";
import { useUser } from "@clerk/nextjs";
import { Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

const YourCredits = () => {
  const { userInfo, setUserInfo } = useContext(UserInfoContext);
  const [totalInterviewsCreated, setTotalInterviewsCreated] = useState(0);
  const { user } = useUser();
  const router = useRouter();
  useEffect(() => {
    const fetchInterviews = async () => {
      if (user) {
        try {
          const result = await GetInterviewList(
            user?.primaryEmailAddress?.emailAddress
          );
          console.log("❤️❤️❤️❤️", result);
          if (result) {
            setTotalInterviewsCreated(result?.length || 0);
          }
        } catch (error) {
          console.log("Error fetching interviews", error);
        }
      }
    };
    fetchInterviews();
  }, [user]);

  const totalCredits = userInfo?.credits || 0;
  const creditsUsed = totalInterviewsCreated * 2 || 0;
  const ActualCreditsExceptFreeCredits =
    creditsUsed - 6 < 0 ? 0 : creditsUsed - 6;

  const calculatePercentageWidth = () => {
    const percentage = Math.floor(
      (ActualCreditsExceptFreeCredits / totalCredits) * 100
    );
    return percentage >= 100 ? 100 : percentage;
  };
  return (
    <div className="border-2 border-primary rounded-lg p-2 shadow-xl">
      <div
        onClick={() => router.push("/dashboard/upgrade")}
        className="flex gap-2 cursor-pointer hover:text-primary hover:font-extrabold transition-all"
      >
        <Sparkles />
        <h2 className="font-bold text-primary text-2xl">Upgrade</h2>
      </div>

      <div className="flex justify-center text-center font-bold mt-3">
        <h2>Total Credits: {totalCredits}</h2>
      </div>
      <div className="flex justify-between mt-4 text-sm">
        <h2 className="font-bold text-gray-400">
          Credits Used: {ActualCreditsExceptFreeCredits}{" "}
        </h2>
        <h2 className="font-bold text-gray-400">
          {/* percentage : {calculatePercentageWidth()}% */}
          TotalSpent: {userInfo?.totalAmountSpent || 0} $
        </h2>
      </div>
      <div className="w-full bg-slate-300 h-3 rounded-full mt-2">
        <div
          className="bg-primary h-3 rounded-full"
          style={{
            width: `${calculatePercentageWidth()}%`,
          }}
        ></div>
      </div>
      <h2 className=" flex justify-end text-xs mt-1 font-bold text-gray-400">
        Used: {calculatePercentageWidth() || 0}%
      </h2>
    </div>
  );
};

export default YourCredits;
