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
  PiArticleDuotone 
} from "react-icons/pi";

export default function MobileSidpar() {
  const [accountName, setAccountNam] = useState("حسابي");
  const route = usePathname();
  const [account, setAccount] = useState("");
  useEffect(() => {
    const token = Cookies.get("authToken") || false;
    if (!token) {
      setAccount("/login");
      setAccountNam("تسجيل");
    } else {
      setAccount("/account");
      setAccountNam("حسابي");
    }
  }, [route]);
  const MobData = [
    { name: accountName, path: account, icone: <PiUserDuotone /> },
    { name: "العقارات", path: "/buildings", icone: <PiBuildingsDuotone /> },
    { name: "الرئيسية", path: "/", icone: <PiHouseDuotone /> },
    { name: "المدونة", path: "/blog", icone: <PiArticleDuotone /> },
    { name: "المفضلة", path: "/love", icone: <PiHeartDuotone /> },
    { name: "مطلوب", path: "/requests", icone: <PiMegaphoneDuotone /> },
  ];
  return (
    <div className="fixed bottom-0 left-[-1px] w-full bg-sidpar py-3  flex justify-center items-center z-50">
      <div className="flex flex-row justify-center w-full items-center gap-3 ">
        {MobData.map((link, index) => {
          let isActive = route === link.path;

          if (route !== "/" && route.startsWith(link.path)) {
            if (link.path !== "/") {
              isActive = true;
            }
          }
          if (route === "/signup" && link.name === "تسجيل") {
            isActive = true;
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
