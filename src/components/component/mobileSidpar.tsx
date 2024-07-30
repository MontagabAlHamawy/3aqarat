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
import { RefreshToken } from "@/utils/API";

export default function MobileSidpar() {

  const [accountName, setAccountNam] = useState("حسابي");
  const route = usePathname();
  const [account, setAccount] = useState("/login");
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
    { name: "المفضلة", path: "/love", icone: <PiHeartDuotone /> },
    { name: "مطلوب", path: "/requests", icone: <PiMegaphoneDuotone /> },
  ];
  if (Cookies.get("authToken") === undefined && Cookies.get("refreshToken") !== undefined) {
    RefreshToken();
  }
  return (
    <div className="fixed transition delay-0 bottom-0 left-[-1px] w-full bg-sidpar py-3  flex justify-center items-center z-50">
      <div className="flex transition delay-0 flex-row justify-center w-full items-center gap-5 md:gap-20 ">
        {MobData.map((link, index) => {
          let isActive = route === link.path;

          if (route !== "/" && route.startsWith(link.path)) {
            if (link.path !== "/") {
              isActive = true;
            }
          } else if (route === "/signup" && link.name === "تسجيل") {
            isActive = true;
          }

          return (
            <Link
              href={link.path}
              key={index}
              className={`flex flex-col items-center ${isActive
                  ? "bg-accent  p-1 rounded-full w-20 h-20 mt-[-40px] border-[13px] transition delay-0 border-sidpar"
                  : "text-gray-400"
                }`}
            >
              <p
                className={`text-lg ${isActive ? "text-white" : "text-gray-400"
                  }`}
              >
                {link.icone}
              </p>
              <p
                className={`text-sm ${isActive ? "text-white" : "text-gray-400"
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
