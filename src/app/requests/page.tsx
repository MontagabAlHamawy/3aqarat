import React from "react";
import { add } from "../components/links";
import { PiArrowFatLeftDuotone } from "react-icons/pi";

export default function Requests() {
  return (
    <div className="w-full overflow-y-auto">
      <div className="flex flex-col-reverse xl:flex-row gap-5 px-2 xl:pl-5">
        <div className="sticky xl:w-1/2 flex flex-col gap-4">
          {add.map((ad, index) => {
            return (
              <div
                key={index}
                className="bg-sidpar rounded-md py-2 px-3 flex flex-col gap-2 relative"
              >
                <h1 className="text-accent text-xl">{ad.title}</h1>
                <p>{ad.discrep}</p>
                <div className="flex flex-row items-center text-accent gap-2">
                  <div>{ad.minPrice}</div>
                  <PiArrowFatLeftDuotone />
                  <div>{ad.maxPrice}</div>
                </div>
                <div className="py-1 px-2 text-sm bg-accent absolute top-1 left-1 rounded-md">
                  {ad.display}
                </div>
              </div>
            );
          })}
        </div>
        <div className="xl:w-1/2 flex flex-col gap-3">
          <input
            type="text"
            className="bg-section rounded-md focus:outline-none w-full py-1 px-3"
            placeholder="العنوان"
          />
          <textarea
            name="message"
            id="message"
            className="border bg-section border-none focus:outline-none rounded-md w-full h-40 py-2 px-3"
            placeholder="الوصف"
          />
          <div className="flex gap-3">
            <input
              type="text"
              className="bg-section rounded-md focus:outline-none w-full py-1 px-3"
              placeholder="الحد الأدنى للسعر"
            />
            <input
              type="text"
              className="bg-section rounded-md focus:outline-none w-full py-1 px-3"
              placeholder="الحد الأعلى للسعر"
            />
            <div>
              <select className="bg-secondary text-black xl:text-white rounded-md px-1 h-8 focus:outline-none">
                <option value="sale">للبيع</option>
                <option value="rent">للإيجار</option>
                <option value="mortgage">للرهن</option>
              </select>
            </div>
          </div>
          <button
            type="button"
            className="bg-accent text-white px-4 py-2 rounded hover:scale-110  ease-in duration-300 w-max text-center"
          >
            نشر الطلب
          </button>
        </div>
      </div>
    </div>
  );
}
