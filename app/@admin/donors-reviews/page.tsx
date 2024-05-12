'use client'

import { useDoctorStore, useDonorStore, useTeacherStore } from "@/lib/store"
import { Mail, Map, MapPinned } from "lucide-react"
import Link from "next/link"

export default function DonorsApplications()
{
    const { donors } = useDonorStore()

    const { teachers, declineTeacher, acceptTeacher } = useTeacherStore()
    const { doctors, declineDoctor, acceptDoctor } = useDoctorStore()

    const downloadFiles = (files: string[]) => {
        files.forEach((file, index) => {
            const link = document.createElement('a')
            link.href = file
            link.download = file
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
        })
    }

    return (
        <section className='flex flex-col gap-8 px-8 py-8 overflow-auto'>
            <div className='flex flex-col bg-[#fff] divide-y rounded-3xl border-[rgba(0,59,51,0.5)] gap-12 py-8 mx-auto border-8 w-screen max-w-[1080px]'>
            {teachers
                .filter(teacher => teacher.status === 'Pending')
                .map((teacher, index) => {
                    const donor = donors.find(donor => donor.email === teacher.email)
                    return (
                        <div className='px-12 flex items-center gap-8 justify-between py-4'>
                            <p className='text-[rgba(0,59,51,1)] text-2xl'>{index + 1}</p>
                            <div className='flex flex-1 flex-col gap-3'>
                                <p className='text-[rgba(0,59,51,1)] text-2xl'>{donor?.firstName} {donor?.lastName}</p>
                                <p className='text-[rgba(0,59,51,1)] text-xl'>{teacher.subject}</p>
                                <p className='text-[rgba(0,59,51,1)] text-lg flex items-center gap-1'><Mail />{teacher.email}</p>
                                <button onClick={() => downloadFiles(teacher.pdf)} className='outline-none border-none mr-auto max-w-fit bg-[#F8E6D9] px-1.5 py-1.5 rounded-md'>View PDF(s)</button>
                            </div>
                            <div className='flex gap-2 h-full'>
                                <button onClick={() => acceptTeacher(teacher.email)} className='rounded-3xl h-fit px-4 flex items-center justify-center py-0.5 bg-[rgba(147,255,152,0.5)]'>Accept</button>
                                <button onClick={() => declineTeacher(teacher.email)} className='rounded-3xl h-fit px-4 flex items-center justify-center py-0.5 bg-[rgba(255,141,141,0.5)]'>Decline</button>
                            </div>
                        </div>
                    )
                })}
            {doctors
                .filter(doctor => doctor.status === 'Pending')
                .map((doctor, index) => {
                    const donor = donors.find(donor => donor.email === doctor.email)
                    return (
                        <div className='px-12 flex items-center gap-8 justify-between py-4'>
                            <p className='text-[rgba(0,59,51,1)] text-2xl'>{index + 1}</p>
                            <div className='flex flex-1 flex-col gap-3'>
                                <p className='text-[rgba(0,59,51,1)] text-2xl'>{donor?.firstName} {donor?.lastName}</p>
                                <Link target="_blank" href={doctor.clinic.location}><p className='text-[rgba(0,59,51,1)] text-xl flex items-center gap-1'><MapPinned />Show Clinic on Map</p></Link>
                                <p className='text-[rgba(0,59,51,1)] text-lg flex items-center gap-1'><Mail />{doctor.email}</p>
                                <button onClick={() => downloadFiles(doctor.pdf)} className='outline-none border-none mr-auto max-w-fit bg-[#F8E6D9] px-1.5 py-1.5 rounded-md'>View PDF(s)</button>
                            </div>
                            <div className='flex gap-2 h-full'>
                                <button onClick={() => acceptDoctor(doctor.email)} className='rounded-3xl h-fit px-4 flex items-center justify-center py-0.5 bg-[rgba(147,255,152,0.5)]'>Accept</button>
                                <button onClick={() => declineDoctor(doctor.email)} className='rounded-3xl h-fit px-4 flex items-center justify-center py-0.5 bg-[rgba(255,141,141,0.5)]'>Decline</button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}