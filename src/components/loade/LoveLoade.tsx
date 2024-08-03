import React from "react";
import { PiHeartDuotone } from "react-icons/pi";

export default function LoveLoade() {
  return (
    <div className="flex flex-col gap-4 justify-center items-center w-full mt-20 xl:mt-32">
      <div className="flex flex-col items-center justify-center ">
        <div className="animate-waving-hand opacity-100 text-accent transform translate-y-0 duration-100">
          <PiHeartDuotone size={160} />
        </div>
        <div className="text-center">
          <p className="text-lg xl:text-2xl font-semibold text-white">
            جاري جلب المفضلة...
          </p>
        </div>
      </div>
    </div>
  );
}

