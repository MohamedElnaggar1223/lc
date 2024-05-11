'use client'
import { Toys } from "@/lib/store"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import Image from "next/image"

type Props = {
    details: Toys
    category: "All" | "Clothes" | "Food" | "Toys" | "Medical Supplies" | "School Supplies" | "Blood Donation" | "Medical Cases" | "Teaching"
    age: "All" | number
    gender: "All" | "Male" | "Female"
    toyCategory: 'Dolls' | 'Cars' | 'Stuffed Toys' | 'Sports' | 'Outdoor' | 'Board Games' | "All"
}

export default function ToysPost({ category, details, age, gender, toyCategory }: Props) 
{
    if (category !== "All" && category !== 'Toys') return null
    if (age !== "All" && details.age !== age) return null
    if(gender !== "All" && details.gender !== gender) return null
    if(toyCategory !== "All" && details.type !== toyCategory) return null

    return (
        <Accordion type="single" collapsible className="w-full no-underline">
            <AccordionItem value="item-1">
                <AccordionTrigger>
                    <div className='flex w-full px-12 flex-col gap-8 py-4'>
                        <div className='flex items-center justify-between w-full'>
                            <p className='text-2xl font-bold'>Gender: {details.gender}</p>
                            <p className='text-2xl font-bold'>Age: {details.age}</p>
                        </div>
                        <p className='text-2xl font-bold mr-auto'>type: {details.type}</p>
                    </div>
                </AccordionTrigger>
                <AccordionContent>
                    <div className='flex w-full px-12 items-center justify-between'>
                        <Image src={details.image} alt={details.type} width={200} height={200} />
                        <p className='text-2xl font-bold'>Quantity: {details.quantity}</p>
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}