"use client";
import React from "react";
import Link from "next/link";

import { usePathname } from "next/navigation";
import { MobData } from "./links.js";

export default function MobileSidpar() {
  const route = usePathname();
  return (
    <div className="fixed bottom-0 left-0 w-full bg-sidpar py-3 pr-6 flex justify-center items-center z-50">
      <div className="flex flex-row justify-center items-center space-x-4 gap-2 md:gap-20">
        {MobData.map((link, index) => {
           let isActive = route === link.path; // Default isActive value

           if (route !== "/" && route.startsWith(link.path)) {
             // If the route is not homepage and starts with link.path
             if (link.path !== "/") {
               // If link.path is not the homepage
               isActive = true;
             }
           }
          
          return (
            <Link
              href={link.path}
              key={index}
              className={`flex flex-col items-center ${
                isActive
                  ? "bg-accent p-2  rounded-full w-16 h-16 mt-[-40px]"
                  : "text-gray-400"
              }`}
            >
              <p
                className={`text-lg ${
                  isActive ? "text-white" : "text-gray-400"
                }`}
              >
                {link.icone}
              </p>
              <p
                className={`text-sm ${
                  isActive ? "text-white" : "text-gray-400"
                }`}
              >
                {link.name}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
