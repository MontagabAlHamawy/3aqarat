"use client";
import React, { useState } from "react";
import {
  PiHouse,
  PiUser,
  PiBuildings,
  PiHeart,
  PiBellSimpleThin,
  PiSpeakerHigh,
  PiCaretDoubleLeftBold,
  PiCaretDoubleRightBold,
} from "react-icons/pi";
import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { navData } from "./links.js";




export default function MobileSidpar() {
  const route = usePathname();
  return (
    <div className="fixed bottom-0 left-0 w-full bg-sidpar p-2 flex justify-center items-center z-50">
      <div className="flex flex-row justify-between items-center space-x-4 gap-4">
        {navData.map((link, index) => {
          const isActive = route === link.path;
          return (
            <Link href={link.path} key={index} className={`flex flex-col items-center ${isActive ? 'bg-accent p-3  rounded-full w-16 h-16 mt-[-40px]' : 'text-gray-400'}`}>
              <p className={`text-lg ${isActive ? 'text-white' : 'text-gray-400'}`}>{link.icone}</p>
              <p className={`text-sm ${isActive ? 'text-white' : 'text-gray-400'}`}>{link.name}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

