'use client'
import { getCookie } from "cookies-next";
import { Bell } from "lucide-react";
import { useState } from "react";

export default function TopBar()
{
    const organization = getCookie('organizationEmail')
    const donor = getCookie('donorEmail')

    const [openedOnce, setOpenedOnce] = useState(false)
    const [opened, setOpened] = useState(false)

    return (
        <div className='w-[95%] self-center bg-[#F8E6D9] px-4 py-4 flex items-center justify-between rounded-xl'>
            <div className='flex-1' />
            <div onClick={() => {
                setOpenedOnce(true)
                setOpened(prev => !prev)
            }} className='flex relative cursor-pointer'>
                <Bell stroke='#003B33' />
                {!openedOnce && <div className='absolute right-0 rounded-full w-2 h-2 bg-red-500' />}
                {opened && (donor ? (
                    <div className='absolute border-[rgba(0,59,51,0.5)] border-2 right-0 top-8 min-w-[30rem] py-4 h-60 bg-white rounded-xl z-50 shadow-lg'>
                        <div className='flex gap-4 p-4 px-6 items-center justify-start'>
                            <div className='rounded-full w-2 h-2 bg-red-500' />
                            <p className='text-lg text-[#003B33] font-normal'>Driver For Clothes Donations Has Arrived!</p>
                        </div>
                    </div>
                ) : organization ? (
                    <div className='absolute border-[rgba(0,59,51,0.5)] border-2 right-0 top-8 min-w-[30rem] py-4 h-60 bg-white rounded-xl z-50 shadow-lg'>
                        <div className='flex gap-4 p-4 px-6 items-center justify-start'>
                            <div className='rounded-full w-2 h-2 bg-red-500' />
                            <p className='text-lg text-[#003B33] font-normal'>Driver For Clothes Donations Has Arrived!</p>
                        </div>
                    </div>
                ): null)}
            </div>
        </div>
    )
}