import React from "react";
import { PiMegaphoneDuotone } from "react-icons/pi";

export default function RequestError() {
  return (
    <div className="sticky xl:w-1/2 flex flex-col gap-4">
      <div className="bg-sidpar xl:h-[73vh] flex flex-col gap-5 justify-center items-center h-max py-10 rounded-md">
        <div className="text-[90px] text-accent ">
          <PiMegaphoneDuotone />
        </div>
        <h1 className="text-lg xl:text-2xl">لا توجد طلبات لعرضها</h1>
      </div>
    </div>
  );
}
