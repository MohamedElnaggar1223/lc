'use client'
import { useDonorStore } from "@/lib/store"
import { Mail, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"

export default function DonorsList()
{
    const { donors, removeDonor } = useDonorStore()

    const router = useRouter()

    return (
        <section className='flex flex-col gap-8 px-8 py-8 overflow-auto'>
            <div className='flex flex-col bg-[#f0f0f0] divide-y rounded-3xl border-[rgba(0,59,51,0.5)] gap-12 py-8 mx-auto border-8 w-screen max-w-[1080px]'>
                {donors
                .map((donor, index) => (
                    <div onClick={() => router.push(`/donors/${donor.email}`)} key={index} className='px-12 flex items-center justify-between py-4 gap-12 cursor-pointer'>
                        <p className='text-[rgba(0,59,51,1)] text-2xl'>{index + 1}</p>
                        <div className='flex flex-col gap-3 flex-1'>
                            <p className='text-[rgba(0,59,51,1)] text-2xl'>{donor.firstName} {donor.lastName}</p>
                            <p className='text-[rgba(0,59,51,1)] text-xl'>Donor Type: {donor.role}</p>
                            <p className='text-[rgba(0,59,51,1)] text-lg flex gap-2 items-center'><Mail />{donor.email}</p>
                        </div>
                        <Trash2 
                            onClick={(e) => {
                                e.stopPropagation()
                                removeDonor(donor.email)
                            }} 
                            className='cursor-pointer'
                        />
                    </div>
                ))}
            </div>
        </section>
    )
}