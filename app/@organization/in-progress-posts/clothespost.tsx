import { Clothes, PostType, usePostsStore } from "@/lib/store"
import { Edit, Save, Trash2 } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

type Props = {
    post: PostType
    postDetails: Clothes
    index: number
}

export default function ClothesPost({ post, postDetails, index }: Props) 
{
    const [details, setDetails] = useState(postDetails)
    const [isEditing, setIsEditing] = useState(false)

    const { updatePost, removePost } = usePostsStore()

    return (
        <div className='flex px-8 w-full gap-4 items-center justify-between'>
            <p className='text-[rgba(0,59,51,1)] text-2xl'>{index + 1}</p>
            {isEditing ? (
                <div className='flex gap-4'>
                    <input type='number' value={details.age} onChange={e => setDetails(prev => ({ ...prev, age: parseInt(e.target.value) }))} />
                    <select value={details.gender} onChange={e => setDetails(prev => ({ ...prev, gender: (e.target.value as 'Male' | 'Female') }))}>
                        <option value='Male'>Male</option>
                        <option value='Female'>Female</option>
                    </select>
                    <select value={details.season} onChange={e => setDetails(prev => ({ ...prev, season: (e.target.value as 'Summer' | 'Winter' | 'Spring' | 'Fall') }))}>
                        <option value='Winter'>Winter</option>
                        <option value='Spring'>Spring</option>
                        <option value='Summer'>Summer</option>
                        <option value='Fall'>Fall</option>
                    </select>
                </div>
            ) : (
                <div className='flex px-12 flex-1 flex-col gap-4'>
                    <p className='text-[rgba(0,59,51,1)] text-2xl'>Age: {details.age}</p>
                    <p className='text-[rgba(0,59,51,1)] text-2xl'>Gender: {details.gender}</p>
                    <p className='text-[rgba(0,59,51,1)] text-2xl'>Season: {details.season}</p>
                </div>
            )}
            <div className='flex items-center justify-center flex-col gap-8'>
                {isEditing ? <Save onClick={() => {
                    setIsEditing(false)
                    updatePost(post.id, {...post, details})
                }} className='cursor-pointer' /> : <Edit onClick={() => setIsEditing(true)} className='cursor-pointer' />}
                <Trash2 onClick={() => removePost(post.id)} className='cursor-pointer' />
            </div>
        </div>
    )
}