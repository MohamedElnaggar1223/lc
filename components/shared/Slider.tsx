'use client'

import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "framer-motion"
import { LogOut, Menu, X } from "lucide-react"
import { useState } from "react"
import { adminSideBarMenu, donorSideBarMenu, organizationSideBarMenu } from "@/constants"
import { usePathname, useRouter } from "next/navigation"
import { deleteCookie, getCookie } from "cookies-next"

export default function Slider()
{
    const [sliderOpen, setSliderOpen] = useState(false)

    const isAdminLoggedIn = getCookie('adminLoggedIn')
    const isDonorLoggedIn = getCookie('donorLoggedIn')
    const isOrganizationLoggedIn = getCookie('organizationLoggedIn')

    const pathname = usePathname()
    const router = useRouter()

    const MenuMotion = motion(Menu)
    const XMotion = motion(X)

    return (
        <AnimatePresence mode="wait">
            <div className={cn('flex flex-col items-center justify-start gap-6 px-3.5 bg-[#F8E6D9] py-4 transition-all duration-300', sliderOpen ? 'w-[320px]' : 'w-[80px]')}>
                <div className={cn('w-full flex items-center', sliderOpen ? 'justify-end' : 'justify-center')}>
                    {sliderOpen ? (
                        <XMotion 
                            initial={{ rotate: 90 }}
                            animate={{ rotate: 180 }}
                            exit={{ rotate: 180}} 
                            onClick={() => setSliderOpen(false)} 
                            layoutId="XId"
                            className='cursor-pointer'
                            stroke='#003B33'
                        />
                    ) : (
                        <MenuMotion 
                            initial={{ rotate: 90 }}
                            animate={{ rotate: 180 }}
                            exit={{ rotate: 180}} 
                            onClick={() => setSliderOpen(true)} 
                            layoutId="menuId" 
                            className='cursor-pointer'
                            stroke='#003B33'
                        />
                    )}
                </div>
                <div className='gap-12 flex flex-col my-6 w-full h-full'>
                    {isAdminLoggedIn ? (
                        adminSideBarMenu.map((menu, index) => (
                            <div onClick={() => router.push(menu.path)} key={index} className={cn('flex items-center gap-4 w-full px-2.5 py-3 rounded-lg text-lg cursor-pointer italic', pathname === menu.path && '[&>svg]:stroke-[#fff] bg-[rgba(0,59,51,0.5)]')}>
                                {menu.icon}
                                {sliderOpen && <p className={cn('font-bold', pathname === menu.path && 'text-white')}>{menu.title}</p>}
                            </div>
                        ))
                    ) : isDonorLoggedIn ? (
                        donorSideBarMenu.map((menu, index) => (
                            <div onClick={() => router.push(menu.path)} key={index} className={cn('flex items-center gap-4 w-full px-2.5 py-3 rounded-lg text-lg cursor-pointer italic', pathname === menu.path && '[&>svg]:stroke-[#fff] bg-[rgba(0,59,51,0.5)]')}>
                                {menu.icon}
                                {sliderOpen && <p className={cn('font-bold', pathname === menu.path && 'text-white')}>{menu.title}</p>}
                            </div>
                        ))
                    ) : isOrganizationLoggedIn ? (
                        organizationSideBarMenu.map((menu, index) => (
                            <div onClick={() => router.push(menu.path)} key={index} className={cn('flex items-center gap-4 w-full px-2.5 py-3 rounded-lg text-lg cursor-pointer italic', pathname === menu.path && '[&>svg]:stroke-[#fff] bg-[rgba(0,59,51,0.5)]')}>
                                {menu.icon}
                                {sliderOpen && <p className={cn('font-bold', pathname === menu.path && 'text-white')}>{menu.title}</p>}
                            </div>
                        ))
                    ) : null}
                    <div 
                        onClick={() => {
                            deleteCookie('adminLoggedIn')
                            deleteCookie('donorLoggedIn')
                            deleteCookie('organizationLoggedIn')
                            deleteCookie('donorEmail')
                            deleteCookie('organizationEmail')
                            router.push('/')
                            router.refresh()
                        }} 
                        className={cn('flex mt-auto items-center gap-4 w-full px-2.5 py-3 rounded-lg text-lg cursor-pointer italic')}
                    >
                        <LogOut stroke='#003B33' width={48} />
                        {sliderOpen && <p className={cn('font-bold')}>Log out</p>}
                    </div>
                </div>
            </div>
        </AnimatePresence>
    )
}