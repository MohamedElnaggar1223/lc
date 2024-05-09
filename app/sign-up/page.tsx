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
import { useRouter } from "next/navigation"
import { useAdminStore, useDonorStore } from "@/lib/store"
import { governorates } from "@/constants"

export default function SignUp()
{
    const router = useRouter()

    const { admin } = useAdminStore()
    const { donors, addDonor } = useDonorStore()

    const signupSchema = z.object({
        firstName: z.string().min(2, {
            message: "First name must be at least 2 characters.",
        }),
        lastName: z.string().min(2, {
            message: "Last name must be at least 2 characters.",
        }),
        gender: z.enum(["Male", "Female"], {
            message: 'Gender must be either Male or Female.'
        }),
        number: z.string().min(10, {
            message: "Phone number must be at least 10 characters.",
        }).refine((value) => /^\d+$/.test(value), {
            message: "Phone number must be a number.",
        }).refine(value => value.startsWith("01"), {
            message: "Phone number must start with 01."
        }),
        email: z.string().min(2, {
            message: "Email must be at least 2 characters.",
        }).refine((value) => donors.find(donor => donor.email === value) ? false : true , {
            message: "Email already exists.",
        }).refine((value) => value === admin.email ? false : true, {
            message: "Email can not be used.",
        }),
        area: z.string().min(2, {
            message: "Area must be at least 2 characters.",
        }),
        governorate: z.enum(["Alexandria", "Aswan", "Asyut", "Beheira", "Beni Suef", "Cairo", "Dakahlia", "Damietta", "Faiyum", "Gharbia", "Giza", "Ismailia", "Kafr El Sheikh", "Luxor", "Matruh", "Minya", "Monufia", "New Valley", "North Sinai", "Port Said", "Qalyubia", "Qena", "Red Sea", "Sharqia", "Sohag", "South Sinai", "Suez"], {
            message: 'Governorate must be a valid governorate.'
        }),
        address: z.string().min(2, {
            message: "Address must be at least 2 characters.",
        }),
        password: z.string().min(8, {
            message: "Password must be at least 8 characters.",
        }),
        confirmPassword: z.string().min(8, {
            message: "Password must be at least 8 characters.",
        })
    })
    .refine((values) => {
        if(values.password === values.confirmPassword) return true
        return false
    }, { message: "Passwords do not match.", path: ["confirmPassword"] })

    const form = useForm<z.infer<typeof signupSchema>>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
            firstName: "",
            lastName: "",
            gender: "Male",
            number: "",
            area: "",
            governorate: "Cairo",
            address: ""
        },
    })

    const onSubmit = (values: z.infer<typeof signupSchema>) => {
        setCookie('donorLoggedIn', 'true', { maxAge: 60 * 6 * 24 })
        setCookie('donorEmail', values.email, { maxAge: 60 * 6 * 24 })
        const { confirmPassword, ...rest } = values
        addDonor({...rest, role: 'regular', activated: false})
        router.push('/')
        router.refresh()
    }

    return (
        <>
            <p className='font-bold text-5xl'>Sign up</p>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6 max-h-[600px] overflow-auto">
                    <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                            <FormItem className='relative flex flex-col gap-2'>
                                <FormLabel className='font-medium text-[#003B33] text-2xl'>First Name:</FormLabel>
                                <FormControl>
                                    <input
                                        {...field}
                                        type="text"
                                        placeholder="First Name"
                                        className="w-screen max-w-[408px] outline-none  border-2 border-[rgba(0,59,51,0.5)] shadow-md px-2 py-2 rounded-2xl"
                                    />
                                </FormControl>
                                <FormMessage className='absolute -bottom-6 text-[#D84243]' />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                            <FormItem className='relative flex flex-col gap-2'>
                                <FormLabel className='font-medium text-[#003B33] text-2xl'>Last Name:</FormLabel>
                                <FormControl>
                                    <input
                                        {...field}
                                        type="text"
                                        placeholder="Last Name"
                                        className="w-screen max-w-[408px] outline-none  border-2 border-[rgba(0,59,51,0.5)] shadow-md px-2 py-2 rounded-2xl"
                                    />
                                </FormControl>
                                <FormMessage className='absolute -bottom-6 text-[#D84243]' />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className='relative flex flex-col gap-2'>
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
                        name="number"
                        render={({ field }) => (
                            <FormItem className='relative flex flex-col gap-2'>
                                <FormLabel className='font-medium text-[#003B33] text-2xl'>Contact Number:</FormLabel>
                                <FormControl>
                                    <input
                                        {...field}
                                        type="text"
                                        placeholder="Contact Number"
                                        className="w-screen max-w-[408px] outline-none  border-2 border-[rgba(0,59,51,0.5)] shadow-md px-2 py-2 rounded-2xl"
                                    />
                                </FormControl>
                                <FormMessage className='absolute -bottom-6 text-[#D84243]' />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                            <FormItem className='relative flex flex-col gap-2'>
                                <FormLabel className='font-medium text-[#003B33] text-2xl'>Address:</FormLabel>
                                <FormControl>
                                    <input
                                        {...field}
                                        type="text"
                                        placeholder="Address"
                                        className="w-screen max-w-[408px] outline-none  border-2 border-[rgba(0,59,51,0.5)] shadow-md px-2 py-2 rounded-2xl"
                                    />
                                </FormControl>
                                <FormMessage className='absolute -bottom-6 text-[#D84243]' />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="area"
                        render={({ field }) => (
                            <FormItem className='relative flex flex-col gap-2'>
                                <FormLabel className='font-medium text-[#003B33] text-2xl'>Area:</FormLabel>
                                <FormControl>
                                    <input
                                        {...field}
                                        type="text"
                                        placeholder="Area"
                                        className="w-screen max-w-[408px] outline-none  border-2 border-[rgba(0,59,51,0.5)] shadow-md px-2 py-2 rounded-2xl"
                                    />
                                </FormControl>
                                <FormMessage className='absolute -bottom-6 text-[#D84243]' />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="governorate"
                        render={({ field }) => (
                            <FormItem className='relative flex flex-col gap-2'>
                                <FormLabel className='font-medium text-[#003B33] text-2xl'>Governorate:</FormLabel>
                                <FormControl>
                                    <select
                                        {...field}
                                        className="w-screen max-w-[408px] outline-none  border-2 border-[rgba(0,59,51,0.5)] shadow-md px-2 py-2 rounded-2xl"
                                    >
                                        {governorates.map(governorate => (
                                            <option key={governorate} value={governorate}>{governorate}</option>
                                        ))}
                                    </select>
                                </FormControl>
                                <FormMessage className='absolute -bottom-6 text-[#D84243]' />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="gender"
                        render={({ field }) => (
                            <FormItem className='relative flex flex-col gap-2'>
                                <FormLabel className='font-medium text-[#003B33] text-2xl'>Gender:</FormLabel>
                                <FormControl>
                                    <select
                                        {...field}
                                        className="w-screen max-w-[408px] outline-none  border-2 border-[rgba(0,59,51,0.5)] shadow-md px-2 py-2 rounded-2xl"
                                    >
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                </FormControl>
                                <FormMessage className='absolute -bottom-6 text-[#D84243]' />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem className='relative flex flex-col gap-2'>
                                <FormLabel className='font-medium text-[#003B33] text-2xl'>Password:</FormLabel>
                                <FormControl>
                                    <input
                                        {...field}
                                        type="password"
                                        placeholder="Password"
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
                            <FormItem className='relative flex flex-col gap-2'>
                                <FormLabel className='font-medium text-[#003B33] text-2xl'>Confirm Passowrd:</FormLabel>
                                <FormControl>
                                    <input
                                        {...field}
                                        type="password"
                                        placeholder="Confirm Passowrd"
                                        className="w-screen max-w-[408px] outline-none  border-2 border-[rgba(0,59,51,0.5)] shadow-md px-2 py-2 rounded-2xl"
                                    />
                                </FormControl>
                                <FormMessage className='absolute -bottom-6 text-[#D84243]' />
                            </FormItem>
                        )}
                    />
                    <button
                        type="submit"
                        className=" text-[#fff] bg-[rgba(0,59,51,1)] font-semibold text-xl py-2 rounded-2xl w-screen max-w-[408px] shadow-md"
                    >
                        Sign up
                    </button>
                    <p 
                        className='text-[#003B33] font-medium w-full text-left max-w-[408px] gap-1'
                    >
                        Already have an account? 
                        {" "}
                        <span 
                            onClick={() => {
                                router.push('/')
                                router.refresh()
                            }} 
                            className='text-[rgba(0,59,51,1)] cursor-pointer font-bold'
                        >
                            Log In
                        </span>
                    </p>
                    <p 
                        className='text-[#003B33] font-medium w-full text-left max-w-[408px] gap-1'
                    >
                        Are you an organization representative?
                        {" "}
                        <br />
                        <span 
                            onClick={() => {
                                router.push('/sign-up/organization')
                                router.refresh()
                            }} 
                            className='text-[rgba(0,59,51,1)] cursor-pointer font-bold'
                        >
                            Register Your Organization
                        </span>
                    </p>
                </form>
            </Form>
        </>
    )
}