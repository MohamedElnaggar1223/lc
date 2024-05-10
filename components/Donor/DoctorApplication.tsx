'use client'
import { Doctor, useDoctorStore, useDonorStore } from "@/lib/store"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { useRouter } from "next/navigation"
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { governorates } from "@/constants"
import { useState, useEffect, useRef } from "react"
import { LocateFixed } from "lucide-react"

type Props = {
    doctor: Doctor
}

const containerStyle = { width: '600px', height: '400px', minWidth: '600px', minHeight: '400px' };
const center = { lat: -3.745, lng: -38.523 };

export default function DoctorApplication({ doctor }: Props)
{
    const router = useRouter()

    const { updateDoctor } = useDoctorStore()
    const { donors, updateDonor } = useDonorStore()

    const mapRef = useRef(null);

    const [currentLocation, setCurrentLocation] = useState({ lat: 0, lng: 0 });

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((data) => setCurrentLocation({ lat: data.coords.latitude, lng: data.coords.longitude}))
    }, []);

    const doctorSchema = z.object({
        clinicAddress: z.string().min(2, {
            message: "Clinic address must be at least 2 characters.",
        }),
        clinicArea: z.string().min(2, {
            message: "Clinic area must be at least 2 characters.",
        }),
        clinicGovernorate: z.enum(["Alexandria", "Aswan", "Asyut", "Beheira", "Beni Suef", "Cairo", "Dakahlia", "Damietta", "Faiyum", "Gharbia", "Giza", "Ismailia", "Kafr El Sheikh", "Luxor", "Matruh", "Minya", "Monufia", "New Valley", "North Sinai", "Port Said", "Qalyubia", "Qena", "Red Sea", "Sharqia", "Sohag", "South Sinai", "Suez"], {
            message: 'Governorate must be a valid governorate.'
        }),
        clinicLocation: z.object({
            lat: z.number(),
            lng: z.number(),
        }),
        clinicSpecialty: z.string().min(2, {
            message: "Clinic specialty must be at least 2 characters.",
        }),
        clinicCases: z.string().refine((value) => !isNaN(Number(value)), {
            message: "Cases must be a number."
        }),
        pdf: z.array(z.string()).min(1, {
            message: "Please upload at least one document."
        }),
    })

    const form = useForm<z.infer<typeof doctorSchema>>({
        resolver: zodResolver(doctorSchema),
        defaultValues: {
            clinicAddress: '',
            clinicArea: '',
            clinicGovernorate: 'Cairo',
            clinicLocation: currentLocation,
            clinicSpecialty: '',
            clinicCases: '',
        },
    })

    const selectLocation = (e: google.maps.MapMouseEvent) => {
        const lat = e.latLng?.lat() ?? 0;
        const lng = e.latLng?.lng() ?? 0;
        
        console.log(lat, lng)
        form.setValue('clinicLocation', { lat, lng })
    };

    const onSubmit = (values: z.infer<typeof doctorSchema>) => {
        updateDoctor(doctor.email, { status: 'Pending', clinic: { address: values.clinicAddress, area: values.clinicArea, cases: parseInt(values.clinicCases), governorate: values.clinicGovernorate, location: `https://www.google.com/maps/search/?api=1&query=${values.clinicLocation.lat},${values.clinicLocation.lng}`, specialty: values.clinicSpecialty }, pdf: values.pdf, email: doctor.email})
        const donor = donors.find(doc => doc.email === doctor.email)!
        updateDonor(doctor.email, { ...donor, activated: true })
        router.refresh()
    }

    useEffect(() => {
        form.setValue('clinicLocation', currentLocation)
    }, [currentLocation])

    const centerMapOnMarker = () => {
        if (currentLocation && mapRef.current) {
            //@ts-expect-error panTo
            mapRef.current.panTo(currentLocation)
        }
    }
    
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col items-center max-h-[80vh] overflow-auto space-y-8">
                <div className='flex w-full items-center justify-between gap-8'>
                    <FormField
                        control={form.control}
                        name="clinicAddress"
                        render={({ field }) => (
                            <FormItem className='relative flex flex-col gap-8'>
                                <FormLabel className='font-medium text-[#003B33] text-2xl'>Clinic Address:</FormLabel>
                                <FormControl>
                                    <input
                                        {...field}
                                        type="text"
                                        placeholder="Clinic Address"
                                        className="w-screen max-w-[408px] outline-none  border-2 border-[rgba(0,59,51,0.5)] shadow-md px-2 py-2 rounded-2xl"
                                    />
                                </FormControl>
                                <FormMessage className='absolute -bottom-6 text-[#D84243]' />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="clinicArea"
                        render={({ field }) => (
                            <FormItem className='relative flex flex-col gap-8'>
                                <FormLabel className='font-medium text-[#003B33] text-2xl'>Clinic Area:</FormLabel>
                                <FormControl>
                                    <input
                                        {...field}
                                        type="text"
                                        placeholder="Clinic Area"
                                        className="w-screen max-w-[408px] outline-none  border-2 border-[rgba(0,59,51,0.5)] shadow-md px-2 py-2 rounded-2xl"
                                    />
                                </FormControl>
                                <FormMessage className='absolute -bottom-6 text-[#D84243]' />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="clinicSpecialty"
                        render={({ field }) => (
                            <FormItem className='relative flex flex-col gap-8'>
                                <FormLabel className='font-medium text-[#003B33] text-2xl'>Clinic Specialty:</FormLabel>
                                <FormControl>
                                    <input
                                        {...field}
                                        type="text"
                                        placeholder="Clinic Specialty"
                                        className="w-screen max-w-[408px] outline-none  border-2 border-[rgba(0,59,51,0.5)] shadow-md px-2 py-2 rounded-2xl"
                                    />
                                </FormControl>
                                <FormMessage className='absolute -bottom-6 text-[#D84243]' />
                            </FormItem>
                        )}
                    />
                </div>
                <div className='flex w-full items-center justify-between gap-8'>

                    <FormField
                        control={form.control}
                        name="clinicGovernorate"
                        render={({ field }) => (
                            <FormItem className='relative flex flex-col gap-8'>
                                <FormLabel className='font-medium text-[#003B33] text-2xl'>Clinic Governorate:</FormLabel>
                                <FormControl>
                                    <select
                                        {...field}
                                        className="w-screen max-w-[408px] outline-none  border-2 border-[rgba(0,59,51,0.5)] shadow-md px-2 py-2 rounded-2xl"
                                    >
                                        {governorates.map(governorate => (
                                            <option key={governorate} value={governorate}>{governorate}</option>
                                        ))}
                                    </select>
                                </FormControl>
                                <FormMessage className='absolute -bottom-6 text-[#D84243]' />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="clinicCases"
                        render={({ field }) => (
                            <FormItem className='relative flex flex-col gap-8'>
                                <FormLabel className='font-medium text-[#003B33] text-2xl'>Clinic # of Cases:</FormLabel>
                                <FormControl>
                                    <input
                                        {...field}
                                        type="number"
                                        placeholder="Clinic # of Cases"
                                        className="w-screen max-w-[408px] outline-none  border-2 border-[rgba(0,59,51,0.5)] shadow-md px-2 py-2 rounded-2xl"
                                    />
                                </FormControl>
                                <FormMessage className='absolute -bottom-6 text-[#D84243]' />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="pdf"
                        render={({ field }) => (
                            <FormItem className='relative flex flex-col gap-8'>
                                <FormLabel className='font-medium text-[#003B33] text-2xl'>Clinic's Documents:</FormLabel>
                                <FormControl>
                                    <input
                                        onChange={(e) => {
                                        // Update the value with the file list
                                            form.setValue('pdf', e.target.files?.length ? [...Array.from(e.target.files).map(file => file.name)] : []);
                                            field.onChange(e.target.files?.length ? [...Array.from(e.target.files).map(file => file.name)] : [])
                                        }}
                                        type="file"
                                        accept=".pdf"
                                        multiple
                                        placeholder="Clinic #Cases"
                                        className="w-screen max-w-[408px] outline-none  border-2 border-[rgba(0,59,51,0.5)] shadow-md px-2 py-2 rounded-2xl"
                                    />
                                </FormControl>
                                <FormMessage className='absolute -bottom-6 text-[#D84243]' />
                            </FormItem>
                        )}
                    />
                </div>
                <LoadScript googleMapsApiKey={process.env.GOOGLE_API_KEY!}>
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={center}
                        zoom={10}
                        onClick={selectLocation}
                        //@ts-expect-error mapRef is not null
                        onLoad={(map) => mapRef.current = map}
                    >
                        {/* Only render marker if location is selected*/}
                        <FormField
                            control={form.control}
                            name="clinicLocation"
                            render={({ field }) =>
                                field?.value && <Marker position={{ lat: field.value.lat, lng: field.value.lng }} />
                            }
                        />
                        <div onClick={centerMapOnMarker} className='absolute right-2.5 bg-white top-40 px-[7.5px] rounded-sm cursor-pointer py-2 border border-[rgba(0,0,0,0.25)]'>
                            <LocateFixed />
                        </div>
                    </GoogleMap>
                </LoadScript>
                <button
                    type="submit"
                    className=" text-[#fff] bg-[rgba(0,59,51,1)] font-semibold text-xl py-2 rounded-2xl w-screen max-w-[408px] shadow-md mt-[4.5rem]"
                >
                    Submit
                </button>
            </form>
        </Form>
    )
}