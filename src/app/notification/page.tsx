import React from "react";
import { nots } from "../components/links";
import Link from "next/link";

export default function Notification() {
  return (
    <div>
      <div className="flex flex-col-reverse xl:flex-row gap-5 px-2 xl:pl-5">
        <div className="w-full grid grid-cols-1 xl:grid-cols-2 gap-x-5 gap-y-5 xl:gap-x-16">
          {nots.map((ad, index) => {
            return (
              <Link
              href={ad.link}
                key={index}
                className="bg-sidpar rounded-md py-2 px-3 flex flex-col gap-2 relative"
              >
                <h1 className="text-accent text-xl">{ad.title}</h1>
                <p>{ad.discrep}</p>
                <p className="text-gray-400 font-thin text-sm">{ad.time}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
