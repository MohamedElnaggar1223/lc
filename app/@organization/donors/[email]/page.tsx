'use client'
import { useDonorStore } from "@/lib/store";
import { Mail, MapPin, Phone } from "lucide-react";

type Props = {
    params: {
        email: string;
    }
}

export default function DonorPage({ params }: Props)
{
    const { donors } = useDonorStore()

    const donor = donors.find(donor => donor.email === decodeURIComponent(params.email))

    if(!donor) return null

    return (
        <section className='flex flex-col gap-8 px-8 py-8 overflow-auto'>
            <div className='flex flex-col bg-[#fff] divide-y rounded-3xl border-[rgba(0,59,51,0.5)] gap-12 py-8 mx-auto border-8 w-screen max-w-[1080px]'>
                <div className='px-12 flex flex-col gap-4'>
                    <div className='flex flex-col items-start justify-between py-4 gap-8'>
                        <div className='flex flex-1 items-center justify-between gap-4 w-full'>
                            <p className='text-[rgba(0,59,51,1)] text-2xl'>{donor.firstName} {donor.lastName}</p>
                            <p className='text-[rgba(0,59,51,1)] text-xl'>{donor.role}</p>
                        </div>
                        <div className='flex flex-1 items-center justify-between gap-4 w-full'>
                            <div className='flex flex-col flex-1 gap-3'>
                                <p className='text-[rgba(0,59,51,1)] text-lg flex items-center gap-1'><MapPin />{donor.address}, {donor.area}, {donor.governorate}</p>
                                <p className='text-[rgba(0,59,51,1)] text-xl flex items-center gap-1'><Mail />{donor.email}</p>
                                <p className='text-[rgba(0,59,51,1)] text-xl flex items-center gap-1'><Phone />{donor.number}</p>
                            </div>
                            <p className='text-[rgba(0,59,51,1)] text-lg'>{donor.gender}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}