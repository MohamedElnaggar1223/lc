'use client'
import { useDoctorStore, useDonorStore, useTeacherStore } from "@/lib/store"
import { CookieValueTypes } from "cookies-next"
import { BriefcaseMedical, GraduationCap, User } from "lucide-react"
import DoctorApplication from "./DoctorApplication"
import TeacherApplication from "./TeacherApplication"

type Props = {
    loggedInDonor: CookieValueTypes
    children: React.ReactNode
}

export default function DonorOnBoarding({ loggedInDonor, children }: Props)
{
    const { donors, updateDonor } = useDonorStore()
    const { doctors, addDoctor } = useDoctorStore()
    const { teachers, addTeacher } = useTeacherStore()

    const donor = donors.find(donor => donor.email === loggedInDonor)

    if(!donor) return null

    return (
        <>
            {donor?.activated ? children : doctors.find(doc => doc.email === donor.email) ? (
                <section className='flex flex-col items-center justify-center h-screen overflow-auto gap-4'>
                    <p className='text-[rgba(0,59,51,1)] text-4xl'>Please provide the following information, {donor.firstName}!</p>
                    <DoctorApplication doctor={doctors.find(doc => doc.email === donor.email)!} />
                </section>
            ) : teachers.find(teacher => teacher.email === donor.email) ? (
                <section className='flex flex-col items-center justify-center h-screen overflow-auto gap-4'>
                    <p className='text-[rgba(0,59,51,1)] text-4xl'>Please provide the following information, {donor.firstName}!</p>
                    <TeacherApplication teacher={teachers.find(teacher => teacher.email === donor.email)!} />
                </section>
            ) :(
                <section className='flex flex-col items-center justify-center h-screen gap-4'>
                    <p className='text-[rgba(0,59,51,1)] text-4xl'>I want to be a...</p>
                    <div className="flex gap-24">
                        <div onClick={() => updateDonor(donor?.email!, {...donor, activated: true})} className='rounded-2xl bg-[#f0f0f0] w-[180px] h-[140px] justify-center px-4 py-4 flex flex-col text-3xl gap-4 cursor-pointer items-center shadow-xl'>
                            <User width={32} height={32} />
                            Regular
                        </div>
                        <div onClick={() => addTeacher({ email: donor.email, cases: 0, status: 'Pending', pdf: [''], subject: 'Arabic' })} className='rounded-2xl bg-[#f0f0f0] w-[180px] h-[140px] justify-center px-4 py-4 flex flex-col text-3xl gap-4 cursor-pointer items-center shadow-xl'>
                            <GraduationCap width={32} height={32} />
                            Teacher
                        </div>
                        <div onClick={() => addDoctor({ email: donor.email, clinic: { address: '', area: '', cases: 0, governorate: 'Cairo', location: '', specialty: '' }, pdf: [''], status: 'Pending' })} className='rounded-2xl bg-[#f0f0f0] w-[180px] h-[140px] justify-center px-4 py-4 flex flex-col text-3xl gap-4 cursor-pointer items-center shadow-xl'>
                            <BriefcaseMedical width={32} height={32} />
                            Doctor
                        </div>
                    </div>
                </section>
            )}
        </>
    )
}