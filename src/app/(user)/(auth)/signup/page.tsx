"use client";
import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import apiUrl from "../../../../utils/apiConfig";
import { PiEyeDuotone, PiEyeSlashDuotone } from "react-icons/pi";
import Image from "next/image";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { SignUpApi } from "@/utils/API";

const SignUp = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleRegister = async () => {
    if (
      username === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === "" ||
      first_name === "" ||
      last_name === ""
    ) {
      toast.warning("يرجى ملئ الحقول");
    } else {
      try {
        if (password !== confirmPassword) {
          toast.error("حقل كلمة المرور وتأكيد كلمة المرور غير متطابقين");
          return;
        }
        await SignUpApi(email, first_name, last_name, username, password);
        router.replace("/");
        toast.success("تم تسجيل المستخدم بنجاح");
      } catch (error) {
        toast.error("فشل تسجيل المستخدم");
      }
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
        <h1 className="text-3xl text-center text-accent xl:text-right font-bold mb-9">
          تسجيل مستخدم جديد
        </h1>
      </div>
      <div className="flex flex-col xl:flex-row-reverse xl:px-20 items-center justify-center">
        {/* القسم الأول: الصورة */}
        <div className="xl:w-1/2 xl:pr-8 mb-4 xl:mb-0">
          <Image
            width={600}
            height={0}
            src="/login/login.png"
            alt="صورة تسجيل الدخول"
            className="w-[600px] h-auto"
          />
        </div>

        {/* القسم الثاني: الفورم */}
        <div className=" xl:pl-20 w-full max-w-md px-10 xl:px-0">
          <form className="w-full max-w-md" onSubmit={handleRegister}>
            <div className="mb-4">
              <label className="block text-white text-sm font-semibold mb-2">
                اسم المستخدم:
              </label>
              <input
                type="text"
                placeholder="Username"
                value={username}
                required={true}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full border p-2 rounded-lg bg-section border-section text-white"
              />
            </div>
            <div className="flex justify-center items-center flex-row gap-3 mb-4">
              <div>
                {" "}
                <label className="block text-white text-sm font-semibold mb-2">
                  الاسم الأول:
                </label>
                <input
                  type="text"
                  placeholder="(En) First Name"
                  value={first_name}
                  required={true}
                  onChange={(e) => setFirst_name(e.target.value)}
                  className="w-full border p-2 rounded-lg bg-section text-base border-section text-white"
                />
              </div>
              <div>
                {" "}
                <label className="block text-white text-sm font-semibold mb-2">
                  الاسم الأخير:
                </label>
                <input
                  type="text"
                  placeholder="(En) Last Name"
                  value={last_name}
                  required={true}
                  onChange={(e) => setLast_name(e.target.value)}
                  className="w-full border p-2 rounded-lg bg-section border-section text-white"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-white text-sm font-semibold mb-2">
                البريد الإلكتروني:
              </label>
              <input
                type="email"
                placeholder="Email"
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
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border p-2  rounded-lg bg-section border-section text-white"
              />
              <span
                onClick={toggleShowPassword}
                className="absolute top-12 text-2xl left-2 transform -translate-y-1/2 cursor-pointer text-accent"
              >
                {showPassword ? <PiEyeSlashDuotone /> : <PiEyeDuotone />}
              </span>
            </div>

            <div className="mb-4 relative ">
              <label className="block text-white text-sm font-semibold mb-2">
                تأكيد كلمة المرور:
              </label>
              <input
                placeholder="Confirm Password"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full border p-2  flex rounded-lg bg-section text-white  border-section"
              />
              <span
                onClick={toggleShowConfirmPassword}
                className="absolute top-12 left-2 transform -translate-y-1/2 cursor-pointer text-2xl text-accent"
              >
                {showConfirmPassword ? <PiEyeSlashDuotone /> : <PiEyeDuotone />}
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
