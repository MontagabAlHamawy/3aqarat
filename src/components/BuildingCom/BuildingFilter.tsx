"use client";
import React, { useState } from "react";
import { hom } from "../links";
import Link from "next/link";

export default function BuildingFilter({ linked }: any) {

  return (
    <div className="grid grid-cols-3 mt-7 md:grid-cols-6 xl:grid-cols-6 gap-x-2 gap-y-5 md:gap-x-3 xl:gap-x-10 xl:mb-6">
      {hom.map((link, index) => (
        <Link
          href={link.link}
          key={index}
          className={`py-1 px-3 text-md w-full text-white rounded-xl flex justify-center items-center cursor-pointer ${
            linked === link.link ? "bg-accent" : "bg-sidpar"
          }`}
        >
          <p className="text-white text-sm md:text-base xl:text-lg">
            {link.name}
          </p>
        </Link>
      ))}
    </div>
  );
}
