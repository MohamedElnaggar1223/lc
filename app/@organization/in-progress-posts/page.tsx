'use client'
import { Clothes, usePostsStore } from "@/lib/store"
import { getCookie } from "cookies-next"
import ClothesPost from "./clothespost"
import { useMemo } from "react"

export default function InProgressPosts() 
{
    const organization = getCookie('organizationEmail')

    const { posts } = usePostsStore()

    const organizationPosts = useMemo(() => {
        return posts.filter(post => post.organization === organization)
    }, [posts]) 

    return (
        <section className='flex flex-col gap-8 px-8 py-8 overflow-auto'>
            <div className='flex flex-col bg-[#f0f0f0] divide-y rounded-3xl border-[rgba(0,59,51,0.5)] gap-12 py-8 mx-auto border-8 w-screen max-w-[1080px]'>
                {organizationPosts.map((post, index) => {
                    const category = post.category
                    if(category === 'Clothes')
                    {
                        const details = post.details as Clothes
                        return (
                            <ClothesPost key={index} post={post} postDetails={details} index={index} />
                        )   
                    }
                })}
            </div>
        </section>
    )
}