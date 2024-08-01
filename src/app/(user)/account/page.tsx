"use client";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { MyProfile } from "@/utils/API";
import { toast } from "react-toastify";
import NotFound from "@/app/not-found";
import UsersLoading from "@/components/loade/UsersLoading";

export default function Acount() {
  const [warning, SetWarning] = useState(false)
  const router = useRouter();
  const token = Cookies.get("authToken") || false;
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
        if (!token) {
          router.replace(`/login?url=account`);
        } else {
          SetWarning(true)

          router.replace("/");
        }
      }
    };
    myData();
    if (warning) {
      toast.warning("حدث خطأ أثناء جلب بيانات حسابك");
    }
  }, [router, token, warning]);

  // const [account, setAccount] = useState("/account");
  // useEffect(() => {
  //   const token = Cookies.get("authToken") || false;
  //   if (!token) {
  //     setAccount("/login?url=account");
  //   }
  // }, []);

  // useEffect(() => {
  //   router.replace(account);
  // }, [account, router]);
  return <UsersLoading />;
}
