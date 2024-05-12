import { Dialog, DialogContent } from "@/components/ui/dialog"
import { usePostsStore, Food } from "@/lib/store"
import { getCookie } from "cookies-next"
import { BadgeCheck } from "lucide-react"
import { useEffect, useState } from "react"

export default function CreateFoodPost() 
{
    const { addPost, posts } = usePostsStore()

    const nextId = posts.slice().sort((a, b) => a.id - b.id)[0].id + 1

    const [details, setDetails] = useState<Food>({
        name: '',
        quantity: '0KG',
        type: 'Vegetables'
    })

    useEffect(() => {
        if(details.type === 'Vegetables' || details.type === 'Fruits')
        {
            if(!details.quantity.includes("KG")) setDetails(prev => ({ ...prev, quantity: details.quantity + 'KG' }))
        }
        else
        {
            if(details.quantity.includes("KG")) setDetails(prev => ({ ...prev, quantity: details.quantity.replace("KG", "") }))
        }
    }, [details])

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
            <div className='flex items-center justify-between'>
                <div className='text-[rgba(0,59,51,1)] items-start flex flex-col text-2xl font-bold gap-2'>
                    <p className='text-lg'>Quantity: </p>
                    <input className="w-screen max-w-[408px] outline-none  border-2 border-[rgba(0,59,51,0.5)] shadow-md px-2 py-2 rounded-2xl" type='number' value={parseInt(details.quantity)} onChange={e => setDetails(prev => ({ ...prev, quantity: details.type === 'Vegetables' || details.type === 'Fruits' ? e.target.value + 'KG' : e.target.value.replace("KG", "") }))} />
                </div>
                <div className='text-[rgba(0,59,51,1)] items-start flex flex-col text-2xl font-bold gap-2'>
                    <p className='text-lg'>Type: </p>
                    <select className="w-screen max-w-[408px] outline-none  border-2 border-[rgba(0,59,51,0.5)] shadow-md px-2 py-2 rounded-2xl" value={details.type} onChange={e => setDetails(prev => ({ ...prev, type: (e.target.value as "Vegetables" | "Fruits" | "Baked Goods" | "Fresh Meals" | "Canned Food") }))}>
                        <option value='Vegetables'>Vegetables</option>
                        <option value='Fruits'>Fruits</option>
                        <option value='Baked Goods'>Baked Goods</option>
                        <option value='Fresh Meals'>Fresh Meals</option>
                        <option value='Canned Food'>Canned Food</option>
                    </select>
                </div>
            </div>
            <div className='text-[rgba(0,59,51,1)] items-start flex flex-col text-2xl font-bold gap-2'>
                <p className='text-lg'>Name: </p>
                <input className="w-screen max-w-[408px] outline-none  border-2 border-[rgba(0,59,51,0.5)] shadow-md px-2 py-2 rounded-2xl" type='text' value={details.name} onChange={e => setDetails(prev => ({ ...prev, name: e.target.value }))} />
            </div>
            <button onClick={() => {
                addPost({ id: nextId, organization: organization?.toString()!, details, status: 'Pending', category: 'Food' })
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