"use client";
import { GetToken, MyProfile, userInfo } from "@/utils/API";
import apiUrl from "@/utils/apiConfig";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import UsersLoading from "@/components/loade/UsersLoading";
import { PiPenDuotone, PiUserDuotone } from "react-icons/pi";
import { handleEditAccount } from "@/components/sweetalert/handleEditAccount";

export default function EditAccount() {
  const [user, setUser] = useState<string | null>(null);
  const [photo, setPhoto] = useState<string>("/");
  const [originalPhoto, setOriginalPhoto] = useState<string>("/");
  const [IsPhoto, setIsPhoto] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const token = GetToken();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    facebook_account: "",
    instagram_account: "",
    telegram_account: "",
  });
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await MyProfile();

        setFormData({
          first_name: data.first_name || "",
          last_name: data.last_name || "",
          phone_number: data.phone_number || "",
          facebook_account: data.facebook_account || "",
          instagram_account: data.instagram_account || "",
          telegram_account: data.telegram_account || "",
        });
        if (data.profile_photo) {
          setIsPhoto(true)
          setPhoto(data.profile_photo);
          setOriginalPhoto(data.profile_photo);
        } else {
          setIsPhoto(false)
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    const token = GetToken();
    if (!token) {
      router.replace(`/login?url=account/edit-account`);
    }
  }, [router]);

  const updateUserProfile = async () => {
    const url = `${apiUrl}/profile/me/`;
    try {
      let token = GetToken();
      const formDataToSend = new FormData();

      formDataToSend.append("first_name", formData.first_name);
      formDataToSend.append("last_name", formData.last_name);
      formDataToSend.append("phone_number", formData.phone_number);
      formDataToSend.append("facebook_account", formData.facebook_account);
      formDataToSend.append("instagram_account", formData.instagram_account);
      formDataToSend.append("telegram_account", formData.telegram_account);
      if (selectedFile) {
        formDataToSend.append("profile_photo", selectedFile);
      }

      const response = await fetch(url, {
        method: "PUT",
        headers: {
          Authorization: `JWT ${token}`,
        },
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }

      await response.json();
      toast.success("تم تعديل المعلومات بنجاح");
      router.replace(`/account`);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("حدث خطأ أثناء تحديث المعلومات");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setIsPhoto(true)
        setPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleIconClick = () => {
    fileInputRef.current?.click();
  };

  const handleEditAccountClick = () => {
    handleEditAccount(handleSubmit);
  };

  const handleSubmit = async () => {
    try {
      await updateUserProfile();
    } catch (error) {
      toast.error("Error updating profile");
    }
  };

  if (loading) {
    return <UsersLoading />;
  }


  return (
    <>
      <div className={`relative ${token ? "hidden" : ""}`}><UsersLoading /></div>
      <div className={`relative ${token ? "" : "hidden"}`}>
        <div className="flex flex-col mt-5 xl:flex-row xl:pr-20 items-center xl:mt-0 xl:gap-5 justify-start xl:justify-center">
          <div className="relative xl:w-1/2 xl:pr-8 mt-[-40px] mb-4 xl:mb-0">
            <Image
              src={photo}
              width={300}
              height={0}
              alt="user"
              className={`rounded-2xl border border-body ${IsPhoto ? "" : "hidden"}`}
            />
            <div className={`rounded-2xl bg-body text-accent flex justify-center items-center w-[250px] h-[250px] xl:w-[300px] xl:h-[300px]  ${IsPhoto ? "hidden" : ""}`}>
              <PiUserDuotone size={160} />
            </div>
            <button
              onClick={handleIconClick}
              className="absolute top-1 right-1 xl:right-9 bg-accent text-white rounded-full p-2"
            >
              <PiPenDuotone size={24} />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
          </div>
          <div className="xl:pl-20 w-full max-w-md px-10 xl:px-0">
            <form
              className="w-full xl:max-w-md"
              onSubmit={(e) => {
                e.preventDefault();
                handleEditAccountClick();
              }}
            >
              <div className="flex justify-center items-center flex-row gap-3 mb-4">
                <div>
                  <label className="block text-white text-sm font-semibold mb-2">
                    الاسم الأول:
                  </label>
                  <input
                    type="text"
                    name="first_name"
                    placeholder="First Name (En)"
                    value={formData.first_name || ""}
                    onChange={handleChange}
                    required={true}
                    className="w-full border p-2 rounded-lg bg-body text-base border-body text-white"
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
                    value={formData.last_name || ""}
                    onChange={handleChange}
                    required={true}
                    className="w-full border p-2 rounded-lg bg-body border-body text-white"
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
                    value={formData.phone_number || ""}
                    onChange={handleChange}
                    className="w-full border p-2 rounded-lg bg-body text-base border-body text-white"
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
                    value={formData.telegram_account || ""}
                    onChange={handleChange}
                    className="w-full border p-2 rounded-lg bg-body border-body text-white"
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
                    value={formData.facebook_account || ""}
                    onChange={handleChange}
                    className="w-full border p-2 rounded-lg bg-body text-base border-body text-white"
                  />
                </div>
                <div>
                  <label className="block text-white text-sm font-semibold mb-2">
                    حساب الإنستغرام:
                  </label>
                  <input
                    type="text"
                    placeholder="Instagram Account"
                    name="instagram_account"
                    value={formData.instagram_account || ""}
                    onChange={handleChange}
                    className="w-full border p-2 rounded-lg bg-body border-body text-white"
                  />
                </div>
              </div>
              <button
                type="submit"
                className=" bg-accent text-white px-4 py-2 rounded hover:bg-accent-hover ease-in duration-300"
              >
                تعديل المعلومات
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
