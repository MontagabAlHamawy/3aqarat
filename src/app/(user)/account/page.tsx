"use client";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { MyProfile } from "@/utils/API";
import { toast } from "react-toastify";
import NotFound from "@/app/not-found";
import UsersLoading from "@/components/loade/UsersLoading";

export default function Acount() {
  const router = useRouter();
  const [account, setAccount] = useState("/account");
  useEffect(() => {
    const myData = async () => {
      try {
        const response = await MyProfile();
        const token = Cookies.get("authToken") || false;
        if (!response) {
          toast.error("تحقق من اسم المستخدم");
          NotFound();
          return;
        } else {
          if (!token) {
            setAccount("/login?url=account");
          } else {
            router.replace(`/account/${response.username}`);
          }
        }
      } catch (error) {
        toast.error("حدث خطأ أثناء جلب البيانات");
        console.error("error:", error);
      }
    };
    myData();
  }, []);

  useEffect(() => {
    router.replace(account);
  }, [account, router]);
  return <UsersLoading />;
}
