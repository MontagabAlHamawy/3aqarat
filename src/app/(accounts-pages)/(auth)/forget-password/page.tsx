"use client";
// pages/login.js
import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import apiUrl from "../../../utils/apiConfig";
import Image from "next/image";

const ForgetPassword = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${apiUrl}/login`, {
        usernameOrEmail,
      });

      console.log("تم تسجيل الدخول بنجاح!", response.data);
    } catch (error) {
      setError("اسم المستخدم أو البريد الإلكتروني غير صحيح");
    }
  };

  return (
    <div>
      <div>
        <h1 className="text-3xl text-accent text-center xl:text-right font-bold mb-9">
          استعادة كلمة المرور
        </h1>
      </div>
      <div className="flex flex-col xl:flex-row-reverse xl:px-20 items-center justify-start xl:justify-center">
        {/* القسم الأول: الصورة */}
        <div className="xl:w-1/2 xl:pr-8 mb-4 xl:mb-0">
          <Image
            width={400}
            height={0}
            src="/login/login.png" // قم بتعيين مسار الصورة الخاصة بك هنا
            alt="صورة تسجيل الدخول"
            className="w-[400px] h-auto"
          />
        </div>

        {/* القسم الثاني: الفورم */}
        <div className="xl:pl-20 w-full max-w-md px-10 xl:px-0">
          {error && <p className="text-red-500 w-100 mb-4">{error}</p>}

          <form className="w-full xl:max-w-md ">
            <div className="mb-4">
              <label className="block text-white font-semibold text-sm mb-2">
                اسم المستخدم أو البريد الإلكتروني:
              </label>
              <input
                type="text"
                value={usernameOrEmail}
                onChange={(e) => setUsernameOrEmail(e.target.value)}
                className="w-full border p-2 rounded-lg bg-section border-section text-white"
              />
            </div>

            <button
              type="button"
              onClick={handleLogin}
              className="bg-accent text-white px-4 py-2 rounded hover:scale-110  ease-in duration-300"
            >
              استعادة كلمة المرور
            </button>
          </form>

          <div className="flex flex-row justify-between items-center gap-3">
            <Link href="/login">
              <p className="mt-4 mb-5 xl:mb-0 cursor-pointer text-accent">
                تسجيل الدخول
              </p>
            </Link>
            <Link href="/signup">
              <p className="mt-4 mb-5 xl:mb-0 cursor-pointer text-accent">
                تسجيل مستخدم جديد
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
