"use client";
import { GetInterviewList } from "@/app/_Serveractions";
import { UserInfoContext } from "@/context/UserInfoContext";
import { useUser } from "@clerk/nextjs";
import { Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import React, {
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import { HiSparkles } from "react-icons/hi2";
import Lottie from "lottie-react";
import loadingSpiner from "@/public/loadingSpiner.json";

const YourCredits = () => {
  const { userInfo } = useContext(UserInfoContext);
  const [totalInterviewsCreated, setTotalInterviewsCreated] = useState(0);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();
  const router = useRouter();

  const fetchInterviews = useCallback(async () => {
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
      } finally {
        setLoading(false);
      }
    }
  }, [user]);

  useEffect(() => {
    fetchInterviews();
  }, [user, fetchInterviews]);

  const totalCredits = useMemo(() => userInfo?.credits || 0, [userInfo]);
  const creditsUsed = useMemo(
    () => totalInterviewsCreated * 2 || 0,
    [totalInterviewsCreated]
  );
  const ActualCreditsExceptFreeCredits = useMemo(() => {
    return creditsUsed - 6 < 0 ? 0 : creditsUsed - 6;
  }, [creditsUsed]);

  const calculatePercentageWidth = useMemo(() => {
    const percentage = Math.floor(
      (ActualCreditsExceptFreeCredits / totalCredits) * 100
    );
    return percentage >= 100 ? 100 : percentage;
  }, [ActualCreditsExceptFreeCredits, totalCredits]);

  return (
    <div className="border-2 border-primary rounded-lg p-2 shadow-xl">
      <div
        onClick={() => router.push("/dashboard/upgrade")}
        className="flex gap-2 cursor-pointer hover:text-primary hover:font-extrabold transition-all"
      >
        <HiSparkles size={27} />
        <h2 className="font-bold text-primary text-2xl">Upgrade</h2>
      </div>

      {loading ? (
        <div className="flex flex-col justify-center items-center mt-3">
          <Lottie
            animationData={loadingSpiner}
            loop={true}
            className="h-20 w-20 lg:h-32 lg:w-32"
          />
          {/* <h4 className="text-xs lg:text-sm font-bold">
            Loading Credits details....
          </h4> */}
        </div>
      ) : (
        <>
          <div className="flex justify-center text-center font-bold mt-3">
            <h2>Total Credits: {totalCredits}</h2>
          </div>
          <div className="flex justify-between mt-4 text-sm">
            <h2 className="font-bold text-gray-400">
              {/* Credits Used: {ActualCreditsExceptFreeCredits} */}
              Credits Used:{" "}
              {userInfo?.creditsUsed - 6 <= 0
                ? 0
                : userInfo?.creditsUsed || ActualCreditsExceptFreeCredits}
            </h2>
            <h2 className="font-bold text-gray-400">
              TotalSpent: {userInfo?.totalAmountSpent || 0} $
            </h2>
          </div>
          <div className="w-full bg-slate-300 h-3 rounded-full mt-2">
            <div
              className="bg-primary h-3 rounded-full"
              style={{
                width: `${calculatePercentageWidth}%`,
              }}
            ></div>
          </div>
          <h2 className="flex justify-end text-xs mt-1 font-bold text-gray-400">
            Used: {calculatePercentageWidth || 0}%
          </h2>
        </>
      )}
    </div>
  );
};

export default YourCredits;
