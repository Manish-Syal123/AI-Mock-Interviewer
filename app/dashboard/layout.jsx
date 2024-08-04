"use client";
import React, { Suspense, useEffect, useState } from "react";
import Header from "./_components/Header";
import { useUser } from "@clerk/nextjs";
import { db } from "@/utils/db";
import { UserDetails } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { UserInfoContext } from "@/context/UserInfoContext";
import Loading from "./loading.js";

const DashboardLayout = ({ children }) => {
  const [userInfo, setUserInfo] = useState();
  const [paymentResult, setPaymentResult] = useState();
  const { user } = useUser();

  useEffect(() => {
    const GetUserInfo = async () => {
      try {
        const result = await db
          .select()
          .from(UserDetails)
          .where(
            eq(UserDetails?.userEmail, user?.primaryEmailAddress?.emailAddress)
          );

        // console.log("User Details/Info : ", result[0]);
        if (result.length > 0) {
          setUserInfo(result[0]);
          console.log(result[0]); // Log the result directly
        }
      } catch (error) {
        console.error("Error Fetching UserInfo : ", error);
      }
    };

    if (user) {
      GetUserInfo();
    }
  }, [user]); // Only depend on 'user'

  return (
    <UserInfoContext.Provider
      value={{ userInfo, setUserInfo, paymentResult, setPaymentResult }}
    >
      <Suspense fallback={<Loading />}>
        <div>
          <Header />
          <div className="mx-5 md:mx-20 lg:mx-36">{children}</div>
        </div>
      </Suspense>
    </UserInfoContext.Provider>
  );
};

export default DashboardLayout;
