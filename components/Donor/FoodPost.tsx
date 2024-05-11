import { Food } from "@/lib/store"

type Props = {
    details: Food
    category: "All" | "Clothes" | "Food" | "Toys" | "Medical Supplies" | "School Supplies" | "Blood Donation" | "Medical Cases" | "Teaching"
    foodCategory: 'Vegetables' | 'Fruits' | 'Baked Goods' | 'Fresh Meals' | 'Canned Food' | 'All'
}

export default function FoodPost({ category, details, foodCategory }: Props) 
{
    if (category !== "All" && category !== 'Food') return null
    if (foodCategory !== "All" && details.type !== foodCategory) return null

    return (
        <div className='flex w-full px-12 flex-col gap-8 py-4'>
            <div className='flex items-center justify-between w-full'>
                <p className='text-2xl font-bold'>Name: {details.name}</p>
                <p className='text-2xl font-bold'>Type: {details.type}</p>
            </div>
            <p className='text-2xl font-bold'>Quantity: {details.quantity}</p>
        </div>
    )
}