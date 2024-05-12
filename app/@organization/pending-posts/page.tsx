'use client'
import { BloodDonation, Clothes, Food, MedicalCases, MedicalSupplies, SchoolSupplies, Teaching, Toys, usePostsStore } from "@/lib/store"
import { getCookie } from "cookies-next"
import ClothesPost from "./clothespost"
import { useMemo } from "react"
import FoodPost from "./foodpost"
import ToysPost from "./toyspost"
import MedicalSuppliesPost from "./medicalsuppliespost"
import SchoolSuppliesPost from "./schoolsuppliespost"
import TeachingPost from "./teachingpost"
import BloodDonationPost from "./blooddonationpost"
import MedicalCasesPost from "./medicalcasespost"

export default function InProgressPosts() 
{
    const organization = getCookie('organizationEmail')

    const { posts } = usePostsStore()

    const organizationPosts = useMemo(() => {
        return posts.filter(post => post.organization === organization).filter(post => post.status === 'Pending')
    }, [posts])

    return (
        <section className='flex flex-col gap-8 px-8 py-8 overflow-auto'>
            <div className='flex flex-col bg-[#fff] divide-y rounded-3xl border-[rgba(0,59,51,0.5)] gap-12 py-8 mx-auto border-8 w-screen max-w-[1080px]'>
                {organizationPosts.map((post, index) => {
                    const category = post.category
                    if(category === 'Clothes')
                    {
                        const details = post.details as Clothes
                        return (
                            <ClothesPost key={post.id} post={post} postDetails={details} index={index} />
                        )   
                    }
                    else if(category === 'Food')
                    {
                        const details = post.details as Food
                        return <FoodPost key={post.id} post={post} postDetails={details} index={index} />
                    }
                    else if(category === 'Toys')
                    {
                        const details = post.details as Toys
                        return <ToysPost key={post.id} post={post} postDetails={details} index={index} />
                    }
                    else if(category === 'Medical Supplies')
                    {
                        const details = post.details as MedicalSupplies
                        return <MedicalSuppliesPost key={post.id} post={post} postDetails={details} index={index} />   
                    }
                    else if(category === 'School Supplies')
                    {
                        const details = post.details as SchoolSupplies
                        return <SchoolSuppliesPost key={post.id} post={post} postDetails={details} index={index} />   
                    }
                    else if(category === 'Medical Cases')
                    {
                        const details = post.details as MedicalCases
                        return <MedicalCasesPost key={post.id} post={post} postDetails={details} index={index} />   
                    }
                    else if(category === 'Teaching')
                    {
                        const details = post.details as Teaching
                        return <TeachingPost key={post.id} post={post} postDetails={details} index={index} />
                    }
                    else if(category === 'Blood Donation')
                    {
                        const details = post.details as BloodDonation
                        return <BloodDonationPost key={post.id} post={post} postDetails={details} index={index} />
                    }
                })}
            </div>
        </section>
    )
}