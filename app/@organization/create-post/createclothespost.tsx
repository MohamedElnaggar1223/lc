import { Dialog, DialogContent } from "@/components/ui/dialog"
import { usePostsStore, Clothes } from "@/lib/store"
import { getCookie } from "cookies-next"
import { BadgeCheck } from "lucide-react"
import { useEffect, useState } from "react"

export default function CreateClothesPost() 
{
    const { addPost, posts } = usePostsStore()

    const nextId = posts.slice().sort((a, b) => a.id - b.id)[0].id + 1

    const [details, setDetails] = useState<Clothes>({
        age: 0,
        gender: 'Male',
        season: 'Winter'
    })

    const [success, setSuccess] = useState(false)

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
            <div className='flex items-center justify-between'>
                <div className='text-[rgba(0,59,51,1)] items-start flex flex-col text-2xl font-bold gap-2'>
                    <p className='text-lg'>Quantity: </p>
                    <input className="w-screen max-w-[408px] outline-none  border-2 border-[rgba(0,59,51,0.5)] shadow-md px-2 py-2 rounded-2xl" type='number' value={details?.age} onChange={e => setDetails(prev => ({ ...prev, age: parseInt(e.target.value) }))} />
                </div>
                <div className='text-[rgba(0,59,51,1)] items-start flex flex-col text-2xl font-bold gap-2'>
                    <p className='text-lg'>Gender: </p>
                    <select className="w-screen max-w-[408px] outline-none  border-2 border-[rgba(0,59,51,0.5)] shadow-md px-2 py-2 rounded-2xl" value={details?.gender} onChange={e => setDetails(prev => ({ ...prev, gender: (e.target.value as 'Male' | 'Female') }))}>
                        <option value='Male'>Male</option>
                        <option value='Female'>Female</option>
                    </select>
                </div>
            </div>
            <div className='text-[rgba(0,59,51,1)] items-start flex flex-col text-2xl font-bold gap-2'>
                <p className='text-lg'>Gender: </p>
                <select className="w-screen max-w-[408px] outline-none  border-2 border-[rgba(0,59,51,0.5)] shadow-md px-2 py-2 rounded-2xl" value={details?.season} onChange={e => setDetails(prev => ({ ...prev, season: (e.target.value as 'Summer' | 'Winter' | 'Spring' | 'Fall') }))}>
                    <option value='Winter'>Winter</option>
                    <option value='Spring'>Spring</option>
                    <option value='Summer'>Summer</option>
                    <option value='Fall'>Fall</option>
                </select>
            </div>
            <button 
                onClick={() => {
                    addPost({ id: nextId, organization: organization?.toString()!, details, status: 'Pending', category: 'Clothes' })
                    setSuccess(true)
                }}
                className=" text-[#fff] bg-[rgba(0,59,51,1)] mx-auto mt-12 font-semibold text-xl py-2 rounded-2xl w-screen max-w-[408px] shadow-md"
            >
                Add Post
            </button>
            <Dialog open={success}>
                <DialogContent className='flex items-center gap-4 justify-center text-center'>
                    <BadgeCheck width={28} height={28} className='text-[#003B33]' />
                    <p className='text-[#003B33] font-bold text-lg'>Post Has Been Created!</p>
                </DialogContent>
            </Dialog>
        </div>
    )
}