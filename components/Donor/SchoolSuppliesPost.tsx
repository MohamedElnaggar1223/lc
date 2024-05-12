'use client'
import { SchoolSupplies } from "@/lib/store"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import Image from "next/image"
import { useState } from "react"

type Props = {
    details: SchoolSupplies
    category: "All" | "Clothes" | "Food" | "Toys" | "Medical Supplies" | "School Supplies" | "Blood Donation" | "Medical Cases" | "Teaching"
    schoolSupplies: "All" | "Books" | "Stationary" | "All"
}

export default function SchoolSuppliesPost({ category, details, schoolSupplies }: Props) 
{
    const [quantityDonated, setQuantityDonated] = useState(0)
    const [methodOfDelivery, setMethodOfDelivery] = useState<'Truck' | 'Car' | 'Motorcycle'>("Motorcycle")
    const [donated, setDonated] = useState(false)

    if (category !== "All" && category !== 'School Supplies') return null
    if (schoolSupplies !== "All" && details.type !== schoolSupplies) return null

    return (
        <Accordion type="single" collapsible className="w-full no-underline">
            <AccordionItem value="item-1">
                <AccordionTrigger>
                    <div className='flex w-full px-12 flex-col gap-8 py-4'>
                        <div className='flex items-center justify-between w-full'>
                            <p className='text-2xl font-bold'>Type: {details.type}</p>
                        </div>
                        {details.stationaryType && <p className='text-2xl font-bold mr-auto'>Item: {details.stationaryType}</p>}
                    </div>
                </AccordionTrigger>
                <AccordionContent>
                    {details.bookName && <div className='flex w-full px-12 items-center justify-between'>
                        <Image src={details.bookImage!} alt={details.type} width={200} height={200} />
                        <div className='flex flex-col'>
                            <p className='text-2xl font-bold'>Name: {details.bookName}</p>
                            <p className='text-2xl font-bold'>Author: {details.bookAuthor}</p>
                            <p className='text-2xl font-bold'>Edition: {details.bookEdition}</p>
                            <p className='text-2xl font-bold'>Language: {details.bookLanguage}</p>
                        </div>
                        <p className='text-2xl font-bold'>Summary: {details.bookSummary}</p>
                    </div>}
                    {donated ? (
                        <p className='text-2xl mt-6 font-bold text-center'>Thank you for your donation!</p>
                    ) : (
                        <div className='flex mt-6 px-12 items-center justify-between'>
                            <div className='flex gap-2 items-center justify-center'>
                                <div className='flex flex-col items-start justify-center gap-2'>
                                    <p className='text-md font-bold text-[rgba(0,0,0,0.6)]'>Quantity: </p>
                                    <select className="w-screen max-w-[208px] outline-none  border-2 border-[rgba(0,59,51,0.5)] shadow-md px-2 py-2 rounded-2xl" value={quantityDonated} onChange={(e) => setQuantityDonated(parseInt(e.target.value))}>
                                        {[...Array(19)].map((_, i) => (
                                            <option key={i + 1} value={i + 1}>{i + 1}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className='flex flex-col items-start justify-center gap-2'>
                                    <p className='text-md font-bold text-[rgba(0,0,0,0.6)]'>Method of Transportation: </p>
                                    <select className="w-screen max-w-[208px] outline-none  border-2 border-[rgba(0,59,51,0.5)] shadow-md px-2 py-2 rounded-2xl" value={methodOfDelivery} onChange={(e) => setMethodOfDelivery(e.target.value as 'Truck' | 'Car' | 'Motorcycle')}>
                                        {['Truck', 'Car', 'Motorcycle'].map((i) => (
                                            <option key={i} value={i}>{i}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <button onClick={() => setDonated(true)} className='bg-[#F4D8C2] text-white rounded-md px-6 mt-2 ml-auto mr-12 py-2 flex items-center gap-2'>Donate</button>
                        </div>
                    )}
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}