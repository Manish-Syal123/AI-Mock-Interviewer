import { UpdateFavorite } from "@/app/_Serveractions";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaStar } from "react-icons/fa6";
import { toast } from "sonner";

const InterviewItemCard = ({ interview, refreshCallBack }) => {
  const [toggleFavourite, setToggleFavorite] = useState(false);
  const router = useRouter();

  const handleFavourite = async () => {
    setToggleFavorite(!toggleFavourite);
    // Handle favourite logic here
    try {
      const result = await UpdateFavorite(
        !interview?.favourite,
        interview?.mockId
      );
      if (result) {
        console.log("User favorite updated 🚀", result);
        toast.success("Added to Favourites");
        refreshCallBack();
      }
    } catch (error) {
      console.log("Error updating user favorite", error);
      toast.error("Error updating user favorite");
    }
    // console.log(interview?.mockId);
  };
  return (
    <div className="border shadow-sm rounded-lg p-3">
      <div className="flex justify-between">
        <h2 className="font-bold text-primary">{interview?.jobPosition}</h2>

        {interview?.favourite ? (
          <FaStar
            size={25}
            onClick={() => handleFavourite()}
            className="cursor-pointer text-yellow-400"
          />
        ) : (
          <Star onClick={() => handleFavourite()} className="cursor-pointer" />
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
