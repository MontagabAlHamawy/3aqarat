"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'

export default function EditAccount() {
    const route = usePathname();
    const editInfo = route === "/account/edit-account";
    const editEmail = route === "/account/edit-account/email";
    const editPassword = route === "/account/edit-account/password";
    return (
        <div>
            <h1 className="text-3xl text-accent text-center xl:text-right font-bold">
                تعديل معلومات الحساب
            </h1>
            <div className='flex justify-start items-center gap-1 xl:gap-3'>
                <Link href={'/account/edit-account'} className={`text-sm xl:text-lg cursor-pointer mt-10 ${editInfo ? "bg-sidpar " : "bg-[#1d1c22]"} rounded-t-md xl:mr-[-8px]  py-2 px-3 w-max`}>
                    تعديل المعلوماتي
                </Link>
                <Link href={'/account/edit-account/email'} className={`text-sm xl:text-lg cursor-pointer mt-10 ${editEmail ? "bg-sidpar " : "bg-[#1d1c22]"} rounded-t-md xl:mr-[-8px]  py-2 px-3 w-max`}>
                    تعديل الإيميل
                </Link>
                <Link href={'/account/edit-account/password'} className={`text-sm xl:text-lg cursor-pointer mt-10 ${editPassword ? "bg-sidpar " : "bg-[#1d1c22]"} rounded-t-md xl:mr-[-8px]  py-2 px-3 w-max`}>
                    تعديل كلمة السر
                </Link>
            </div>
        </div>
    )
}
