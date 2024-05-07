'use client'

import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import { UserCog } from 'lucide-react'
import { adminSideBarMenu } from "@/constants"
import { usePathname, useRouter } from "next/navigation"

export default function Slider()
{
    const [sliderOpen, setSliderOpen] = useState(false)

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
                        />
                    ) : (
                        <MenuMotion 
                            initial={{ rotate: 90 }}
                            animate={{ rotate: 180 }}
                            exit={{ rotate: 180}} 
                            onClick={() => setSliderOpen(true)} 
                            layoutId="menuId" 
                        />
                    )}
                </div>
                <div className='gap-12 flex flex-col my-6 w-full'>
                    {adminSideBarMenu.map((menu, index) => (
                        <div onClick={() => router.push(menu.path)} key={index} className={cn('flex items-center gap-4 w-full px-2.5 py-3 rounded-lg', pathname === menu.path && '[&>svg]:stroke-[#fff] bg-[rgba(0,59,51,0.5)]')}>
                            {menu.icon}
                            {sliderOpen && <p className={cn('font-bold', pathname === menu.path && 'text-white')}>{menu.title}</p>}
                        </div>
                    ))}
                </div>
            </div>
        </AnimatePresence>
    )
}