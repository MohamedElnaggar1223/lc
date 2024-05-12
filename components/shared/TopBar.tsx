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
                <Bell />
                {!openedOnce && <div className='absolute right-0 rounded-full w-2 h-2 bg-red-500' />}
                {opened && (donor ? (
                    <div className='absolute right-0 top-8 w-96 h-60 bg-white rounded-xl z-50 shadow-lg'>
                        <div className='flex flex-col gap-2 p-4'>
                            <p className='text-lg font-medium'>Driver For Clothes Donations Has Arrived!</p>
                        </div>
                    </div>
                ) : (
                    <div className='absolute right-0 top-8 w-96 h-60 bg-white rounded-xl z-50 shadow-lg'>
                        <div className='flex flex-col gap-2 p-4'>
                            <p className='text-lg font-medium'>Driver For Clothes Donations Has Arrived!</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}