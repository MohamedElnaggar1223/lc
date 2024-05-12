'use client'
import BloodDonationPost from "@/app/@organization/pending-posts/blooddonationpost"
import ClothesPost from "@/app/@organization/pending-posts/clothespost"
import FoodPost from "@/app/@organization/pending-posts/foodpost"
import MedicalCasesPost from "@/app/@organization/pending-posts/medicalcasespost"
import MedicalSuppliesPost from "@/app/@organization/pending-posts/medicalsuppliespost"
import SchoolSuppliesPost from "@/app/@organization/pending-posts/schoolsuppliespost"
import TeachingPost from "@/app/@organization/pending-posts/teachingpost"
import ToysPost from "@/app/@organization/pending-posts/toyspost"
import { usePostsStore, Clothes, Food, Toys, MedicalSupplies, SchoolSupplies, MedicalCases, Teaching, BloodDonation } from "@/lib/store"
import { getCookie } from "cookies-next"
import { useMemo } from "react"

export default function InProgressPosts()
{
    const { posts } = usePostsStore()

    const organizationPosts = useMemo(() => {
        return posts.filter(post => post.status === 'In Progress')
    }, [posts])

    console.log(organizationPosts)

    return (
        <section className='flex flex-col gap-8 px-8 py-8 overflow-auto'>
            <div className='flex flex-col bg-[#fff] divide-y rounded-3xl border-[rgba(0,59,51,0.5)] gap-12 py-8 mx-auto border-8 w-screen max-w-[1080px]'>
                {organizationPosts.map((post, index) => {
                    const category = post.category
                    if(category === 'Clothes')
                    {
                        const details = post.details as Clothes
                        return (
                            <ClothesPost key={post.id} post={post} postDetails={details} index={index} pending />
                        )   
                    }
                    else if(category === 'Food')
                    {
                        const details = post.details as Food
                        return <FoodPost key={post.id} post={post} postDetails={details} index={index} pending />
                    }
                    else if(category === 'Toys')
                    {
                        const details = post.details as Toys
                        return <ToysPost key={post.id} post={post} postDetails={details} index={index} pending />
                    }
                    else if(category === 'Medical Supplies')
                    {
                        const details = post.details as MedicalSupplies
                        return <MedicalSuppliesPost key={post.id} post={post} postDetails={details} index={index} pending />   
                    }
                    else if(category === 'School Supplies')
                    {
                        const details = post.details as SchoolSupplies
                        return <SchoolSuppliesPost key={post.id} post={post} postDetails={details} index={index} pending />   
                    }
                    else if(category === 'Medical Cases')
                    {
                        const details = post.details as MedicalCases
                        return <MedicalCasesPost key={post.id} post={post} postDetails={details} index={index} pending />   
                    }
                    else if(category === 'Teaching')
                    {
                        const details = post.details as Teaching
                        return <TeachingPost key={post.id} post={post} postDetails={details} index={index} pending />
                    }
                    else if(category === 'Blood Donation')
                    {
                        const details = post.details as BloodDonation
                        return <BloodDonationPost key={post.id} post={post} postDetails={details} index={index} pending />
                    }
                })}
            </div>
        </section>
    )
}