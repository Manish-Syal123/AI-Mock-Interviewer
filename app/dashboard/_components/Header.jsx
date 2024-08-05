"use client";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { CgMenu, CgClose } from "react-icons/cg";

const Header = () => {
  const [menuIcon, setMenuIcon] = useState(false);
  const path = usePathname();
  const router = useRouter();

  return (
    <div
      className={`flex p-4 items-center bg-secondary justify-between shadow-sm relative z-20 ${
        path == "/dashboard/success" && "hidden"
      }`}
    >
      <Image
        src="/logo2.png"
        width={160}
        height={100}
        objectFit="contain"
        alt="logo"
        onClick={() => router.replace("/")}
        className="cursor-pointer"
      />

      <ul className={`hidden md:flex gap-6`}>
        <li
          onClick={() => router.replace("/dashboard")}
          className={`font-medium hover:text-primary hover:font-extrabold transition-all cursor-pointer ${
            path == "/dashboard" && "text-primary font-extrabold"
          }`}
        >
          Dashboard
        </li>
        <li
          onClick={() => router.replace("/dashboard/favourites")}
          className={`font-medium hover:text-primary hover:font-extrabold transition-all cursor-pointer ${
            path == "/dashboard/favourites" && "text-primary font-extrabold"
          }`}
        >
          Favourites
        </li>
        <li
          onClick={() => router.replace("/dashboard/upgrade")}
          className={`font-medium hover:text-primary hover:font-extrabold transition-all cursor-pointer ${
            path == "/dashboard/upgrade" && "text-primary font-extrabold"
          }`}
        >
          Upgrade
        </li>
      </ul>

      {/* Mobile Navbar section from here */}
      <div className="flex items-center">
        <UserButton />
        <div className="md:hidden flex justify-end ml-4">
          <Button onClick={() => setMenuIcon(!menuIcon)}>
            {menuIcon ? (
              <CgClose className="text-2xl" />
            ) : (
              <CgMenu className="text-2xl" />
            )}
          </Button>
        </div>
      </div>

      <div
        className={`absolute top-16 left-0 w-[30%] bg-secondary md:hidden transition-transform duration-300 rounded-lg ${
          menuIcon ? "transform translate-x-0" : "transform -translate-x-full"
        }`}
      >
        <ul className="flex flex-col items-center gap-6 py-4">
          <li
            onClick={() => {
              router.replace("/dashboard");
              setMenuIcon(false);
            }}
            className={`font-medium hover:text-primary hover:font-extrabold transition-all cursor-pointer ${
              path == "/dashboard" && "text-primary font-extrabold"
            }`}
          >
            Dashboard
          </li>
          <li
            onClick={() => {
              router.replace("/dashboard/favourites");
              setMenuIcon(false);
            }}
            className={`font-medium hover:text-primary hover:font-extrabold transition-all cursor-pointer ${
              path == "/dashboard/favourites" && "text-primary font-extrabold"
            }`}
          >
            Favourites
          </li>
          <li
            onClick={() => {
              router.replace("/dashboard/upgrade");
              setMenuIcon(false);
            }}
            className={`font-medium hover:text-primary hover:font-extrabold transition-all cursor-pointer ${
              path == "/dashboard/upgrade" && "text-primary font-extrabold"
            }`}
          >
            Upgrade
          </li>
        </ul>
      </div>

      {/* <UserButton /> */}
    </div>
  );
};

export default Header;
