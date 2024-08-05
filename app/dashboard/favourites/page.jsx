"use client";
import { GetInterviewList } from "@/app/_Serveractions";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import InterviewItemCard from "../_components/InterviewItemCard";
import Loading from "../_components/Loading"; // Assuming you have a Loading component
import NoDataFound from "../_components/NoDataFound";
import Lottie from "lottie-react";
import Favourite_Astronaut from "@/public/Favourite_Astronaut.json";

const FavouriteInterviews = () => {
  const [interviewList, setInterviewList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    if (user) getInterviewList();
  }, [user]);

  const getInterviewList = async () => {
    try {
      setLoading(true);
      const result = await GetInterviewList(
        user?.primaryEmailAddress?.emailAddress
      );

      if (result) {
        console.log("MOCKInterview in favourite 🚀 ", result);
        setInterviewList(result);

        const favFilteredList = result?.filter(
          (interview) => interview?.favourite
        );
        setFilteredList(favFilteredList);
      }
    } catch (error) {
      console.log("Error fetching favourite interviews", error);
      toast.error("Error fetching favourite interviews");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="font-semibold text-lg">Favourite Mock Interviews</h2>
      {loading ? (
        <div className="flex justify-center items-center m-auto h-[50%]">
          <Loading />
        </div>
      ) : (
        <>
          <div>
            <Lottie
              animationData={Favourite_Astronaut}
              loop={true}
              className="h-72 m-auto"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3">
            {filteredList.length > 0 ? (
              filteredList.map((favinterview, index) => (
                <InterviewItemCard
                  key={index}
                  interview={favinterview}
                  refreshCallBack={() => getInterviewList()}
                />
              ))
            ) : (
              <div className="col-span-3">
                <NoDataFound message="No favourite interviews found !!" />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default FavouriteInterviews;
