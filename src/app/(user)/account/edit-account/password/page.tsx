"use client";

import { ResetPassword } from '@/utils/API';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { PiEyeDuotone, PiEyeSlashDuotone } from 'react-icons/pi';
import { toast } from 'react-toastify';

export default function PasswordReset() {
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  const handlePasswordReset = async (event: React.FormEvent) => {
    event.preventDefault();

    if (currentPassword === "" || newPassword === "" || confirmPassword === "") {
      toast.warning("يرجى ملئ الحقول");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.warning("كلمات المرور غير متطابقة");
      return;
    }

    try {
      await ResetPassword(newPassword, currentPassword);
      toast.success("تم تغيير كلمة المرور بنجاح");
      router.replace("/account");
    } catch (error: any) {
      toast.error("فشل تغيير كلمة المرور");
    }
  };

  const toggleShowPassword = (field: 'current' | 'new' | 'confirm') => {
    setShowPassword((prevState) => ({
      ...prevState,
      [field]: !prevState[field]
    }));
  };

  return (
    <div className="xl:pl-20 w-full max-w-md px-10 xl:px-0 xl:mr-32">
      <form className="w-full xl:max-w-md" onSubmit={handlePasswordReset}>
        <div className="mb-4 relative">
          <label className="block text-white text-sm font-semibold mb-2">
            كلمة المرور الحالية:
          </label>
          <input
            type={showPassword.current ? "text" : "password"}
            placeholder="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full border p-2 rounded-lg bg-body border-body text-white"
          />
          <span
            onClick={() => toggleShowPassword('current')}
            className="absolute top-12 text-accent left-2 transform -translate-y-1/2 cursor-pointer text-2xl"
          >
            {showPassword.current ? <PiEyeSlashDuotone /> : <PiEyeDuotone />}
          </span>
        </div>

        <div className="mb-4 relative">
          <label className="block text-white text-sm font-semibold mb-2">
            كلمة المرور الجديدة:
          </label>
          <input
            type={showPassword.new ? "text" : "password"}
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full border p-2 rounded-lg bg-body border-body text-white"
          />
          <span
            onClick={() => toggleShowPassword('new')}
            className="absolute top-12 text-accent left-2 transform -translate-y-1/2 cursor-pointer text-2xl"
          >
            {showPassword.new ? <PiEyeSlashDuotone /> : <PiEyeDuotone />}
          </span>
        </div>

        <div className="mb-4 relative">
          <label className="block text-white text-sm font-semibold mb-2">
            تأكيد كلمة المرور الجديدة:
          </label>
          <input
            type={showPassword.confirm ? "text" : "password"}
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full border p-2 rounded-lg bg-body border-body text-white"
          />
          <span
            onClick={() => toggleShowPassword('confirm')}
            className="absolute top-12 text-accent left-2 transform -translate-y-1/2 cursor-pointer text-2xl"
          >
            {showPassword.confirm ? <PiEyeSlashDuotone /> : <PiEyeDuotone />}
          </span>
        </div>

        <button
          type="submit"
          className="bg-accent text-white px-4 py-2 rounded hover:bg-accent-hover ease-in duration-300"
        >
          تعديل كلمة المرور
        </button>
      </form>
    </div>
  );
}
