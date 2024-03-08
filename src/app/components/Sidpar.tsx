"use client";
import React, { useState } from "react";
import { PiCaretDoubleLeftBold, PiCaretDoubleRightBold } from "react-icons/pi";
import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { navData } from "./links.js";

function Sidpar() {
  const route = usePathname();
  const [sidebarWidth, setSidebarWidth] = useState(16);

  const toggleSidebar = () => {
    setSidebarWidth(sidebarWidth === 16 ? 100 : 16);
  };

  return (
    <div
      className={`flex flex-col  justify-center xl:justify-start gap-y-4 top-0 fixed h-max bg-transparent xl:bg-sidpar z-50 w-full xl:h-[100vh]
      ${
        sidebarWidth === 16
          ? "items-center xl:w-16"
          : "items-start xl:w-[250px]"
      } transition-all`}
    >
      <div
        className={`absolute transition-all top-[50%] bg-sidpar py-6 px-3 rounded-tl-2xl rounded-bl-2xl text-white text-xl cursor-pointer
      ${sidebarWidth === 16 ? "right-16" : "right-[250px]"}`}
        onClick={toggleSidebar}
      >
        {sidebarWidth === 16 ? (
          <PiCaretDoubleLeftBold />
        ) : (
          <PiCaretDoubleRightBold />
        )}
      </div>
      <div
        className={`w-full
      ${sidebarWidth === 16 ? "px-1 " : "px-2"}
      `}
      >
        <Link
          href="/"
          className={`bg-body rounded-xl mt-8 mb-[-5px] cursor-pointer flex flex-row items-center  gap-x-3 w-full
        ${sidebarWidth === 16 ? "justify-center" : "justify-start"}
      `}
        >
          <Image
            width={200}
            height={200}
            alt="icon"
            src="/3aqarat1.png"
            className="w-10 h-10 m-2"
          />
          <p
            className={`text-2xl text-accent
          ${sidebarWidth === 16 ? "hidden" : "block"}
          `}
          >
            3aqarat
          </p>
        </Link>
      </div>
      <div
        className={`h-[2px] w-14 bg-white/20 rounded-full mb-[-35px] ${
          sidebarWidth === 16 ? "w-14" : "w-56 mr-3"
        }`}
      ></div>

      <motion.div
        className={`flex w-full xl:flex-col   justify-between bg-sidpar xl:bg-transparent  gap-y-1 px-4 md:px-40 xl:px-0 h-[70px] xl:h-max py-8 text-3xl xl:text-md rounded-tl-xl rounded-tr-xl xl:rounded-full ${
          sidebarWidth === 16 ? "items-center " : "items-start"
        }`}
      >
        {navData.map((link, index) => {
          const isActive = route === link.path;

          return (
            <Link
              key={index}
              href={link.path}
              className=" flex gap-x-5 group hover:text-white w-full justify-center items-center"
            >
              {sidebarWidth === 16 ? (
                <div>
                  <div className="absolute transition-all pr-[75px] right-0 hidden xl:group-hover:flex w-max">
                    <div className="bg-icone backdrop-blur-3xl hidden relative mt-[14px] xl:flex text-white items-center p-[6px] rounded-[6px]">
                      <div className="text-[15px] leading-none hidden xl:block font-semibold capitalize ">
                        {link.name}
                      </div>
                      <div className="border-solid hidden xl:block border-l-icone border-l-8 border-y-transparent border-y-[6px] absolute -right-2"></div>
                    </div>
                  </div>
                  <nav
                    className={`${
                      isActive
                        ? "text-white mb-[100%] xl:mb-0 bg-body text-2xl xl:text-2xl "
                        : "text-icone mb-0 xl:mb-0 bg-transparent text-2xl xl:text-2xl group-hover:bg-body group-hover:text-white"
                    } rounded-xl p-5 xl:p-4 cursor-pointer transition-all w-full`}
                  >
                    {link.icone}
                  </nav>
                </div>
              ) : (
                <div
                  className={`${
                    isActive
                      ? "text-white mb-[100%] xl:mb-0 bg-body text-2xl xl:text-2xl "
                      : "text-icone mb-0 xl:mb-0 bg-transparent text-2xl xl:text-2xl group-hover:bg-body group-hover:text-white"
                  } rounded-xl p-5 xl:p-4 cursor-pointer transition-all mx-2 flex justify-start w-full items-start gap-x-5 `}
                >
                  <nav className="mt-1">{link.icone}</nav>
                  <p
                    className={`${
                      isActive
                        ? "text-white text-2xl xl:text-lg "
                        : "text-text text-2xl xl:text-lg  group-hover:text-white"
                    }`}
                  >
                    {link.name}
                  </p>
                </div>
              )}
            </Link>
          );
        })}
      </motion.div>
    </div>
  );
}

export default Sidpar;
