"use client";
// pages/login.js
import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import apiUrl from "../../../utils/apiConfig";
import { PiEyeThin, PiEyeSlashThin } from "react-icons/pi";
import Image from "next/image";

const Login = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${apiUrl}/login`, {
        usernameOrEmail,
        password,
      });

      console.log("تم تسجيل الدخول بنجاح!", response.data);
    } catch (error) {
      setError("فشل تسجيل الدخول. يرجى التحقق من المعلومات المدخلة.");
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

            <div className="mb-4 relative">
              <label className="block text-white font-semibold text-sm mb-2">
                كلمة المرور:
              </label>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border p-2 pr-10 rounded-lg bg-section border-section text-white"
              />
              <span
                onClick={toggleShowPassword}
                className="absolute top-12 text-accent  left-2 transform -translate-y-1/2 cursor-pointer text-2xl"
              >
                {showPassword ? <PiEyeSlashThin /> : <PiEyeThin />}
              </span>
            </div>

            <button
              type="button"
              onClick={handleLogin}
              className="bg-accent text-white px-4 py-2 rounded hover:scale-110  ease-in duration-300"
            >
              تسجيل الدخول
            </button>
          </form>

         <div className="flex flex-row justify-between items-center gap-3">
         <Link href="/signup">
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
};

export default Login;
