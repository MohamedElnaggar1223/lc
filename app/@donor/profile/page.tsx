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
import { useAdminStore, useDonorStore, useOrganizationStore } from "@/lib/store"
import { useState, useEffect } from "react"
import { getCookie } from "cookies-next"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { areas, governorates } from "@/constants"
import { BadgeCheck } from "lucide-react"

export default function ProfilePage() 
{
    const { admin } = useAdminStore()
    const { donors, updateDonor } = useDonorStore()
    const { organizations } = useOrganizationStore()

    const [success, setSuccess] = useState(false)

    const donor = donors.find(donor => donor.email === getCookie('donorEmail'))

    if(!donor) return null

    useEffect(() => {
        if(success) {
            setTimeout(() => {
                setSuccess(false)
            }, 3000)
        }
    }, [success])

    const profileSchema = z.object({
        firstName: z.string().min(2, {
            message: 'First name is too short'
        }),
        lastName: z.string().min(2, {
            message: 'Last name is too short'
        }),
        email: z.string().email({
            message: 'Invalid email address'
        }).refine((value) => organizations.find(organization => organization.email === value) ? false : true , {
            message: "Email already exists.",
        }).refine((value) => value === admin.email ? false : true, {
            message: "Email can not be used.",
        }).refine((value) => donors.find(donor => donor.email === value) && donor?.email !== value ? false : true , {
            message: "Email already exists.",
        }),
        number: z.string().min(10, {
            message: "Phone number must be at least 10 characters.",
        }).refine((value) => /^\d+$/.test(value), {
            message: "Phone number must be a number.",
        }).refine(value => value.startsWith("01"), {
            message: "Phone number must start with 01."
        }),    
        gender: z.enum(["Male", "Female"], {
            message: 'Gender must be either Male or Female.'
        }),
        area: z.enum(["Maadi", "Zamalek", "Downtown", "Heliopolis", "Nasr City", "6th of October City", "Sheikh Zayed", "New Cairo", "El Rehab City", "Madinet Nasr", "El Shorouk City", "El Tagamo' El Khames", "El Obour City", "El Mohandessin", "El Agouza", "El Dokki", "El Haram"], {
            message: "Area must be at least 2 characters.",
        }),
        governorate: z.enum(["Alexandria", "Aswan", "Asyut", "Beheira", "Beni Suef", "Cairo", "Dakahlia", "Damietta", "Faiyum", "Gharbia", "Giza", "Ismailia", "Kafr El Sheikh", "Luxor", "Matruh", "Minya", "Monufia", "New Valley", "North Sinai", "Port Said", "Qalyubia", "Qena", "Red Sea", "Sharqia", "Sohag", "South Sinai", "Suez"], {
            message: 'Governorate must be a valid governorate.'
        }),
        address: z.string().min(2, {
            message: "Address must be at least 2 characters.",
        }),
    })

    const form = useForm<z.infer<typeof profileSchema>>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            firstName: donor.firstName,
            lastName: donor.lastName,
            email: donor.email,
            number: donor.number,
            gender: donor.gender,
            area: donor.area,
            governorate: donor.governorate,
            address: donor.address,
        }
    })

    const onSubmit = (values: z.infer<typeof profileSchema>) => {
        updateDonor(donor?.email!, {...values, password: donor.password, role: donor.role, activated: donor.activated})
        setSuccess(true)
    }

    return (
        <section className='flex flex-col gap-8 px-8 py-8 overflow-auto'>
            <p className='italic text-4xl'>Hello, {donor.firstName}!</p>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col items-center max-h-[80vh] overflow-auto space-y-8">
                    <div className='flex w-full items-center justify-between gap-6 flex-wrap'>
                        <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                                <FormItem className='relative flex flex-col gap-6'>
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
                                <FormItem className='relative flex flex-col gap-6'>
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
                                <FormItem className='relative flex flex-col gap-6'>
                                    <FormLabel className='font-medium text-[#003B33] text-2xl'>Email:</FormLabel>
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
                            name="number"
                            render={({ field }) => (
                                <FormItem className='relative flex flex-col gap-6'>
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
                    </div>
<div className='flex w-full items-center justify-between gap-6 flex-wrap'>
                        <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                                <FormItem className='relative flex flex-col gap-6'>
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
                                <FormItem className='relative flex flex-col gap-6'>
                                    <FormLabel className='font-medium text-[#003B33] text-2xl'>Area:</FormLabel>
                                    <FormControl>
                                        <select className="w-screen max-w-[408px] outline-none  border-2 border-[rgba(0,59,51,0.5)] shadow-md px-2 py-2 rounded-2xl" {...field}>
                                            {areas.map(area => (
                                                <option key={area} value={area}>{area}</option>
                                            ))}
                                        </select>
                                    </FormControl>
                                    <FormMessage className='absolute -bottom-6 text-[#D84243]' />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="governorate"
                            render={({ field }) => (
                                <FormItem className='relative flex flex-col gap-6'>
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
                    </div>
                    <button
                        type="submit"
                        className=" text-[#fff] bg-[rgba(0,59,51,1)] font-semibold text-xl py-2 rounded-2xl w-screen max-w-[408px] shadow-md mt-[4.5rem]"
                    >
                        Submit
                    </button>
                </form>
            </Form>
            <Dialog open={success}>
                <DialogContent className='flex items-center gap-4 justify-center text-center'>
                    <BadgeCheck width={28} height={28} className='text-[#003B33]' />
                    <p className='text-[#003B33] font-bold text-lg'>Your Details Have Been Updated!</p>
                </DialogContent>
            </Dialog>
        </section>
    )
}