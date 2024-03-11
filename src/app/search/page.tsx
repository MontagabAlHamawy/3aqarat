import React from "react";
import { PiMagnifyingGlassDuotone } from "react-icons/pi";

export default function Search() {
  return (
    <div>
      <div  className="flex flex-row justify-between items-center bg-section mr-[-16px] mt-[-40px] px-10 h-16">
        <div className="flex flex-row items-center justify-center gap-1">
          <input type="text" placeholder="اسم المنطقة" className="bg-secondary text-white rounded-md px-1 h-8"/>
          <button type="submit" className="p-2 bg-body rounded-md">
            <PiMagnifyingGlassDuotone />
          </button>
        </div>
        
      </div>
    </div>
  );
}
