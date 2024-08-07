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
  const [buttonPosition, setButtonPosition] = useState("bottom-[60px] xl:bottom-8");

  useEffect(() => {
    const token = Cookies.get("authToken") || false;
    if (token) {
      setIam(true);
    }
  }, [route]);

  const toggleButtons = () => {
    setShowButtons(!showButtons);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleScroll = () => {
    const scrollPosition = window.scrollY + window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    if (documentHeight - scrollPosition >= 10) {
      if (route === "/requests") {
        setButtonPosition("bottom-[80px] xl:bottom-8");
      } else {
        setButtonPosition("bottom-[60px] xl:bottom-8");
      }
    } else {
      if (route === "/requests") {
        setButtonPosition("bottom-[80px] xl:bottom-16");
      } else {
        setButtonPosition("bottom-[60px] xl:bottom-16");
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

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
    route === "/propertys/add-property" ||
    route === "/propertys/edit-property" ||
    route === "/account/edit-account";

  return (
    <div>
      {Iam && !isAddBuildingPage && (
        <div
          className={`fixed ${buttonPosition} left-0 xl:left-3 p-3 z-50 add-building-container`}
        >
          <div className="relative">
            <div
              className={` ${showButtons
                ? "bg-section   border-body "
                : "bg-accent border-accent"
                }  cursor-pointer border text-2xl xl:text-3xl rounded-md p-3`}
              onClick={toggleButtons}
            >
              <PiPlusCircleDuotone />
            </div>
            {showButtons && (
              <div className="absolute bottom-full left-0 flex flex-col justify-end items-end space-y-2 mb-2">
                <button className="p-2 text-sm  bg-accent hover:bg-accent-hover text-white w-max rounded shadow">
                  <Link href="/propertys/add-property?url=apartment">
                    إضافة شقة
                  </Link>
                </button>
                <button className="p-2 text-sm bg-accent hover:bg-accent-hover text-white w-max rounded shadow">
                  <Link href="/propertys/add-property?url=building">
                    إضافة محضر
                  </Link>
                </button>
                <button className="p-2 text-sm bg-accent hover:bg-accent-hover text-white w-max rounded shadow">
                  <Link href="/propertys/add-property?url=house">
                    إضافة منزل
                  </Link>
                </button>
                <button className="p-2 text-sm bg-accent hover:bg-accent-hover text-white w-max rounded shadow">
                  <Link href="/propertys/add-property?url=commercialproperty">
                    إضافة محل
                  </Link>
                </button>
                <button className="p-2 text-sm bg-accent hover:bg-accent-hover text-white w-max rounded shadow">
                  <Link href="/propertys/add-property?url=land">إضافة أرض</Link>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
