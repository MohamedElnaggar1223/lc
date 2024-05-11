import { Clothes } from "@/lib/store"

type Props = {
    details: Clothes
    category: "All" | "Clothes" | "Food" | "Toys" | "Medical Supplies" | "School Supplies" | "Blood Donation" | "Medical Cases" | "Teaching"
    age: "All" | number
    gender: "All" | "Male" | "Female"
    season: "All" | "Summer" | "Winter" | "Spring" | "Fall"
}

export default function ClothesPost({ category, details, age, gender, season }: Props) 
{
    if (category !== "All" && category !== 'Clothes') return null
    if (age !== "All" && details.age !== age) return null
    if(gender !== "All" && details.gender !== gender) return null
    if(season !== "All" && details.season !== season) return null

    return (
        <div className='flex w-full px-12 flex-col gap-8 py-4'>
            <div className='flex items-center justify-between w-full'>
                <p className='text-2xl font-bold'>Gender: {details.gender}</p>
                <p className='text-2xl font-bold'>Age: {details.age}</p>
            </div>
            <p className='text-2xl font-bold'>Season: {details.season}</p>
        </div>
    )
}