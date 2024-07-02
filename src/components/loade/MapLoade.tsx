import React from "react";
import { PiMapPinDuotone } from "react-icons/pi";

export default function MapLoade() {
  return (
    <div className="mx-2 mt-5 xl:mx-0 xl:ml-3">
      <div className="bg-sidpar flex flex-col gap-5 justify-center items-center h-max py-10 rounded-md">
        <div className="text-[90px]">
          <PiMapPinDuotone />
        </div>
        <h1 className="text-2xl">جاري تحميل الخريطة...</h1>
      </div>
    </div>
  );
}
