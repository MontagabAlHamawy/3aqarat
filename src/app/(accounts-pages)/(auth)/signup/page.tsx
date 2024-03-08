// pages/register.js
"use client"; // pages/register.js
// pages/register.js
// pages/register.js
import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import apiUrl from "../../../utils/apiConfig";
import { PiEyeThin, PiEyeSlashThin } from "react-icons/pi";
import Image from "next/image";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async () => {
    try {
      if (password !== confirmPassword) {
        setError("حقل كلمة المرور وتأكيد كلمة المرور غير متطابقين.");
        return;
      }

      const response = await axios.post(`${apiUrl}/register`, {
        username,
        email,
        password,
        confirmPassword,
      });

      console.log("تم تسجيل المستخدم بنجاح!", response.data);
    } catch (error) {
      setError("فشل تسجيل المستخدم. يرجى التحقق من المعلومات المدخلة.");
    }
  };

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(
      (prevShowConfirmPassword) => !prevShowConfirmPassword
    );
  };

  return (
    <div>
      <div>
        <h1 className="text-3xl text-center text-accent xl:text-right font-bold mb-9">تسجيل مستخدم جديد</h1>
      </div>
      <div className="flex flex-col xl:flex-row-reverse xl:px-20 items-center justify-center">
        {/* القسم الأول: الصورة */}
        <div className="xl:w-1/2 xl:pr-8 mb-4 xl:mb-0">
        <Image
          width={400}
          height={0}
            src="/sinup/signup.png" // قم بتعيين مسار الصورة الخاصة بك هنا
            alt="صورة تسجيل الدخول"
            className="w-[400px] h-auto"
          />
        </div>

        {/* القسم الثاني: الفورم */}
        <div className=" xl:pl-20 w-full max-w-md px-10 xl:px-0">
          {error && <p className="text-red-500 w-100 mb-4">{error}</p>}

          <form className="w-full max-w-md">
            <div className="mb-4">
              <label className="block text-white text-sm font-semibold mb-2">
                اسم المستخدم:
              </label>
              <input
                type="text"
                value={username}
                required={true}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full border p-2 rounded-lg bg-section border-section text-white"
              />
            </div>

            <div className="mb-4">
              <label className="block text-white text-sm font-semibold mb-2">
                البريد الإلكتروني:
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border p-2 rounded-lg bg-section border-section text-white"
              />
            </div>

            <div className="mb-4 relative">
              <label className="block text-white text-sm font-semibold mb-2">
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
                className="absolute top-12 text-2xl left-2 transform -translate-y-1/2 cursor-pointer text-accent"
              >
                {showPassword ? <PiEyeSlashThin /> : <PiEyeThin />}
              </span>
            </div>

            <div className="mb-4 relative ">
              <label className="block text-white text-sm font-semibold mb-2">
                تأكيد كلمة المرور:
              </label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full border p-2 pr-10 flex rounded-lg bg-section border-section text-white  border-section"
              />
              <span
                onClick={toggleShowConfirmPassword}
                className="absolute top-12 left-2 transform -translate-y-1/2 cursor-pointer text-2xl text-accent"
              >
                {showConfirmPassword ? <PiEyeSlashThin /> : <PiEyeThin />}
              </span>
            </div>

            <button
              type="button"
              onClick={handleRegister}
              className="bg-accent text-white px-4 py-2 rounded hover:scale-110  ease-in duration-300"
            >
              تسجيل مستخدم جديد
            </button>
          </form>

          <Link href="/login">
            <p className="mt-4 mb-5 xl:mb-0 cursor-pointer text-accent">
              تسجيل الدخول
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
