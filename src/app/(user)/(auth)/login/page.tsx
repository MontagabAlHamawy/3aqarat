"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PiEyeDuotone, PiEyeSlashDuotone } from "react-icons/pi";
import Image from "next/image";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { LoginApi } from "@/utils/API";
import Cookies from "js-cookie";

export default function Login(props: any) {
  const router = useRouter();
  const [emus, setEmus] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [account, setAccount] = useState("/account");

  let url = `/signup`;
  if (props.searchParams.url === undefined) {
    url = `/signup`;
  } else {
    url = `/signup?url=${props.searchParams.url}`;
  }

  useEffect(() => {
    const token = Cookies.get("authToken") || false;
    if (!token) {
      if (props.searchParams.url === undefined) {
        setAccount(`/login`);
        // eslint-disable-next-line react-hooks/exhaustive-deps
        url = "/signup";
      } else {
        setAccount(`/login?url=${props.searchParams.url}`);
        url = `/signup?url=${props.searchParams.url}`;
      }
    }
  }, []);

  useEffect(() => {
    router.replace(account);
  }, [account, router]);

  let email: string | null = null;
  let username: string | null = null;

  const isEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  if (isEmail(emus)) {
    email = emus;
  } else {
    username = emus;
  }

  const handleLogin = async (event: any) => {
    event.preventDefault();
    if (emus === "" || password === "") {
      toast.warning("يرجى ملئ الحقول");
    } else {
      try {
        await LoginApi(username, email, password);
        if (props.searchParams.url === undefined) {
          router.replace("/account");
        } else {
          router.replace(`/${props.searchParams.url}`);
        }
        toast.success("تم تسجيل الدخول بنجاح");
      } catch (error: any) {
        toast.error("فشل تسجيل الدخول");
        toast.error("تحقق من اسم المستخدم او كلمة المرور");
      }
    }
  };

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div>
      <div>
        <h1 className="text-3xl text-accent text-center xl:text-right font-bold mb-9">
          تسجيل الدخول
        </h1>
      </div>
      <div className="flex flex-col xl:flex-row-reverse xl:px-20 items-center justify-start xl:justify-center">
        <div className="xl:w-1/2 xl:pr-8 mb-4 xl:mb-0">
          <Image
            width={600}
            height={0}
            src="/login/login.png"
            alt="صورة تسجيل الدخول"
            className="w-[600px] h-auto"
          />
        </div>
        <div className="xl:pl-20 w-full max-w-md px-10 xl:px-0">
          <form className="w-full xl:max-w-md " onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-white font-semibold text-sm mb-2">
                اسم المستخدم أو البريد الإلكتروني:
              </label>
              <input
                type="text"
                placeholder="Email or Username"
                value={emus}
                onChange={(e) => setEmus(e.target.value)}
                className="w-full border p-2 rounded-lg bg-section border-section text-white"
              />
            </div>

            <div className="mb-4 relative">
              <label className="block text-white font-semibold text-sm mb-2">
                كلمة المرور:
              </label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border p-2 rounded-lg bg-section border-section text-white"
              />
              <span
                onClick={toggleShowPassword}
                className="absolute top-12 text-accent  left-2 transform -translate-y-1/2 cursor-pointer text-2xl"
              >
                {showPassword ? <PiEyeSlashDuotone /> : <PiEyeDuotone />}
              </span>
            </div>

            <button
              type="submit"
              className="bg-accent text-white px-4 py-2 rounded hover:bg-accent-hover  ease-in duration-300"
            >
              تسجيل الدخول
            </button>
          </form>

          <div className="flex flex-row justify-between items-center gap-3">
            <Link href={url}>
              <p className="mt-4 mb-5 xl:mb-0 cursor-pointer text-accent">
                تسجيل مستخدم جديد
              </p>
            </Link>
            <Link href="/forget-password">
              <p className="mt-4 mb-5 xl:mb-0 cursor-pointer text-accent">
                نسيت كلمة المرور
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
