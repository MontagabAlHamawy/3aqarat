"use client"
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import React from 'react';

export default function EditProperty() {
    const route = usePathname();
    const searchParams = useSearchParams();

    const url = searchParams.get('url');

    const editInfo = route === `/propertys/edit-property`;
    const editPhoto = route === "/propertys/edit-property/photo";

    return (
        <div>
            <h1 className="text-3xl text-accent text-center xl:text-right font-bold">
                تعديل معلومات العقار
            </h1>
            <div className='flex justify-start items-center gap-1 xl:gap-3'>
                <Link href={`/propertys/edit-property/?url=${url}`} className={`text-sm xl:text-lg cursor-pointer mt-10 ${editInfo ? "bg-sidpar " : "bg-[#1d1c22]"} rounded-t-md xl:mr-[-8px] py-2 px-3 w-max`}>
                    تعديل المعلوماتي
                </Link>
                <Link href={`/propertys/edit-property/photo/?url=${url}`} className={`text-sm xl:text-lg cursor-pointer mt-10 ${editPhoto ? "bg-sidpar " : "bg-[#1d1c22]"} rounded-t-md xl:mr-[-8px] py-2 px-3 w-max`}>
                    تعديل الصور
                </Link>
            </div>
        </div>
    )
}
