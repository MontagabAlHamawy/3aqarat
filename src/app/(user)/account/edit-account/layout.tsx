import EditAccount from '@/components/component/EditAccount'
import React from 'react'

export default function EditAccountLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <EditAccount/>
            <div className="bg-sidpar w-full rounded-b-md mb-0 rounded-tl-md py-10 gap-x-5 gap-y-5 xl:gap-x-10 xl:gap-y-10 px-4 xl:mx-[-8px]">
                {children}
            </div>
        </div>
    )
}
