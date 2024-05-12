import { Dialog, DialogContent } from "@/components/ui/dialog"
import { usePostsStore, BloodDonation } from "@/lib/store"
import { getCookie } from "cookies-next"
import { BadgeCheck } from "lucide-react"
import Image from "next/image"
import { ChangeEvent, useEffect, useRef, useState } from "react"

export default function CreateBloodDonationPost() 
{
    const { addPost, posts } = usePostsStore()

    const [success, setSuccess] = useState(false)

    const nextId = posts.slice().sort((a, b) => a.id - b.id)[0].id + 1

    const [details, setDetails] = useState<BloodDonation>({
        bloodType: 'A+',
        nameOfPatient: '',
        location: {
            lat: 0,
            lng: 0
        }
    })

    const organization = getCookie('organizationEmail')

    useEffect(() => {
        if(success) {
            setTimeout(() => {
                setSuccess(false)
            }, 3000)
        }
    }, [success])

    return (
        <div className='flex flex-col gap-4'>
            <div className='flex items-center justify-between w-full'>
                <div className='text-[rgba(0,59,51,1)] items-start flex flex-col text-2xl font-bold gap-2'>
                    <p className='text-lg'>Blood Type: </p>
                    <select className="w-screen max-w-[408px] outline-none  border-2 border-[rgba(0,59,51,0.5)] shadow-md px-2 py-2 rounded-2xl" value={details.bloodType} onChange={e => setDetails(prev => ({ ...prev, bloodType: (e.target.value as 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-') }))}>
                        <option value='A+'>A+</option>
                        <option value='A-'>A-</option>
                        <option value='B+'>B+</option>
                        <option value='B-'>B-</option>
                        <option value='AB+'>AB+</option>
                        <option value='AB-'>AB-</option>
                        <option value='O+'>O+</option>
                        <option value='O-'>O-</option>
                    </select>
                </div>
                <div className='text-[rgba(0,59,51,1)] items-start flex flex-col text-2xl font-bold gap-2'>
                    <p className='text-lg'>Patient Name: </p>
                    <input className="w-screen max-w-[408px] outline-none  border-2 border-[rgba(0,59,51,0.5)] shadow-md px-2 py-2 rounded-2xl" type='text' value={details.nameOfPatient} onChange={e => setDetails(prev => ({ ...prev, nameOfPatient: e.target.value }))} />
                </div>
            </div>
            <button onClick={() => {
                addPost({ id: nextId, organization: organization?.toString()!, details, status: 'Pending', category: 'Blood Donation' })
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