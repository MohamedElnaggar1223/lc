'use client'
import { MedicalSupplies } from "@/lib/store"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import Image from "next/image"

type Props = {
    details: MedicalSupplies
    category: "All" | "Clothes" | "Food" | "Toys" | "Medical Supplies" | "School Supplies" | "Blood Donation" | "Medical Cases" | "Teaching"
    medicalSupplies: 'All' | 'Medication' | 'Medical Devices' | 'Medical Equipment'
    medicationCategory: 'All' | "Painkillers" | "Antibiotics" | "Antivirals" | "Antifungals" | "Antiparasitics"
}

export default function MedicalSuppliesPost({ category, details, medicalSupplies, medicationCategory }: Props) 
{
    if (category !== "All" && category !== 'Medical Supplies') return null
    if (medicalSupplies !== "All" && details.type !== medicalSupplies) return null
    if(medicationCategory !== "All" && details.medicationType !== medicationCategory) return null

    return (
        <Accordion type="single" collapsible className="w-full no-underline">
            <AccordionItem value="item-1">
                <AccordionTrigger>
                    <div className='flex w-full px-12 flex-col gap-8 py-4'>
                        <div className='flex items-center justify-between w-full'>
                            <p className='text-2xl font-bold'>Type: {details.type}</p>
                            <p className='text-2xl font-bold'>Use: {details.use}</p>
                        </div>
                    </div>
                </AccordionTrigger>
                <AccordionContent>
                    <div className='flex w-full px-12 items-center justify-between'>
                        <Image src={details.image} alt={details.type} width={200} height={200} />
                        <div className='flex flex-col gap-8'>
                            {details.deviceType && <p className='text-2xl font-bold'>Device Type: {details.deviceType}</p>}
                            {details.medicationType && <p className='text-2xl font-bold'>Medication Type: {details.medicationType}</p>}
                            <p className='text-2xl font-bold'>Quantity: {details.quantity}</p>
                        </div>
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}