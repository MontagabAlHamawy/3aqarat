"use client";

import React, { useEffect, useState } from "react";
import Maps from "./maps";

export default function MapLoade({ building }: any) {
  //   console.log(building);

  const [mapLoaded, setMapLoaded] = useState(false);
  useEffect(() => {
    // Simulate map loading completion after 2 seconds (replace with actual map load event)
    const timer = setTimeout(() => {
      setMapLoaded(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);
  const [locationX, setLocationX] = useState<string | null>(null);
  const [locationY, setLocationY] = useState<string | null>(null);

  useEffect(() => {
    if (building[0]) {
      const [x, y] = building[0].split(", ");
      setLocationX(x);
      setLocationY(y);
    }
  }, [building]);

  if (!locationX || !locationY || locationX === "x" || locationY === "y") {
    // return <p>... Loading map</p>;
    setLocationX("34.69498")
    setLocationY("36.7237")
    // locationY = 36.7237;

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
  return (
    // <></>
    <Maps loc={loc} />
  );
}
