'use client'
import { useDonorStore, useOrganizationStore } from "@/lib/store"
import { Mail, MapPin, Phone } from "lucide-react"

type Props = {
    params: {
        email: string
    }
}

export default function DonorProfile({ params }: Props)
{
    const { donors } = useDonorStore()

    const donor = donors.find(donor => donor.email === decodeURIComponent(params.email))

    return (
        <section className='flex flex-col gap-8 px-8 py-8 overflow-auto'>
            <div className='flex flex-col bg-[#fff] divide-y rounded-3xl border-[rgba(0,59,51,0.5)] gap-12 py-8 mx-auto border-8 w-screen max-w-[1080px]'>
                <div className='px-12 flex items-center justify-between py-4 gap-12'>
                    <div className='flex flex-col gap-8 flex-1'>
                        <div className='flex-1 items-center flex justify-between'>
                            <p className='text-[rgba(0,59,51,1)] font-bold text-3xl'>{donor?.firstName} {donor?.lastName}</p>
                            <p className='text-[rgba(0,59,51,1)] text-xl flex items-center gap-2'>
                                {/* <Image
                                    src='/assets/mosque.png'
                                    alt='Mosque'
                                    width={32}
                                    height={32}
                                /> */}
                                {donor?.role}
                            </p>
                        </div>
                        <p className='text-[rgba(0,59,51,1)] text-lg'>{donor?.gender}</p>
                        <p className='text-[rgba(0,59,51,1)] text-lg flex gap-2 items-center'><MapPin />{donor?.address}, {donor?.area}, {donor?.governorate}</p>
                        <p className='text-[rgba(0,59,51,1)] text-lg'>Contact details:</p>
                        <div className='pl-8 flex flex-col gap-8'>
                            <p className='text-[rgba(0,59,51,1)] text-lg flex gap-2 items-center'><Phone />{donor?.number}</p>
                            <p className='text-[rgba(0,59,51,1)] text-lg flex gap-2 items-center'><Mail />{donor?.email}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}