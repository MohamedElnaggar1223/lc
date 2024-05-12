import { Dialog, DialogContent } from "@/components/ui/dialog"
import { usePostsStore, MedicalCases } from "@/lib/store"
import { getCookie } from "cookies-next"
import { BadgeCheck } from "lucide-react"
import Image from "next/image"
import { ChangeEvent, useEffect, useRef, useState } from "react"

export default function CreateMedicalCasesPost() 
{
    const { addPost, posts } = usePostsStore()

    const nextId = posts.slice().sort((a, b) => a.id - b.id)[0].id + 1

    const [details, setDetails] = useState<MedicalCases>({
        description: '',
        location: {
            lat: 0,
            lng: 0
        },
        patientAge: 0,
        patientGender: 'Male',
        patientName: '',
        patientWeight: 0,
        speciality: 'Cardiology',
    })

    const organization = getCookie('organizationEmail')

    const [success, setSuccess] = useState(false)

    useEffect(() => {
        if(success) {
            setTimeout(() => {
                setSuccess(false)
            }, 3000)
        }
    }, [success])

    return (
        <div className='w-full flex flex-col items-start justify-between'>
            <div className='flex flex-col items-center justify-between gap-4'>
                <div className='flex flex-col gap-4'>
                    <div className='text-[rgba(0,59,51,1)] items-start flex flex-col text-2xl font-bold gap-2'>
                        <p className='text-lg'>Speciality: </p>
                        <select className="w-screen max-w-[408px] outline-none  border-2 border-[rgba(0,59,51,0.5)] shadow-md px-2 py-2 rounded-2xl" value={details.speciality} onChange={e => setDetails(prev => ({ ...prev, speciality: (e.target.value as "Cardiology" | "Dermatology" | "Orthopedics" | "Pediatrics" | "Neurology" | "Oncology" | "Gynecology" | "Urology" | "Psychiatry" | "Dentistry") }))}>
                        {["Cardiology", "Dermatology", "Orthopedics", "Pediatrics", "Neurology", "Oncology", "Gynecology", "Urology", "Psychiatry", "Dentistry"].map(option => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                        </select>
                    </div>
                    <div className='text-[rgba(0,59,51,1)] items-start flex flex-col text-2xl font-bold gap-2'>
                        <p className='text-lg'>Patient Name: </p>
                        <input className="w-screen max-w-[408px] outline-none  border-2 border-[rgba(0,59,51,0.5)] shadow-md px-2 py-2 rounded-2xl" type='text' value={details.patientName} onChange={e => setDetails(prev => ({ ...prev, patientName: e.target.value }))} />
                    </div>
                    <div className='text-[rgba(0,59,51,1)] items-start flex flex-col text-2xl font-bold gap-2'>
                        <p className='text-lg'>Patient Weight: </p>
                        <input className="w-screen max-w-[408px] outline-none  border-2 border-[rgba(0,59,51,0.5)] shadow-md px-2 py-2 rounded-2xl" type='number' value={details.patientWeight} onChange={e => setDetails(prev => ({ ...prev, patientWeight: parseInt(e.target.value) }))} />
                    </div>
                </div>
                <div className='flex flex-col gap-4'>
                    <div className='text-[rgba(0,59,51,1)] items-start flex flex-col text-2xl font-bold gap-2'>
                        <p className='text-lg'>Patient Age: </p>
                        <input className="w-screen max-w-[408px] outline-none  border-2 border-[rgba(0,59,51,0.5)] shadow-md px-2 py-2 rounded-2xl" type='number' value={details.patientAge} onChange={e => setDetails(prev => ({ ...prev, patientAge: parseInt(e.target.value) }))} />
                    </div>
                    <div className='text-[rgba(0,59,51,1)] items-start flex flex-col text-2xl font-bold gap-2'>
                        <p className='text-lg'>Patient Gender: </p>
                        <select className="w-screen max-w-[408px] outline-none  border-2 border-[rgba(0,59,51,0.5)] shadow-md px-2 py-2 rounded-2xl" value={details.patientGender} onChange={e => setDetails(prev => ({ ...prev, gender: (e.target.value as 'Male' | 'Female') }))}>
                            <option value='Male'>Male</option>
                            <option value='Female'>Female</option>
                        </select>  
                    </div>
                    <div className='text-[rgba(0,59,51,1)] items-start flex flex-col text-2xl font-bold gap-2'>
                        <p className='text-lg'>Description: </p>
                        <input className="w-screen max-w-[408px] outline-none  border-2 border-[rgba(0,59,51,0.5)] shadow-md px-2 py-2 rounded-2xl" type='number' value={details.description} onChange={e => setDetails(prev => ({ ...prev, description: (e.target.value) }))} />                
                    </div>
                </div>
            </div>
            <button onClick={() => {
                addPost({ id: nextId, organization: organization?.toString()!, details, status: 'Pending', category: 'Medical Cases' })
                setSuccess(true)
            }}
            className=" text-[#fff] bg-[rgba(0,59,51,1)] mx-auto mt-12 font-semibold text-xl py-2 rounded-2xl w-screen max-w-[408px] shadow-md"
            >Add Post</button>
            <Dialog open={success}>
                <DialogContent className='flex items-center gap-4 justify-center text-center'>
                    <BadgeCheck width={28} height={28} className='text-[#003B33]' />
                    <p className='text-[#003B33] font-bold text-lg'>Post Has Been Created!</p>
                </DialogContent>
            </Dialog>
        </div>
    )
}