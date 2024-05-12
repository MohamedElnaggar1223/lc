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
        <div className='flex flex-col gap-4'>
            <div className='flex flex-col gap-4'>
                <select value={details.speciality} onChange={e => setDetails(prev => ({ ...prev, subject: (e.target.value as "Cardiology" | "Dermatology" | "Orthopedics" | "Pediatrics" | "Neurology" | "Oncology" | "Gynecology" | "Urology" | "Psychiatry" | "Dentistry") }))}>
                {["Cardiology", "Dermatology", "Orthopedics", "Pediatrics", "Neurology", "Oncology", "Gynecology", "Urology", "Psychiatry", "Dentistry"].map(option => (
                    <option key={option} value={option}>{option}</option>
                ))}
                </select>
                <input type='text' value={parseInt(details.patientName)} onChange={e => setDetails(prev => ({ ...prev, patientName: e.target.value }))} />
                <input type='number' value={details.patientWeight} onChange={e => setDetails(prev => ({ ...prev, name: e.target.value }))} />
            </div>
            <div className='flex flex-col gap-4'>
                <input type='text' value={details.patientAge} onChange={e => setDetails(prev => ({ ...prev, patientAge: parseInt(e.target.value) }))} />
                <select value={details.patientGender} onChange={e => setDetails(prev => ({ ...prev, gender: (e.target.value as 'Male' | 'Female') }))}>
                    <option value='Male'>Male</option>
                    <option value='Female'>Female</option>
                </select>  
                <input type='number' value={details.description} onChange={e => setDetails(prev => ({ ...prev, description: (e.target.value) }))} />                
            </div>
            <button onClick={() => {
                addPost({ id: nextId, organization: organization?.toString()!, details, status: 'Pending', category: 'Medical Cases' })
                setSuccess(true)
            }}>Add Post</button>
            <Dialog open={success}>
                <DialogContent className='flex items-center gap-4 justify-center text-center'>
                    <BadgeCheck width={28} height={28} className='text-[#003B33]' />
                    <p className='text-[#003B33] font-bold text-lg'>Post Has Been Created!</p>
                </DialogContent>
            </Dialog>
        </div>
    )
}