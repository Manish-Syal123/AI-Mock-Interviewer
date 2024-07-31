"use client";
import Lottie from "lottie-react";
import Link from "next/link";
import notfound from "@/public/notfound.json";

export default function NotFound() {
  return (
    <div className="grid h-screen place-content-center bg-white px-4">
      <div className="text-center">
        {/* <h1 className="text-9xl font-black text-gray-200">404</h1> */}
        <Lottie
          animationData={notfound}
          loop={true}
          width="800"
          height="800"
          className=" justify-center items-center"
        />
        <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Uh-oh!
        </p>

        <p className="mt-4 text-gray-500">We can't find that page.</p>

        <Link
          href="/dashboard"
          className="mt-6 inline-block rounded bg-indigo-600 px-5 py-3 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
