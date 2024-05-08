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
import { useAdminStore } from "@/lib/store"
import { useEffect, useState } from "react"

export default function AdminProfile()
{
    const { admin, updatePassword } = useAdminStore()
    const [success, setSuccess] = useState(false)

    const changePasswordSchema = z.object({
        oldPassword: z.string().min(8, {
            message: "Password must be at least 8 characters.",
        }).refine((value) => value === admin.password, {
            message: "Password is incorrect.",
        }),
        newPassword: z.string().min(8, {
            message: "Password must be at least 8 characters.",
        }),
        confirmPassword: z.string().min(8, {
            message: "Password must be at least 8 characters.",
        }),
    })
    .refine((values) => values.newPassword === values.confirmPassword, {
        message: "Passwords do not match.",
    })

    const form = useForm<z.infer<typeof changePasswordSchema>>({
        resolver: zodResolver(changePasswordSchema),
        defaultValues: {
            oldPassword: "",
            newPassword: "",
            confirmPassword: ""
        },
    })

    const onSubmit = (values: z.infer<typeof changePasswordSchema>) => {
        updatePassword(values.newPassword)
        setSuccess(true)
    }

    useEffect(() => {
        if(success) {
            setTimeout(() => {
                setSuccess(false)
            }, 5000)
        }
    }, [success])

    return (
        <section className='flex flex-col gap-8 px-8 py-8 overflow-auto'>
            <h1 className='w-full flex items-center justify-start text-left text-4xl lg:pl-32'>Change Password:</h1>
            {success ? (
                <p className='text-3xl text-black w-full items-center justify-center text-center'>Password Changed Successfully!</p>
            ) : (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col items-center justify-center gap-12">
                        <FormField
                            control={form.control}
                            name="oldPassword"
                            render={({ field }) => (
                                <FormItem className='relative flex flex-col gap-8'>
                                    <FormLabel className='font-medium text-[#003B33] text-2xl'>Old Password:</FormLabel>
                                    <FormControl>
                                        <input
                                            {...field}
                                            type="password"
                                            placeholder="Old Password"
                                            className="w-screen max-w-[408px] outline-none  border-2 border-[rgba(0,59,51,0.5)] shadow-md px-2 py-2 rounded-2xl"
                                        />
                                    </FormControl>
                                    <FormMessage className='absolute -bottom-6 text-[#D84243]' />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="newPassword"
                            render={({ field }) => (
                                <FormItem className='relative flex flex-col gap-8'>
                                    <FormLabel className='font-medium text-[#003B33] text-2xl'>New Password:</FormLabel>
                                    <FormControl>
                                        <input
                                            {...field}
                                            type="password"
                                            placeholder="New Password"
                                            className="w-screen max-w-[408px] outline-none  border-2 border-[rgba(0,59,51,0.5)] shadow-md px-2 py-2 rounded-2xl"
                                        />
                                    </FormControl>
                                    <FormMessage className='absolute -bottom-6 text-[#D84243]' />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem className='relative flex flex-col gap-8'>
                                    <FormLabel className='font-medium text-[#003B33] text-2xl'>Confirm Password:</FormLabel>
                                    <FormControl>
                                        <input
                                            {...field}
                                            type="password"
                                            placeholder="Confirm Password"
                                            className="w-screen max-w-[408px] outline-none  border-2 border-[rgba(0,59,51,0.5)] shadow-md px-2 py-2 rounded-2xl"
                                        />
                                    </FormControl>
                                    <FormMessage className='absolute -bottom-6 text-[#D84243]' />
                                </FormItem>
                            )}
                        />
                        <button
                            type="submit"
                            className=" text-[#fff] bg-[rgba(0,59,51,1)] font-semibold text-xl py-2 rounded-2xl w-screen max-w-[408px] shadow-md mt-[4.5rem]"
                        >
                            Change Password
                        </button>
                    </form>
                </Form>
            )}
        </section>
    )
}