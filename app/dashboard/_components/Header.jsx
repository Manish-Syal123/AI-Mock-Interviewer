"use client";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const Header = () => {
  const path = usePathname();
  const router = useRouter();
  return (
    <div
      className={`flex p-4 items-center justify-between 
      bg-secondary shadow-sm relative z-20 ${
        path == "/dashboard/success" && "hidden"
      }`}
    >
      <Image src="/logo2.png" width={160} height={100} alt="logo" />
      <ul className=" hidden md:flex gap-6">
        <li
          onClick={() => router.replace("/dashboard")}
          className={`font-medium hover:text-primary hover:font-extrabold 
        transition-all cursor-pointer
        ${path == "/dashboard" && "text-primary font-extrabold"}
        `}
        >
          Dashboard
        </li>
        <li
          onClick={() => router.replace("/dashboard/favourites")}
          className={`font-medium hover:text-primary hover:font-extrabold 
        transition-all cursor-pointer
        ${path == "/dashboard/favourites" && "text-primary font-extrabold"}
        `}
        >
          Favourites
        </li>
        <li
          onClick={() => router.replace("/dashboard/upgrade")}
          className={`font-medium hover:text-primary hover:font-extrabold 
        transition-all cursor-pointer
        ${path == "/dashboard/upgrade" && "text-primary font-extrabold"}
        `}
        >
          Upgrade
        </li>
      </ul>
      <UserButton />
    </div>
  );
};

export default Header;
