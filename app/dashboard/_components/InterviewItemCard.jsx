import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaStar } from "react-icons/fa6";

const InterviewItemCard = ({ interview }) => {
  const [toggleFavourite, setToggleFavorite] = useState(false);
  const router = useRouter();
  return (
    <div className="border shadow-sm rounded-lg p-3">
      <div className="flex justify-between">
        <h2 className="font-bold text-primary">{interview?.jobPosition}</h2>

        {toggleFavourite ? (
          <FaStar
            size={25}
            onClick={() => setToggleFavorite(!toggleFavourite)}
            className="cursor-pointer text-yellow-400"
          />
        ) : (
          <Star
            onClick={() => setToggleFavorite(!toggleFavourite)}
            className="cursor-pointer"
          />
        )}
      </div>
      <h2 className="text-sm font-medium text-gray-600">
        {interview?.jobExperience} Years of Experience
      </h2>
      <h2 className="text-xs text-gray-400">
        Created At: {interview?.createdAt}
      </h2>
      <div className="flex justify-between items-center mt-2 gap-5">
        <Button
          onClick={() =>
            router.push(
              "/dashboard/interview/" + interview?.mockId + "/feedback"
            )
          }
          size="sm"
          variant="outline"
          className="w-full"
        >
          Feedback
        </Button>
        <Button
          onClick={() =>
            router.push("/dashboard/interview/" + interview?.mockId)
          }
          size="sm"
          className="w-full"
        >
          Start
        </Button>
      </div>
    </div>
  );
};

export default InterviewItemCard;
