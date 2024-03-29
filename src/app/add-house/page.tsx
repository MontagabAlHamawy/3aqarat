'use client'

import dynamic from 'next/dynamic';

const MyLocation = dynamic(()=>import('@/app/components/my-location'),{ssr:false})

export default function AddHouse() {
  return(
    <div className="flex justify-center items-center">
       <MyLocation/>
    </div>
  );
}
