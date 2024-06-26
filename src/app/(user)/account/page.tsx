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
import { MyProfile } from "@/utils/API";
import { toast } from "react-toastify";
import NotFound from "@/app/not-found";

export default function Acount() {
  useEffect(() => {
    const myData = async () => {
      try {
        const response = await MyProfile();
        router.replace(`/account/${response.username}`);
        if (!response) {
          toast.error("kkk");
          NotFound();
          return;
        }
      } catch (error) {
        toast.error("حدث خطأ أثناء جلب البيانات");
        console.error("error:", error);
      }
    };
    myData();
  }, []);

  const router = useRouter();
  const [account, setAccount] = useState("/account");
  useEffect(() => {
    const token = Cookies.get("authToken") || false;
    if (!token) {
      setAccount("/login");
    }
  }, []);

  

  useEffect(() => {
    router.replace(account);
  }, [account, router]);
  return (
    <div className="mx-2 mt-5 h-full xl:mx-0 xl:ml-3">
      <div className="bg-sidpar h-[50vh] flex justify-center items-center xl:h-40 rounded-md">
        <h1 className="text-2xl">...Loading</h1>
      </div>
    </div>
  );
}
