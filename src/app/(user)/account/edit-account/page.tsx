"use client";
import { GetToken, MyProfile, userInfo } from "@/utils/API";
import apiUrl from "@/utils/apiConfig";
import Image from "next/image";
import { useRouter } from "next/navigation"; // import useRouter for navigation
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

export default function EditAccount() {
  useEffect(() => {
    const token = Cookies.get("authToken") || false;
    if (!token) {
      router.replace("/login");
    }
  }, []);

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const updateUserProfile = async () => {
    const url = `${apiUrl}/profile/me/`;

    try {
      let token = GetToken();
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          'Authorization': `JWT ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }

      await response.json();
    } catch (error) {
      toast.error("Error");
    } finally {
      setLoading(false);
    }
  };

  const [formData, setFormData] = useState({
    email: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    facebook_account: "",
    instagram_account: "",
    telegram_account: "",
  });
  const data = {
    facebook_account: formData.facebook_account,
    first_name: formData.first_name,
    instagram_account: formData.instagram_account,
    last_name: formData.last_name,
    phone_number: formData.phone_number,
    telegram_account: formData.telegram_account,
  };

  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await MyProfile();
        const response = await userInfo();
        setUser(response.email);
        setFormData({
          email: response.email,
          first_name: data.first_name,
          last_name: data.last_name,
          phone_number: data.phone_number,
          facebook_account: data.facebook_account,
          instagram_account: data.instagram_account,
          telegram_account: data.telegram_account,
        });
      } catch (error) {
        console.error("Error fetching profile:", error);
      }finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await updateUserProfile();
      toast.success("تم تعديل المعلومات بنجاح");
      router.push("/account");
    } catch (error) {}
  };
  if (loading) {
    return (
      <div className="mx-2 mt-5 xl:mx-0 xl:ml-3">
        <div className="bg-sidpar flex justify-center items-center h-20 xl:h-40 rounded-md">
          <h1 className="text-2xl">جاري جلب البيانات...</h1>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div>
        <h1 className="text-3xl text-accent text-center xl:text-right font-bold mb-9">
          تعديل معلومات الحساب
        </h1>
      </div>
      <div className="flex flex-col xl:flex-row-reverse xl:px-20 items-center justify-start xl:justify-center">
        <div className="xl:w-1/2 xl:pr-8 mb-4 xl:mb-0">
          <Image
            width={600}
            height={0}
            src="/login/edit-account.png"
            alt="صورة تسجيل الدخول"
            className="w-[600px] h-auto"
          />
        </div>
        <div className="xl:pl-20 w-full max-w-md px-10 xl:px-0">
          <form className="w-full xl:max-w-md" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-white font-semibold text-sm mb-2">
                البريد الإلكتروني:
              </label>
              <input
                type="text"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required={true}
                className="w-full border p-2 rounded-lg bg-section text-base border-section text-white"
              />
            </div>
            <div className="flex justify-center items-center flex-row gap-3 mb-4">
              <div>
                <label className="block text-white text-sm font-semibold mb-2">
                  الاسم الأول:
                </label>
                <input
                  type="text"
                  name="first_name"
                  placeholder="First Name (En)"
                  value={formData.first_name}
                  onChange={handleChange}
                  required={true}
                  className="w-full border p-2 rounded-lg bg-section text-base border-section text-white"
                />
              </div>
              <div>
                <label className="block text-white text-sm font-semibold mb-2">
                  الاسم الأخير:
                </label>
                <input
                  type="text"
                  name="last_name"
                  placeholder="Last Name (En)"
                  value={formData.last_name}
                  onChange={handleChange}
                  required={true}
                  className="w-full border p-2 rounded-lg bg-section border-section text-white"
                />
              </div>
            </div>

            <div className="flex justify-center items-center flex-row gap-3 mb-4">
              <div>
                <label className="block text-white text-sm font-semibold mb-2">
                  رقم الهاتف:
                </label>
                <input
                  type="text"
                  name="phone_number"
                  placeholder="Phone Number"
                  value={formData.phone_number}
                  onChange={handleChange}
                  className="w-full border p-2 rounded-lg bg-section text-base border-section text-white"
                />
              </div>
              <div>
                <label className="block text-white text-sm font-semibold mb-2">
                  اسم مستخدم التلجرام:
                </label>
                <input
                  type="text"
                  placeholder="Telegram Account"
                  name="telegram_account"
                  value={formData.telegram_account}
                  onChange={handleChange}
                  className="w-full border p-2 rounded-lg bg-section border-section text-white"
                />
              </div>
            </div>
            <div className="flex justify-center items-center flex-row gap-3 mb-4">
              <div>
                <label className="block text-white text-sm font-semibold mb-2">
                  حساب الفيسبوك:
                </label>
                <input
                  type="text"
                  name="facebook_account"
                  placeholder="Facebook Account"
                  value={formData.facebook_account}
                  onChange={handleChange}
                  className="w-full border p-2 rounded-lg bg-section text-base border-section text-white"
                />
              </div>
              <div>
                <label className="block text-white text-sm font-semibold mb-2">
                  حساب الانستجرام:
                </label>
                <input
                  type="text"
                  name="instagram_account"
                  placeholder="Instagram Account"
                  value={formData.instagram_account}
                  onChange={handleChange}
                  className="w-full border p-2 rounded-lg bg-section border-section text-white"
                />
              </div>
            </div>
            <button
              type="submit"
              className="bg-accent text-white px-4 py-2 rounded hover:bg-accent-hover  ease-in duration-300"
            >
              تعديل المعلومات
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
