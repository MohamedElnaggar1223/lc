'use client'
import { useOrganizationStore } from "@/lib/store"
import { AnimatePresence, motion } from "framer-motion"
import { Mail, MapPin, Phone } from "lucide-react"

type Props = {
    params: {
        name: string
    }
}

export default function OrganizationPage({ params }: Props)
{
    const { organizations } = useOrganizationStore()

    const organization = organizations.find(org => org.name === decodeURIComponent(params.name))

    return (
        <AnimatePresence>

            <section className='flex flex-col gap-8 px-8 py-8 overflow-auto'>
                <div className='flex flex-col bg-[#fff] divide-y rounded-3xl border-[rgba(0,59,51,0.5)] gap-12 py-8 mx-auto border-8 w-screen max-w-[1080px]'>
                    <div className='px-12 flex items-center justify-between py-4 gap-12'>
                        <div className='flex flex-col gap-8 flex-1'>
                            <div className='flex-1 items-center flex justify-between'>
                                <motion.p layoutId={`${organization?.name}${decodeURIComponent(params.name)}`} className='text-[rgba(0,59,51,1)] font-bold text-3xl'>{organization?.name}</motion.p>
                                <motion.p layoutId={`${organization?.type}${decodeURIComponent(params.name)}`} className='text-[rgba(0,59,51,1)] text-xl flex items-center gap-2'>
                                    {/* <Image
                                        src='/assets/mosque.png'
                                        alt='Mosque'
                                        width={32}
                                        height={32}
                                    /> */}
                                    {organization?.type}
                                </motion.p>
                            </div>
                            <motion.p layoutId={`${organization?.description}${decodeURIComponent(params.name)}`} className='text-[rgba(0,59,51,1)] text-lg'>{organization?.description}</motion.p>
                            <p className='text-[rgba(0,59,51,1)] text-lg flex gap-2 items-center'><MapPin />{organization?.address}, {organization?.area}, {organization?.governorate}</p>
                            <p className='text-[rgba(0,59,51,1)] text-lg'>Contact details:</p>
                            <div className='pl-8 flex flex-col gap-8'>
                                <p className='text-[rgba(0,59,51,1)] text-lg flex gap-2 items-center'><Phone />{organization?.number}</p>
                                <p className='text-[rgba(0,59,51,1)] text-lg flex gap-2 items-center'><Mail />{organization?.email}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </AnimatePresence>
    )
}