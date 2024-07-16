import { Sparkles } from "lucide-react";
import React from "react";

const YourCredits = () => {
  return (
    <div className="border-2 border-primary rounded-lg p-2 shadow-xl">
      <div className="flex gap-2">
        <Sparkles />

        <h2 className="font-bold text-primary text-2xl">Upgrade</h2>
      </div>

      <div className="flex justify-center text-center font-bold mt-3">
        <h2>Total Credits: 5</h2>
      </div>
      <div className="flex justify-between mt-4 text-sm">
        <h2 className="font-bold text-gray-400">Credits Used : 2 </h2>
        <h2 className="font-bold text-gray-400">Remaining credits: 3 </h2>
      </div>
      {/* Progress Bar of remaining credits */}
      <div className=" w-full bg-slate-300 h-3 rounded-full mt-2">
        <div
          className="bg-primary h-3 rounded-full"
          style={{
            //   width: `${calculateProgressPerc()}%`,
            width: `70%`,
          }}
        ></div>
      </div>
    </div>
  );
};

export default YourCredits;
