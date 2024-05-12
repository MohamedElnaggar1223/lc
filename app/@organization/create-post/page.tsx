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
    const [category, setCategory] = useState<'Clothes' | 'Food' | 'Toys' | 'Medical Supplies' | 'School Supplies' | 'Blood Donation' | 'Medical Cases' | 'Teaching'>('Clothes')

    return (
        <section className='flex flex-col gap-8 px-8 py-8 overflow-auto'>
            <div className='flex px-12 flex-col bg-[#fff] rounded-3xl border-[rgba(0,59,51,0.5)] gap-12 py-8 mx-auto border-8 w-screen max-w-[1080px]'>
                <h1 className='text-[rgba(0,59,51,1)] text-4xl font-bold w-full text-center'>Create Post</h1>
                <div className='text-[rgba(0,59,51,1)] items-center flex text-2xl font-bold gap-8'>
                    <p>Category:</p> 
                    <select className="w-screen max-w-[408px] outline-none  border-2 border-[rgba(0,59,51,0.5)] shadow-md px-2 py-2 rounded-2xl" value={category} onChange={e => setCategory(e.target.value as 'Clothes' | 'Food' | 'Toys' | 'Medical Supplies' | 'School Supplies' | 'Blood Donation' | 'Medical Cases' | 'Teaching')}>
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
            </div>
        </section>            
    )
}