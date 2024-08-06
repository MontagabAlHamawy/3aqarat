import EditAccount from '@/components/component/EditAccount'
import UsersLoading from '@/components/loade/UsersLoading';
import { GetToken } from '@/utils/API';
import React from 'react'

export default function EditAccountLayout({ children }: { children: React.ReactNode }) {
    // const token = GetToken();
    return (
        <>
            {/* <div className={`${token ? "hidden" : ""}`}><UsersLoading /> {children}</div> */}
            <div >
                <EditAccount />
                <div className={`bg-sidpar w-full rounded-b-md p-0 m-0 mb-0 rounded-tl-md py-10 gap-x-5 gap-y-5 xl:gap-x-10 xl:gap-y-10  xl:mx-[-8px]`}>
                    {children}
                </div>
            </div>
        </>
    )
}
