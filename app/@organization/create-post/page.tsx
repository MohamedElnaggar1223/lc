'use client'
import { usePostsStore } from "@/lib/store"
import { useState } from "react"
import CreateClothesPost from "./createclothespost"
import CreateFoodPost from "./createfoodpost"
import CreateToysPost from "./createtoyspost"
import CreateMedicalSuppliesPost from "./createmedicalsuppliespost"
import CreateSchoolSuppliesPost from "./createschoolsuppliespost"
import CreateBloodDonationPost from "./createblooddonationpost"
import CreateMedicalCasesPost from "./createmedicalcasespost"
import CreateTeachingPost from "./createteachingpost"

export default function CreatePost() 
{
    const { addPost } = usePostsStore()

    const [category, setCategory] = useState<'Clothes' | 'Food' | 'Toys' | 'Medical Supplies' | 'School Supplies' | 'Blood Donation' | 'Medical Cases' | 'Teaching'>('Clothes')

    return (
        <section className='flex flex-col gap-8 px-8 py-8 overflow-auto'>
            <h1 className='text-[rgba(0,59,51,1)] text-4xl font-bold'>Create Post</h1>
            <div className='text-[rgba(0,59,51,1)] text-2xl font-bold'>
                Category: 
                <select value={category} onChange={e => setCategory(e.target.value as 'Clothes' | 'Food' | 'Toys' | 'Medical Supplies' | 'School Supplies' | 'Blood Donation' | 'Medical Cases' | 'Teaching')}>
                    <option value='Clothes'>Clothes</option>
                    <option value='Food'>Food</option>
                    <option value='Toys'>Toys</option>
                    <option value='Medical Supplies'>Medical Supplies</option>
                    <option value='School Supplies'>School Supplies</option>
                    <option value='Blood Donation'>Blood Donation</option>
                    <option value='Medical Cases'>Medical Cases</option>
                    <option value='Teaching'>Teaching</option>
                </select>
            </div>
            {category === 'Clothes' && <CreateClothesPost />}
            {category === 'Food' && <CreateFoodPost />}
            {category === 'Toys' && <CreateToysPost />}
            {category === 'Medical Supplies' && <CreateMedicalSuppliesPost />}
            {category === 'School Supplies' && <CreateSchoolSuppliesPost />}
            {category === 'Blood Donation' && <CreateBloodDonationPost />}
            {category === 'Medical Cases' && <CreateMedicalCasesPost />}
            {category === 'Teaching' && <CreateTeachingPost />}
        </section>            
    )
}