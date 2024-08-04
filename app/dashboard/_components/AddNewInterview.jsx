"use client";
import React, { useContext, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { chatSession } from "@/utils/GeminiAIModal";
import { Loader } from "lucide-react";
import { db } from "@/utils/db";
import { MOCKInterview } from "@/utils/schema";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { useRouter } from "next/navigation";
import AddNew from "@/public/AddNew.json";
import Lottie from "lottie-react";
import { UserInfoContext } from "@/context/UserInfoContext";
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
import { UpdateCreditsUsed, UpdateUserCredits } from "@/app/_Serveractions";

const AddNewInterview = () => {
  const { userInfo, setUserInfo } = useContext(UserInfoContext);
  const [openDialog, setOpenDialog] = useState();
  const [upgradeDialog, setUpgradeDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState();
  const [jobDescription, setJobDescription] = useState();
  const [jobExperience, setJobExperience] = useState();
  const [loading, setLoading] = useState(false);
  const [jsonResponse, setJsonResponse] = useState([]);
  const router = useRouter();
  const { user } = useUser();

  //TODO:
  //if userInfo?.credits >0 then only user can create new Interviews
  // to check if userInfo Credits >0 ==> then call the update method to deduct the credits
  const onSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    console.log(jobPosition, jobDescription, jobExperience);

    const InputPrompt = `job position: ${jobPosition}, Job Description: ${jobDescription}, Year of Experience: ${jobExperience}. Depends on this information give me ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT} interview questions with answers in JSON Format. Give Questions and answers as field in JSON. Use this format for generating the output [ {"question":  ,"answer": },{"question":  ,"answer": },{"question":  ,"answer": }]`;

    try {
      const result = await chatSession.sendMessage(InputPrompt);
      const MockJsonResp = result.response
        .text()
        .replace("```json", "")
        .replace("```", "");
      console.log(JSON.parse(MockJsonResp));
      setJsonResponse(MockJsonResp || []);

      try {
        if (MockJsonResp) {
          const resp = await db
            .insert(MOCKInterview)
            .values({
              mockId: uuidv4(),
              jsonMockResp: MockJsonResp,
              jobPosition: jobPosition,
              jobDescription: jobDescription,
              jobExperience: jobExperience,
              createdBy: user?.primaryEmailAddress?.emailAddress,
              createdAt: moment().format("DD-MM-YYYY"),
            })
            .returning({ mockId: MOCKInterview.mockId });

          console.log("Inserted ID: ", resp);

          if (resp) {
            setOpenDialog(false);
            router.push("/dashboard/interview/" + resp[0]?.mockId);
          }

          //logic to Update Credits
          await updateCredits();
          //logic to Update CreditsUsed
          await updateCreditsUsed();
        }
      } catch (error) {
        console.error("Error while adding response to Backend : ", error);
      }

      setLoading(false);
    } catch (error) {
      console.error("Error while Generating MockJsonResp : ", error);
      setLoading(false);
    }
  };

  const updateCredits = async () => {
    if (userInfo && userInfo?.credits > 0) {
      try {
        const newCredits = userInfo?.credits - 2;
        const email = user?.primaryEmailAddress?.emailAddress;
        const res = await UpdateUserCredits(email, newCredits);
        if (res) {
          setUserInfo((prevUserInfo) => ({
            ...prevUserInfo,
            credits: newCredits,
          }));

          console.log("User credits updated: 🎉🎉🎉", res, newCredits);
        } else {
          console.log("Unable to Update Credits:", res);
        }
      } catch (error) {
        console.log("Error updating user credits", error);
      }
    }
  };

  const updateCreditsUsed = async () => {
    const newUsedCredits = userInfo?.creditsUsed + 2;
    const email = user?.primaryEmailAddress?.emailAddress;
    const res = await UpdateCreditsUsed(email, newUsedCredits);
    if (res) {
      setUserInfo((prevUserInfo) => ({
        ...prevUserInfo,
        creditsUsed: newUsedCredits,
      }));
      console.log("User creditsUsed updated: 🎉🎉🎉", res, newUsedCredits);
    } else {
      console.error("Unable to Update CreditsUsed:", res);
    }
  };

  return (
    <div>
      <div
        className="p-10 border-2 border-dashed  border-primary 
      rounded-lg bg-secondary hover:scale-105 hover:shadow-md 
      cursor-pointer transition-all"
        onClick={() => {
          userInfo?.credits > 0 ? setOpenDialog(true) : setUpgradeDialog(true);
        }}
      >
        <h2 className="flex justify-center items-center font-medium text-lg text-center">
          <Lottie animationData={AddNew} loop={true} className="h-16" /> Add New
        </h2>
      </div>
      {/* Add new Interview Diaglo */}
      <Dialog open={openDialog}>
        {/* <DialogTrigger></DialogTrigger> */}
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Tell Us more about your interview
            </DialogTitle>
            <DialogDescription>
              <form onSubmit={onSubmit}>
                <div>
                  <h2>
                    Add Details about your job Position/role, job description
                    and year of experience
                  </h2>

                  <div className="mt-7 my-3">
                    <label className="font-semibold">Job Role/Position</label>
                    <Input
                      onChange={(event) => setJobPosition(event.target.value)}
                      placeholder="Ex. Full Stack Developer"
                      required
                    />
                  </div>

                  <div className="mt-7 my-3">
                    <label className="font-semibold">
                      Job Description/Tech Stack (In Short)
                    </label>
                    <Textarea
                      onChange={(event) =>
                        setJobDescription(event.target.value)
                      }
                      required
                      placeholder="Ex. React, Angular, Nodejs, MySql"
                    />
                  </div>
                  <div className="mt-7 my-3">
                    <label className="font-semibold">Years of Experience</label>
                    <Input
                      onChange={(event) => setJobExperience(event.target.value)}
                      required
                      placeholder="EX. 5"
                      type="number"
                      max="30"
                      min="0"
                    />
                  </div>
                </div>
                <div className="flex gap-5 justify-end">
                  <Button
                    onClick={() => setOpenDialog(false)}
                    type="button"
                    variant="ghost"
                    className={`hover:border hover:border-gray-500 ${
                      loading && "hidden"
                    }`}
                    disabled={loading}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader className="animate-spin" /> Generating from AI
                      </>
                    ) : (
                      "Start Interview"
                    )}
                  </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      {/* Upgrade Credits Alert Dialog */}
      <AlertDialog open={upgradeDialog}>
        {/* <AlertDialogTrigger>Open</AlertDialogTrigger> */}
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              You don't have enough Credits left !
            </AlertDialogTitle>
            <AlertDialogDescription>
              Please Upgrade the Credits
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setUpgradeDialog(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => router.push("/dashboard/upgrade")}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AddNewInterview;
