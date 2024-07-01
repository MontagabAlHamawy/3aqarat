"use client";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { MyProfile } from "@/utils/API";
import { toast } from "react-toastify";
import NotFound from "@/app/not-found";
import { PiUserDuotone } from "react-icons/pi";

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
    <div className="mx-2 my-5 ml-2 xl:ml-0 xl:mx-0">
      <div className="bg-sidpar flex flex-col gap-5 justify-center items-center h-max py-10 rounded-md">
        <div className="text-[90px]">
          <PiUserDuotone />
        </div>
        <h1 className="text-2xl">جاري جلب معلومات المستخدم...</h1>
      </div>
    </div>
  );
}
