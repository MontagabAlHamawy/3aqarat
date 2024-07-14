import React, { useState } from "react";
import { PiPlusCircleDuotone } from "react-icons/pi";

export default function AddBuilding() {
  const [showButtons, setShowButtons] = useState(false);

  const toggleButtons = () => {
    setShowButtons(!showButtons);
  };

  return (
    <div className="fixed bottom-[60px] xl:bottom-16 left-0 xl:left-3 p-3 z-50">
      <div className="relative">
        <div
          className="cursor-pointer text-3xl bg-accent rounded-md p-3"
          onClick={toggleButtons}
        >
          <PiPlusCircleDuotone />
        </div>
        {showButtons && (
          <div className="absolute bottom-full left-0 flex flex-col justify-end items-end space-y-2 mb-2">
            <button className="p-2 text-sm bg-sidpar text-white w-max rounded shadow">
              <a href="/buildings/add-building">إضافة شقة</a>
            </button>
            <button className="p-2 text-sm bg-sidpar text-white w-max rounded shadow">
              <a href="/buildings/add-building">إضاقة محضر</a>
            </button>
            <button className="p-2 text-sm bg-sidpar text-white w-max rounded shadow">
              <a href="/buildings/add-building">إضافة منزل</a>
            </button>
            <button className="p-2 text-sm bg-sidpar text-white w-max rounded shadow">
              <a href="/buildings/add-building">إضافة محل</a>
            </button>
            <button className="p-2 text-sm bg-sidpar text-white w-max rounded shadow">
              <a href="/buildings/add-building">إضافة أرض</a>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
