"use client";
import { GetInterviewList } from "@/app/_Serveractions";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import InterviewItemCard from "../_components/InterviewItemCard";

const FavouriteInterviews = () => {
  const [interviewList, setInterviewList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    user && getInterviewList();
  }, [user]);

  const getInterviewList = async () => {
    try {
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
    }
  };
  return (
    <div>
      <h2 className="font-semibold text-lg">Favourite Mock Interviews</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3">
        {filteredList &&
          filteredList?.map((favinterview, index) => (
            <InterviewItemCard
              key={index}
              interview={favinterview}
              refreshCallBack={() => getInterviewList()}
            />
          ))}
      </div>
    </div>
  );
};

export default FavouriteInterviews;
