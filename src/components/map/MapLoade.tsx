"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Map from "./map";

const Maps = dynamic(() => import("./maps"), {
  ssr: false,
});

export default function MapLoade({ building }: any) {
  const [mapLoaded, setMapLoaded] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setMapLoaded(true);
    }, 200);

    return () => clearTimeout(timer);
  }, []);
  const [locationX, setLocationX] = useState<string | null>(null);
  const [locationY, setLocationY] = useState<string | null>(null);

  useEffect(() => {
    if (building[0]) {
      const [x, y] = building[0].split(", ");
      if (x === "x" || y === "y") {
        setLocationX("34.69498");
        setLocationY("36.7237");
      } else {
        setLocationX(x);
        setLocationY(y);
      }
    }
  }, [building]);

  if (!locationX || !locationY) {
    return (
      <div className="mx-2xl:mx-0 xl:ml-3 w-full">
        <div className="bg-sidpar flex justify-center items-center h-20 xl:h-40 rounded-md">
          <h1 className="text-2xl">جاري تحميل الخلريطة ...</h1>
        </div>
      </div>
    );
  }

  let loc = [
    locationX,
    locationY,
    building[1],
    building[2],
    building[3],
    building[4],
    building[5],
  ];
  return <Maps loc={loc} />;
}
