'use client'

import LogInForm from "@/components/shared/LogInForm"
import { usePathname } from "next/navigation"

export default function AuthenticationPage()
{
    const pathname = usePathname()

    return (
        <>
            {pathname?.includes('/sign-up/organization') ? (
                <>
                    <p className='font-bold text-5xl'>Sign Up For Organizations</p>
                    <LogInForm />
                </>
            ) : pathname?.includes('/sign-up') ? (
                <>
                <p className='font-bold text-5xl'>Sign up</p>
                    <LogInForm />
                </>
            ) : (
                <>
                <p className='font-bold text-5xl'>Log in</p>
                    <LogInForm />
                </>
            )}
        </>
    )
}