'use client'
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Filter, Search } from "lucide-react";
import { useOrganizationStore } from "@/lib/store";
import { governorates, areas } from "@/constants";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

export default function OrgainzationsListPage()
{
    const { organizations } = useOrganizationStore()
    const [search, setSearch] = useState('')
    const [filtersOpen, setFiltersOpen] = useState(false)
    const [types, setTypes] = useState<string[]>([])
    const [governoratesList, setGovernoratesList] = useState<string[]>([])
    const [areasList, setAreasList] = useState<string[]>([])

    const dropdownRef = useRef<HTMLDivElement>(null)
    const dropdownIconRef = useRef<SVGSVGElement>(null)

    const router = useRouter()

    useEffect(() => {
        const handleOutsideClick = (event: any) => {
            if(event.target === dropdownIconRef.current) return
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setFiltersOpen(false)
            }
        };

        document.addEventListener('click', handleOutsideClick)

        return () => {
            document.removeEventListener('click', handleOutsideClick)
        };
    }, []);

    return (
        <section className='flex flex-col gap-8 px-8 py-8 overflow-auto'>
            <div className='relative border-[rgba(0,59,51,0.5)] border-4 flex px-1.5 py-1.5 w-screen max-w-[658px] text-[rgba(0,59,51,0.5)] rounded-lg bg-[#fff] mx-auto'>
                <input 
                    type='text' 
                    placeholder='Search' 
                    className='w-full px-4 py-2 flex-1 outline-none' 
                    onChange={(e) => setSearch(e.target.value)}
                />
                <div className='flex items-center'>
                    <Search className='cursor-pointer mx-2' />
                    {"|"}
                    <Filter ref={dropdownIconRef} className='cursor-pointer mx-2' onClick={() => setFiltersOpen(prev => !prev)} />
                </div>
                {filtersOpen && (
                    <div ref={dropdownRef} onClick={(e) => e.stopPropagation()} className='absolute w-screen max-w-[647px] z-[999999999] bg-[#fff] flex flex-col text-sm top-[110%] gap-4 px-8 py-4 rounded-lg max-h-[500px] overflow-auto'>
                        <div className='flex flex-col'>
                            <p className='font-semibold italic text-lg mb-2'>Type(s): </p>
                            <div className='flex gap-6 flex-wrap'>
                                <p onClick={() => setTypes(prev => prev.includes('Mosque') ? prev.slice().filter(type => type !== 'Mosque') : ([...prev, 'Mosque']))} className={cn('font-medium cursor-pointer px-2 py-1 rounded-lg italic text-base', types.includes('Mosque') && 'bg-[#F8E6D9]')}>Mosque</p>
                                <p onClick={() => setTypes(prev => prev.includes('Church') ? prev.slice().filter(type => type !== 'Church') : ([...prev, 'Church']))} className={cn('font-medium cursor-pointer px-2 py-1 rounded-lg italic text-base', types.includes('Church') && 'bg-[#F8E6D9]')}>Church</p>
                                <p onClick={() => setTypes(prev => prev.includes('Hospital') ? prev.slice().filter(type => type !== 'Hospital') : ([...prev, 'Hospital']))} className={cn('font-medium cursor-pointer px-2 py-1 rounded-lg italic text-base', types.includes('Hospital') && 'bg-[#F8E6D9]')}>Hospital</p>
                                <p onClick={() => setTypes(prev => prev.includes('Charity') ? prev.slice().filter(type => type !== 'Charity') : ([...prev, 'Charity']))} className={cn('font-medium cursor-pointer px-2 py-1 rounded-lg italic text-base', types.includes('Charity') && 'bg-[#F8E6D9]')}>Charity</p>
                                <p onClick={() => setTypes(prev => prev.includes('Orphanage') ? prev.slice().filter(type => type !== 'Orphanage') : ([...prev, 'Orphanage']))} className={cn('font-medium cursor-pointer px-2 py-1 rounded-lg italic text-base', types.includes('Orphanage') && 'bg-[#F8E6D9]')}>Orphanage</p>
                                <p onClick={() => setTypes(prev => prev.includes('Public School') ? prev.slice().filter(type => type !== 'Public School') : ([...prev, 'Public School']))} className={cn('font-medium cursor-pointer px-2 py-1 rounded-lg italic text-base', types.includes('Public School') && 'bg-[#F8E6D9]')}>Public School</p>
                            </div>
                        </div>
                        <div className='flex flex-col'>
                            <p className='font-semibold italic text-lg mb-2'>Governorate(s): </p>
                            <div className='flex gap-6 flex-wrap'>
                                {governorates.map((governorate, index) => (
                                    <p key={index} onClick={() => setGovernoratesList(prev => prev.includes(governorate) ? prev.slice().filter(gov => gov !== governorate) : ([...prev, governorate]))} className={cn('font-medium cursor-pointer px-2 py-1 rounded-lg italic text-base', governoratesList.includes(governorate) && 'bg-[#F8E6D9]')}>{governorate}</p>
                                ))}
                            </div>
                        </div>
                        <div className='flex flex-col'>
                            <p className='font-semibold italic text-lg mb-2'>Area(s): </p>
                            <div className='flex gap-6 flex-wrap'>
                                {areas.map((area, index) => (
                                    <p key={index} onClick={() => setAreasList(prev => prev.includes(area) ? prev.slice().filter(gov => gov !== area) : ([...prev, area]))} className={cn('font-medium cursor-pointer px-2 py-1 rounded-lg italic text-base', areasList.includes(area) && 'bg-[#F8E6D9]')}>{area}</p>
                                ))}
                            </div>
                        </div>
                        <button onClick={() => {
                            setTypes([])
                            setGovernoratesList([])
                            setAreasList([])
                        }} className='bg-[#F4D8C2] text-white rounded-md px-6 mt-2 ml-auto mr-12 py-2 flex items-center gap-2'>Clear Filters</button>
                    </div>
                )}
            </div>
            <AnimatePresence>
                <motion.div className='flex flex-col bg-[#fff] divide-y rounded-3xl border-[rgba(0,59,51,0.5)] gap-12 py-8 mx-auto border-8 w-screen max-w-[1080px]'>
                    {organizations
                    .filter(organization => organization.status === 'Accepted')
                    .filter(organization => organization.name.toLowerCase().includes(search.toLowerCase()))
                    .filter(organization => types.length > 0 ? types.includes(organization.type) : true)   
                    .filter(organization => governoratesList.length > 0 ? governoratesList.includes(organization.governorate) : true)           
                    .filter(organization => areasList.length > 0 ? areasList.includes(organization.area) : true)
                    .map((organization, index) => (
                        <div onClick={() => router.push(`/organizations/${organization.name}`)} key={organization.name} className='px-12 flex items-center justify-between py-4 gap-12 cursor-pointer'>
                            <p className='text-[rgba(0,59,51,1)] text-2xl'>{index + 1}</p>
                            <div className='flex flex-col gap-3 flex-1'>
                                <motion.p layoutId={`${organization.name}${organization.name}`} className='text-[rgba(0,59,51,1)] text-2xl'>{organization.name}</motion.p>
                                <motion.p layoutId={`${organization.type}${organization.name}`} className='text-[rgba(0,59,51,1)] text-xl'>{organization.type}</motion.p>
                                <motion.p layoutId={`${organization.description}${organization.name}`} className='text-[rgba(0,59,51,1)] text-lg'>{organization.description}</motion.p>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </AnimatePresence>
        </section>
    )
}