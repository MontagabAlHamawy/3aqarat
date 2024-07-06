import React from 'react'
import { PiBellSimpleDuotone } from 'react-icons/pi'

export default function NotificationError() {
  return (
    <div className="mx-2 my-5  ml-2 xl:ml-3 xl:mx-0">
        <div className="bg-sidpar flex flex-col gap-5 justify-center items-center h-max py-10 rounded-md">
          <div className="text-[90px]">
            <PiBellSimpleDuotone />
          </div>
          <h1 className="text-2xl">لا توجد اشعارات لعرضها</h1>
        </div>
      </div>
  )
}