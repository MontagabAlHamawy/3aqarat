import React from 'react'
import { PiUserDuotone } from 'react-icons/pi'

export default function UsersLoading() {
  return (
    <div className="mx-2 my-5 ml-2 xl:ml-3 xl:mx-0">
      <div className="bg-sidpar flex flex-col gap-5 justify-center items-center h-max py-10 rounded-md">
        <div className="text-[90px] text-accent  animate-waving-hand opacity-100 transform translate-y-0 duration-100">
          <PiUserDuotone />
        </div>
        <h1 className=" text-lg xl:text-2xl">جاري جلب معلومات المستخدم...</h1>
      </div>
    </div>
  )
}
