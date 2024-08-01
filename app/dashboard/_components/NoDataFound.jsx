import React from "react";
import Lottie from "lottie-react";
import NoResultFound from "@/public/NoResultFound.json";

const NoDataFound = ({ message }) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <Lottie
        animationData={NoResultFound}
        loop={true}
        className="w-8/12 h-96"
      />
      <p className="font-bold text-xl">{message || "No result found!"} </p>
    </div>
  );
};

export default NoDataFound;
