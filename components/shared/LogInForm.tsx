'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { setCookie } from "cookies-next"
import { usePathname, useRouter } from "next/navigation"
import { useAdminStore, useDonorStore, useOrganizationStore } from "@/lib/store"
import { useEffect, useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { cn } from "@/lib/utils"

export default function LogInForm()
{
    const router = useRouter()
    const pathname = usePathname()

    const { admin } = useAdminStore()
    const { donors } = useDonorStore()
    const { organizations } = useOrganizationStore()

    const [passwordVisible, setPasswordVisible] = useState(false)
    const [passwordWrong, setPasswordWrong] = useState(false)

    useEffect(() => {
        if(passwordWrong) setTimeout(() => setPasswordWrong(false), 400)
    }, [passwordWrong])

    const loginSchema = z.object({
        email: z.string().min(2, {
            message: "Username must be at least 2 characters.",
        }).refine((value) => value === "admin@test.com" || donors.find(donor => donor.email === value) || organizations.find(org => org.email === value), {
            message: "Email does not exist.",
        }),
        password: z.string().min(8, {
            message: "Password must be at least 8 characters.",
        })
    })
    .refine((values) => {
        if(values.email === "admin@test.com" && values.password === admin.password) return true
        if(donors.find(donor => donor.email === values.email) && donors.find(donor => donor.email === values.email)?.password === values.password) return true
        if(organizations.find(org => org.email === values.email) && organizations.find(org => org.email === values.email)?.password === values.password) return true
        return false
    }, { message: "Password is incorrect.", path: ["password"] })

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const onSubmit = (values: z.infer<typeof loginSchema>) => {
        setPasswordWrong(false)
        if(values.email === "admin@test.com") setCookie('adminLoggedIn', 'true', { maxAge: 60 * 6 * 24 })
        if(donors.find(donor => donor.email === values.email)) 
        {
            setCookie('donorLoggedIn', 'true', { maxAge: 60 * 6 * 24 })
            setCookie('donorEmail', values.email, { maxAge: 60 * 6 * 24 })
        }
        if(organizations.find(org => org.email === values.email))
        {
            setCookie('organizationLoggedIn', 'true', { maxAge: 60 * 6 * 24 })
            setCookie('organizationEmail', values.email, { maxAge: 60 * 6 * 24 })
        }
        router.refresh()
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col items-center justify-center">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem className='relative flex flex-col gap-8'>
                            <FormLabel className='font-medium text-[#003B33] text-2xl'>Email address:</FormLabel>
                            <FormControl>
                                <input
                                    {...field}
                                    type="email"
                                    placeholder="Email"
                                    className="w-screen max-w-[408px] outline-none  border-2 border-[rgba(0,59,51,0.5)] shadow-md px-2 py-2 rounded-2xl"
                                />
                            </FormControl>
                            <FormMessage className='absolute -bottom-6 text-[#D84243]' />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem className='relative flex flex-col gap-8 mt-12'>
                            <FormLabel className='font-medium text-[#003B33] text-2xl'>Password:</FormLabel>
                            <FormControl>
                                <div className={cn('relative', passwordWrong ? '[&>input]:border-red-400 animate-shake' : '')}>
                                    <input
                                        {...field}
                                        type={passwordVisible ? 'text' : "password"}
                                        placeholder="Password"
                                        className="w-screen max-w-[408px] outline-none  border-2 border-[rgba(0,59,51,0.5)] shadow-md px-2 py-2 rounded-2xl"
                                    />
                                    {passwordVisible ? (
                                        <Eye
                                            className={cn('absolute top-[24%] z-50 cursor-pointer', pathname?.includes('/ar') ? 'left-[5%]' : 'left-[90%]')} 
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                setPasswordVisible(prev => !prev)
                                            }} 
                                        />
                                    ) : (
                                        <EyeOff
                                            className={cn('absolute top-[24%] z-50 cursor-pointer', pathname?.includes('/ar') ? 'left-[5%]' : 'left-[90%]')} 
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                setPasswordVisible(prev => !prev)
                                            }} 
                                        />
                                    )}
                                </div>
                            </FormControl>
                            <FormMessage className='absolute -bottom-6 text-[#D84243]' />
                        </FormItem>
                    )}
                />
                <button
                    type="submit"
                    className=" text-[#fff] bg-[rgba(0,59,51,1)] font-semibold text-xl py-2 rounded-2xl w-screen max-w-[408px] shadow-md mt-[4.5rem]"
                    onClick={() => {
                        setPasswordWrong(true)
                    }}
                >
                    Log in
                </button>
                <p className='text-[#003B33] font-medium w-full text-left max-w-[408px] mt-8'>Don't have an account? <span onClick={() => {
                    router.push('/sign-up')
                    router.refresh()
                }} className='text-[rgba(0,59,51,1)] cursor-pointer font-bold'>Sign up</span></p>
            </form>
        </Form>
    )
}