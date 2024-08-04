import { DeleteInterview, UpdateFavorite } from "@/app/_Serveractions";
import { Button } from "@/components/ui/button";
import { LoaderCircle, Star, Trash, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaStar } from "react-icons/fa6";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const InterviewItemCard = ({ interview, refreshCallBack }) => {
  const [toggleFavourite, setToggleFavorite] = useState(false);
  const [loading, setLoading] = useState(false);
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
        toast.success("Updated your Favourites interview list");
        refreshCallBack();
      }
    } catch (error) {
      console.log("Error updating user favorite", error);
      toast.error("Error updating user favorite");
    }
    // console.log(interview?.mockId);
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      const result = await DeleteInterview(interview?.mockId);
      if (result) {
        console.log("Interview deleted 🚀", result);
        toast.success("Deleted interview successfully !");
        refreshCallBack();
        setLoading(false);
      }
    } catch (error) {
      console.error("Error deleting interview", error);
      toast.error("Error deleting interview. Please try again later.");
      setLoading(false);
    }
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
      <div className="grid grid-col-2 lg:grid-cols-3 items-center mt-2 gap-5">
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

        <AlertDialog>
          <AlertDialogTrigger className="flex justify-center lg:justify-end">
            <Button
              disabled={loading}
              className="text-red-500"
              size="sm"
              variant="outline"
            >
              {loading ? (
                <LoaderCircle className="text-red-500 animate-spin" />
              ) : (
                <Trash2 />
              )}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                Interview from your account and remove your data from our
                servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete} className="bg-red-500">
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default InterviewItemCard;
