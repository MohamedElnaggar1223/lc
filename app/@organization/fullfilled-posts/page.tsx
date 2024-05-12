'use client'
import { useDonorStore } from "@/lib/store"
import { Trash2 } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function FullfilledPosts()
{
    const { donors } = useDonorStore()

    const [medicalPosts, setMedicalPosts] = useState([
        {
            speciality: 'Cardiology',
            patientName: 'John Doe',
            patientAge: 45,
            patientGender: 'Male',
            patientWeight: 70,
            description: 'Patient needs a heart transplant.',
            fullfilledBy: 'donor8@example.com'
        },
        {
            speciality: 'Dermatology',
            patientName: 'Jane Smith',
            patientAge: 32,
            patientGender: 'Female',
            patientWeight: 60,
            description: 'Patient needs a skin graft.',
            fullfilledBy: 'donor4@example.com'
        }
    ])

    const [teacherPosts, setTeacherPosts] = useState([
        {
            subject: 'Math',
            numberOfStudents: 30,
            fullfilledBy: 'donor3@example.com',
        },
        {
            subject: 'Science',
            numberOfStudents: 25,
            fullfilledBy: 'donor3@example.com',
        },
        {
            subject: 'English',
            numberOfStudents: 20,
            fullfilledBy: 'donor3@example.com'
        }
    ])
    return (
        <section className='flex flex-col gap-8 px-8 py-8 overflow-auto'>
            <div className='flex flex-col bg-[#fff] divide-y rounded-3xl border-[rgba(0,59,51,0.5)] gap-12 py-8 mx-auto border-8 w-screen max-w-[1080px]'>
                {medicalPosts.map((post, index) => (
                    <div className='px-12 flex flex-col gap-4'>
                        <div className='flex items-center justify-between py-4 gap-8'>
                            <p className='text-[rgba(0,59,51,1)] text-2xl'>{index + 1}</p>
                            <div className='flex flex-col flex-1 gap-3'>
                                <p className='text-[rgba(0,59,51,1)] text-2xl'>{post.patientName}</p>
                                <p className='text-[rgba(0,59,51,1)] text-xl'>{post.patientAge} Years</p>
                                <p className='text-[rgba(0,59,51,1)] text-lg'>{post.description}</p>
                            </div>
                            <div className='flex flex-col flex-1 gap-3'>
                                <p className='text-[rgba(0,59,51,1)] text-lg'>{post.patientGender}</p>
                                <p className='text-[rgba(0,59,51,1)] text-lg'>{post.patientWeight} KG</p>
                                <p className='text-[rgba(0,59,51,1)] text-lg'>Speciality: {post.speciality}</p>
                            </div>
                            <Trash2 onClick={() => setMedicalPosts(prev => prev.slice().filter((p, i) => i !== index))} className='cursor-pointer' />
                        </div>
                        <p>Fullfilled By: <Link href={`/donors/${post.fullfilledBy}`} className='underline'>{donors.find(donor => donor.email === post.fullfilledBy)?.firstName} {donors.find(donor => donor.email === post.fullfilledBy)?.lastName}</Link></p>
                    </div>
                ))}
                {teacherPosts.map((post, index) => (
                    <div className='px-12 flex flex-col gap-4'>
                        <div className='flex items-center justify-between py-4 gap-8'>
                            <p className='text-[rgba(0,59,51,1)] text-2xl'>{index + 1}</p>
                            <div className='flex flex-col flex-1 gap-3'>
                                <p className='text-[rgba(0,59,51,1)] text-2xl'>{post.subject}</p>
                                <p className='text-[rgba(0,59,51,1)] text-xl'>{post.numberOfStudents} Students</p>
                            </div>
                            <Trash2 onClick={() => setTeacherPosts(prev => prev.slice().filter((p, i) => i !== index))} className='cursor-pointer' />
                        </div>
                        <p>Fullfilled By: <Link href={`/donors/${post.fullfilledBy}`} className='underline'>{donors.find(donor => donor.email === post.fullfilledBy)?.firstName} {donors.find(donor => donor.email === post.fullfilledBy)?.lastName}</Link></p>
                    </div>
                ))}
            </div>
        </section>
    )
}