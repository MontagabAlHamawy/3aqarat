"use client";
import { UserInfo, house } from "@/components/links";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  PiFacebookLogoDuotone,
  PiInstagramLogoDuotone,
  PiTelegramLogoDuotone,
} from "react-icons/pi";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function Acount() {
  const router = useRouter();
  const [account, setAccount] = useState("/account");
  useEffect(() => {
    const token = Cookies.get("authToken") || false;
    if (!token) {
      setAccount("/login");
    }
  }, []);

  function logout() {
    Cookies.set("authToken", "");
    router.replace('/login')
  }

  useEffect(() => {
    router.replace(account);
  }, [account, router]);
  return (
    <div className="relative">
      <div>
        {UserInfo.map((link, index) => {
          return (
            <div
              key={index}
              className="flex flex-col mt-10 xl:mt-0 xl:flex-row justify-start items-center gap-8"
            >
              <div>
                <Image
                  src={link.image}
                  width={290}
                  height={290}
                  alt="user"
                  className="w-80 h-50 rounded-full"
                />
              </div>
              <div className="flex flex-col justify-center items-start gap-3">
                <h1 className="text-accent text-2xl font-bold">{link.name}</h1>
                <Link href={`tel:${link.phone}`}>{link.phone}</Link>
                <div className="flex flex-row justify-center items-center gap-3">
                  <Link href={link.facebook} className="text-accent text-4xl">
                    {" "}
                    <PiFacebookLogoDuotone />{" "}
                  </Link>
                  <Link href={link.instagram} className="text-accent text-4xl">
                    {" "}
                    <PiInstagramLogoDuotone />{" "}
                  </Link>
                  <Link href={link.telegram} className="text-accent text-3xl">
                    {" "}
                    <PiTelegramLogoDuotone />{" "}
                  </Link>
                </div>
              </div>
              <div className="absolute top-[-70px] xl:top-1 lext-20 xl:left-5 flex flex-row xl:flex-col gap-5">
                <div onClick={() => logout()}>
                  <div className="bg-accent cursor-pointer text-white px-4 py-2 rounded hover:bg-accent-hover  ease-in duration-300">
                    تسجيل الخروج
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div>
        <h1 className="text-2xl mt-10 bg-section xl:mr-[-8px]  rounded-t-md py-2 px-3 w-min">
          عقاراتي
        </h1>
        <div className="grid grid-cols-2 xl:grid-cols-4 bg-section rounded-b-md rounded-tl-md py-10 gap-x-5 gap-y-5 xl:gap-x-10 xl:gap-y-10 w-full px-4 xl:mx-[-8px]">
          {house.map((houss, index) => {
            return (
              <Link
                href={houss.link}
                key={index}
                className="bg-sidpar rounded-xl relative"
              >
                <Image
                  src={houss.img}
                  width={1000}
                  height={0}
                  alt="montagab"
                  className="w-[1080px] rounded-tl-xl rounded-tr-xl"
                />
                <p className="text-lg xl:text-xl text-accent mt-2 px-2 xl:px-5">
                  {houss.title}
                </p>
                <p className="text-white text-sm font-light sm:my-2 px-2 xl:px-5">
                  {houss.discrep}
                </p>
                <div className="flex flex-row justify-between items-center my-3 xl:my-1 mx-5 mb-4">
                  <p>{houss.prise}</p>
                </div>
                <div className="bg-accent text-white text-sm xl:text-lg px-2 py-1 rounded absolute top-2 right-2">
                  {houss.display}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
