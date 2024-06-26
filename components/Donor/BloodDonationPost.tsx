'use client'
import { BloodDonation, PostType, useOrganizationStore } from "@/lib/store"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { BadgeCheck, LocateFixed } from "lucide-react"  
import { useRef } from "react";

const containerStyle = { width: '408px', height: '400px', minWidth: '408px', minHeight: '400px' };
const center = { lat: -3.745, lng: -38.523 };

type Props = {
    details: BloodDonation
    category: "All" | "Clothes" | "Food" | "Toys" | "Medical Supplies" | "School Supplies" | "Blood Donation" | "Medical Cases" | "Teaching"
    governorate: 'All' | "Alexandria" | "Aswan" | "Asyut" | "Beheira" | "Beni Suef" | "Cairo" | "Dakahlia" | "Damietta" | "Faiyum" | "Gharbia" | "Giza" | "Ismailia" | "Kafr El Sheikh" | "Luxor" | "Matruh" | "Minya" | "Monufia" | "New Valley" | "North Sinai" | "Port Said" | "Qalyubia" | "Qena" | "Red Sea" | "Sharqia" | "Sohag" | "South Sinai" | "Suez"
    area: 'All' | "Maadi" | "Zamalek" | "Downtown" | "Heliopolis" | "Nasr City" | "6th of October City" | "Sheikh Zayed" | "New Cairo" | "El Rehab City" | "Madinet Nasr" | "El Shorouk City" | "El Tagamo' El Khames" | "El Obour City" | "El Mohandessin" | "El Agouza" | "El Dokki" | "El Haram"
    hospital: 'All' | string,
    post: PostType
}

export default function BloodDonationPost({ post, category, details, area, governorate, hospital }: Props) 
{
    const { organizations } = useOrganizationStore()

    const foundOrganization = organizations.find(org => org.email === post.organization)

    const mapRef = useRef(null)

    if (category !== "All" && category !== 'Blood Donation') return null
    if (governorate !== "All" && foundOrganization?.governorate !== governorate) return null
    if(area !== "All" && foundOrganization?.area !== area) return null
    if(hospital !== "All" && foundOrganization?.name !== hospital) return null

    const centerMapOnMarker = () => {
        if (mapRef.current) {
            //@ts-expect-error panTo
            mapRef.current.panTo(details.location)
        }
    }

    return (
        <Accordion type="single" collapsible className="w-full no-underline">
            <AccordionItem value="item-1">
                <AccordionTrigger>
                    <div className='flex w-full px-12 flex-col gap-8 py-4'>
                        <div className='flex items-center justify-between w-full'>
                            <p className='text-2xl font-bold'>Hospital: {foundOrganization?.name}</p>
                            <p className='text-2xl font-bold'>Blood Type: {details.bloodType}</p>
                        </div>
                        <div className='flex items-center justify-between w-full'>
                            <p className='text-2xl font-bold'>Governorate: {foundOrganization?.governorate}</p>
                            <p className='text-2xl font-bold'>Area: {foundOrganization?.area}</p>
                        </div>
                    </div>
                </AccordionTrigger>
                <AccordionContent>
                    <div className='flex w-full px-12 items-center justify-between'>
                        <LoadScript googleMapsApiKey={process.env.GOOGLE_API_KEY!}>
                            <GoogleMap
                                mapContainerStyle={containerStyle}
                                center={center}
                                zoom={10}
                                //@ts-expect-error mapRef is not null
                                onLoad={(map) => mapRef.current = map}
                            >
                                {details?.location && <Marker position={{ lat: details?.location.lat, lng: details?.location.lng }} />}
                                <div onClick={centerMapOnMarker} className='absolute right-2.5 bg-white top-40 px-[7.5px] rounded-sm cursor-pointer py-2 border border-[rgba(0,0,0,0.25)]'>
                                    <LocateFixed />
                                </div>
                            </GoogleMap>
                        </LoadScript>                        
                        <div>
                            <p className='text-2xl font-bold'>Patient Name: {details.nameOfPatient}</p>
                        </div>
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}