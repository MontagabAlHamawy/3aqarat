"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Cookies from "js-cookie";
import {
  PiBuildingsDuotone,
  PiHeartDuotone,
  PiHouseDuotone,
  PiMegaphoneDuotone,
  PiUserDuotone,
} from "react-icons/pi";

export default function MobileSidpar() {
  const [accountName, setAccountNam] = useState("حسابي");
  const route = usePathname();
  const [account, setAccount] = useState("");
  useEffect(() => {
    const token = Cookies.get("authToken") || false;
    if (!token) {
      setAccount("login");
      setAccountNam('تسجيل');
    } else {
      setAccount("account");
      setAccountNam('حسابي');
    }
  }, [route]);
  const MobData = [
    { name: accountName, path: account, icone: <PiUserDuotone /> },
    { name: "العقارات", path: "/buildings", icone: <PiBuildingsDuotone /> },
    { name: "الرئيسية", path: "/", icone: <PiHouseDuotone /> },
    { name: "المفضلة", path: "/love", icone: <PiHeartDuotone /> },
    { name: "مطلوب", path: "/requests", icone: <PiMegaphoneDuotone /> },
  ];
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
