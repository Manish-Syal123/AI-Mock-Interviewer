import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

const InterviewItemCard = ({ interview }) => {
  const router = useRouter();
  return (
    <div className="border shadow-sm rounded-lg p-3">
      <h2 className="font-bold text-primary">{interview?.jobPosition}</h2>
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
