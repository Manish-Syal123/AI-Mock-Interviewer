"use client";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";

const Header = () => {
  const path = usePathname();
  return (
    <div className="flex p-4 items-center justify-between bg-secondary shadow-sm">
      <Image src="/logo2.png" width={160} height={100} alt="logo" />
      <ul className=" hidden md:flex gap-6">
        <li
          className={`font-medium hover:text-primary hover:font-extrabold 
        transition-all cursor-pointer
        ${path == "/dashboard" && "text-primary font-extrabold"}
        `}
        >
          Dashboard
        </li>
        <li
          className={`font-medium hover:text-primary hover:font-extrabold 
        transition-all cursor-pointer
        ${path == "/dashboard/questions" && "text-primary font-extrabold"}
        `}
        >
          Questions
        </li>
        <li
          className={`font-medium hover:text-primary hover:font-extrabold 
        transition-all cursor-pointer
        ${path == "/dashboard/upgrade" && "text-primary font-extrabold"}
        `}
        >
          Upgrade
        </li>
        <li
          className={`font-medium hover:text-primary hover:font-extrabold 
        transition-all cursor-pointer
        ${path == "/dashboard/how" && "text-primary font-extrabold"}
        `}
        >
          How it Works?
        </li>
      </ul>
      <UserButton />
    </div>
  );
};

export default Header;
