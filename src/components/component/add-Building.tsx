"use client";

import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";
import { PiPlusCircleDuotone } from "react-icons/pi";
import Cookies from "js-cookie";
import Link from "next/link";

export default function AddBuilding() {
  const route = usePathname();
  const [Iam, setIam] = useState<any>(false);
  const [showButtons, setShowButtons] = useState(false);
  const [buttonPosition, setButtonPosition] = useState("bottom-5");

  useEffect(() => {
    const token = Cookies.get("authToken") || false;
    if (token) {
      setIam(true);
    }
  }, [route]);

  const toggleButtons = () => {
    setShowButtons(!showButtons);
  };

  const handleScroll = () => {
    const scrollPosition = window.scrollY + window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    if (documentHeight - scrollPosition >= 10) {
      setButtonPosition("bottom-[60px] xl:bottom-8");
    } else {
      setButtonPosition("bottom-[60px] xl:bottom-16");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClickOutside = (event: MouseEvent) => {
    if (!(event.target as HTMLElement).closest(".add-building-container")) {
      setShowButtons(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setShowButtons(false);
  }, [route]);

  // Check if the current route is "/buildings/add-building"
  const isAddBuildingPage =
    route === "/buildings/add-building" ||
    route === "/buildings/edit-building" ||
    route === "/account/edit-account";

  return (
    <div>
      {Iam && !isAddBuildingPage && (
        <div
          className={`fixed ${buttonPosition} left-0 xl:left-3 p-3 z-50 add-building-container`}
        >
          <div className="relative">
            <div
              className={` ${
                showButtons
                  ? "bg-sidpar border-white border-solid border-2"
                  : "bg-accent border-accent border-solid border-2"
              }  cursor-pointer text-3xl  rounded-md p-3`}
              onClick={toggleButtons}
            >
              <PiPlusCircleDuotone />
            </div>
            {showButtons && (
              <div className="absolute bottom-full left-0 flex flex-col justify-end items-end space-y-2 mb-2">
                <button className="p-2 text-sm  bg-accent hover:bg-accent-hover text-white w-max rounded shadow">
                  <Link href="/buildings/add-building?url=apartment">
                    إضافة شقة
                  </Link>
                </button>
                <button className="p-2 text-sm bg-accent hover:bg-accent-hover text-white w-max rounded shadow">
                  <Link href="/buildings/add-building?url=building">
                    إضافة محضر
                  </Link>
                </button>
                <button className="p-2 text-sm bg-accent hover:bg-accent-hover text-white w-max rounded shadow">
                  <Link href="/buildings/add-building?url=house">
                    إضافة منزل
                  </Link>
                </button>
                <button className="p-2 text-sm bg-accent hover:bg-accent-hover text-white w-max rounded shadow">
                  <Link href="/buildings/add-building?url=commercial">
                    إضافة محل
                  </Link>
                </button>
                <button className="p-2 text-sm bg-accent hover:bg-accent-hover text-white w-max rounded shadow">
                  <Link href="/buildings/add-building?url=land">إضافة أرض</Link>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
