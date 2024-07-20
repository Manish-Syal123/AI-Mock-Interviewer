"use client";
import React, { useEffect, useState } from "react";
import Header from "./_components/Header";
import { useUser } from "@clerk/nextjs";
import { db } from "@/utils/db";
import { UserDetails } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { UserInfoContext } from "@/context/UserInfoContext";

const DashboardLayout = ({ children }) => {
  const [userInfo, setUserInfo] = useState();
  const [paymentResult, setPaymentResult] = useState();
  const { user } = useUser();

  useEffect(() => {
    user && GetUserInfo();
  }, [user]);
  const GetUserInfo = async () => {
    try {
      const result = await db
        .select()
        .from(UserDetails)
        .where(
          eq(UserDetails?.userEmail, user?.primaryEmailAddress?.emailAddress)
        );

      // console.log("User Details/Info : ", result[0]);
      if (result) {
        setUserInfo(result[0]);
        console.log(userInfo);
      }
    } catch (error) {
      console.error("Error Fetching UserInfo : ", error);
    }
  };
  return (
    <UserInfoContext.Provider
      value={{ userInfo, setUserInfo, paymentResult, setPaymentResult }}
    >
      <div>
        <Header />
        <div className="mx-5 md:mx-20 lg:mx-36">{children}</div>
      </div>
    </UserInfoContext.Provider>
  );
};

export default DashboardLayout;
