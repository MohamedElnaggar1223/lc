'use client'
import { SchoolSupplies } from "@/lib/store"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import Image from "next/image"

type Props = {
    details: SchoolSupplies
    category: "All" | "Clothes" | "Food" | "Toys" | "Medical Supplies" | "School Supplies" | "Blood Donation" | "Medical Cases" | "Teaching"
    schoolSupplies: "All" | "Books" | "Stationary" | "All"
}

export default function SchoolSuppliesPost({ category, details, schoolSupplies }: Props) 
{
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
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}