"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export default function Email() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleEmailUpdate = async (event: React.FormEvent) => {
        event.preventDefault();

        if (email === "" || password === "") {
            toast.warning("يرجى ملء الحقول");
            return;
        }

        try {
            // هنا يمكنك إضافة الكود لربط الـ API
            // مثال: await updateEmailAPI(email, password);

            toast.success("تم تحديث البريد الإلكتروني بنجاح");
            router.replace("/account"); // يمكن تعديل هذا المسار بناءً على احتياجاتك
        } catch (error: any) {
            toast.error("فشل تحديث البريد الإلكتروني");
        }
    };

    return (
        <div className="xl:pl-20 w-full max-w-md px-10 xl:px-0 xl:mr-32">
            <form className="w-full xl:max-w-md" onSubmit={handleEmailUpdate}>
                <div className="mb-4">
                    <label className="block text-white text-sm font-semibold mb-2">
                        الإيميل الجديد:
                    </label>
                    <input
                        type="email"
                        placeholder="New Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border p-2 rounded-lg bg-body border-body text-white"
                    />
                </div>



                <button
                    type="submit"
                    className="bg-accent text-white px-4 py-2 rounded hover:bg-accent-hover ease-in duration-300"
                >
                    تعديل الإيميل
                </button>
            </form>
        </div>
    );
}
