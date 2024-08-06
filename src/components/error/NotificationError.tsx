import React from 'react'
import { PiBellSimpleDuotone } from 'react-icons/pi'

export default function NotificationError() {
  return (
    <div className="flex flex-col gap-4 justify-center items-center w-full mt-20 xl:mt-32">
      <div className="flex flex-col items-center justify-center ">
        <div className=" text-accent">
          <PiBellSimpleDuotone size={160} />
        </div>
        <div className="text-center">
          <p className="text-lg xl:text-2xl font-semibold text-white">
            لا توجد اشعارات لعرضها
          </p>
        </div>
      </div>
    </div>
  )
}

