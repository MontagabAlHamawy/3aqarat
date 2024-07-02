"use client";
import React from "react";
import dynamic from "next/dynamic";

const MapContainer = dynamic(() => import("./MapsComponent"), {
  ssr: false,
});

export default function Maps({ loc }: any) {
  return <MapContainer loc={loc} />;
}
