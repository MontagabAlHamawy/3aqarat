import React from "react";
import { PiMapPinDuotone } from "react-icons/pi";

export default function MapError() {
  return (
    <div className="mx-2 mt-5 xl:mx-0 xl:ml-3">
      <div className="bg-sidpar flex flex-col gap-5 justify-center items-center h-max py-10 rounded-md">
        <div className="text-[90px] text-accent  animate-waving-hand opacity-100 transform translate-y-0 duration-100">
          <PiMapPinDuotone />
        </div>
        <h1 className="text-lg xl:text-2xl">لا توجد بيانات لعرضها</h1>
      </div>
    </div>
  );
}
