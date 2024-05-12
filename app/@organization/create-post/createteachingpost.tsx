import { Dialog, DialogContent } from "@/components/ui/dialog"
import { usePostsStore, Teaching } from "@/lib/store"
import { getCookie } from "cookies-next"
import { BadgeCheck } from "lucide-react"
import Image from "next/image"
import { ChangeEvent, useEffect, useRef, useState } from "react"

export default function CreateTeachingPost() 
{
    const { addPost, posts } = usePostsStore()

    const nextId = posts.slice().sort((a, b) => a.id - b.id)[0].id + 1

    const [details, setDetails] = useState<Teaching>({
        location: {
            lat: 0,
            lng: 0
        },
        subject: 'Math',
        numberOfStudents: 0,
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
                <select value={details.subject} onChange={e => setDetails(prev => ({ ...prev, subject: (e.target.value as "Arabic" | "Art" | "Biology" | "Chemistry" | "Computer Science" | "English" | "French" | "Geography" | "History" | "Math" | "Music" | "Physics" | "Physical Education" | "Religion" | "Social Studies" | "Spanish") }))}>
                {["Arabic", "Art", "Biology", "Chemistry", "Computer Science", "English", "French", "Geography", "History", "Math", "Music", "Physics", "Physical Education", "Religion", "Social Studies", "Spanish"].map(option => (
                    <option key={option} value={option}>{option}</option>
                ))}
                </select>
                <input type='number' value={details.numberOfStudents} onChange={e => setDetails(prev => ({ ...prev, numberOfStudents: parseInt(e.target.value) }))} />
            </div>
            <button onClick={() => {
                addPost({ id: nextId, organization: organization?.toString()!, details, status: 'Pending', category: 'Teaching' })
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