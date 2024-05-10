'use client'
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
import { governorates, types } from "@/constants"
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { BadgeCheck, LocateFixed } from "lucide-react"
import { useRef, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAdminStore, useDonorStore, useOrganizationStore } from "@/lib/store"
import { getCookie } from "cookies-next"
import { Dialog, DialogContent } from "@/components/ui/dialog"

const containerStyle = { width: '408px', height: '400px', minWidth: '408px', minHeight: '400px' };
const center = { lat: -3.745, lng: -38.523 };

export default function HomeOrganization()
{
    const router = useRouter()

    const { admin } = useAdminStore()
    const { donors } = useDonorStore()
    const { organizations, updateOrganization } = useOrganizationStore()

    const mapRef = useRef(null)
    
    const [currentLocation, setCurrentLocation] = useState({ lat: 0, lng: 0 });
    const [success, setSuccess] = useState(false)
    
    useEffect(() => {
        if(success) {
            setTimeout(() => {
                setSuccess(false)
            }, 3000)
        }
    }, [success])

    const organization = organizations.find(org => org.email === getCookie('organizationEmail'))
    
    if(!organization) return null

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((data) => setCurrentLocation({ lat: data.coords.latitude, lng: data.coords.longitude}))
    }, [])

    const signupSchema = z.object({
        firstName: z.string().min(2, {
            message: "First name must be at least 2 characters.",
        }),
        lastName: z.string().min(2, {
            message: "Last name must be at least 2 characters.",
        }),
        name: z.string().min(2, {
            message: "Name must be at least 2 characters.",
        }),
        gender: z.enum(["Male", "Female"], {
            message: 'Gender must be either Male or Female.'
        }),
        number: z.string().min(10, {
            message: "Phone number must be at least 10 characters.",
        }).refine((value) => /^\d+$/.test(value), {
            message: "Phone number must be a number.",
        }).refine(value => value.startsWith("01"), {
            message: "Phone number must start with 01."
        }),
        email: z.string().min(2, {
            message: "Email must be at least 2 characters.",
        }).refine((value) => donors.find(donor => donor.email === value) ? false : true , {
            message: "Email already exists.",
        }).refine((value) => value === admin.email ? false : true, {
            message: "Email can not be used.",
        }).refine((value) => organizations.find(organization => organization.email === value) && organization?.email !== value ? false : true , {
            message: "Email already exists.",
        }),
        area: z.string().min(2, {
            message: "Area must be at least 2 characters.",
        }),
        governorate: z.enum(["Alexandria", "Aswan", "Asyut", "Beheira", "Beni Suef", "Cairo", "Dakahlia", "Damietta", "Faiyum", "Gharbia", "Giza", "Ismailia", "Kafr El Sheikh", "Luxor", "Matruh", "Minya", "Monufia", "New Valley", "North Sinai", "Port Said", "Qalyubia", "Qena", "Red Sea", "Sharqia", "Sohag", "South Sinai", "Suez"], {
            message: 'Governorate must be a valid governorate.'
        }),
        type: z.enum(['Mosque', 'Charity', 'Hospital', 'Orphanage', 'Public School', 'Church'], {
            message: 'Governorate must be a valid governorate.'
        }),
        address: z.string().min(2, {
            message: "Address must be at least 2 characters.",
        }),
        location: z.object({
            lat: z.number(),
            lng: z.number(),
        }),
        pdf: z.array(z.string()).min(1, {
            message: "Please upload at least one document."
        }),
        status: z.enum(["Pending", "Accepted", "Declined"], {
            message: 'Status must be either Pending, Approved or Rejected.'
        }),
        password: z.string().min(8, {
            message: "Password must be at least 8 characters.",
        }),
        description: z.string()
    })

    const form = useForm<z.infer<typeof signupSchema>>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            email: organization?.email || "",
            firstName: organization?.firstName || "",
            lastName: organization?.lastName || "",
            gender: organization?.gender || "Male",
            number: organization?.number || "",
            area: organization?.area || "",
            governorate: organization?.governorate || "Cairo",
            address: organization?.address || "",
            type: organization?.type || "Mosque",
            location: organization?.location || { lat: 0, lng: 0 },
            pdf: organization?.pdf || [],
            name: organization?.name || "",
            status: organization?.status || "Pending",
            password: organization?.password || "",
            description: organization?.description || "",
        },
    })

    const onSubmit = (values: z.infer<typeof signupSchema>) => {
        updateOrganization(organization?.email!, {...values})
        setSuccess(true)
    }

    const selectLocation = (e: google.maps.MapMouseEvent) => {
        const lat = e.latLng?.lat() ?? 0;
        const lng = e.latLng?.lng() ?? 0;
        
        form.setValue('location', { lat, lng })
    }

    useEffect(() => {
        form.setValue('location', currentLocation)
    }, [currentLocation])

    const centerMapOnMarker = () => {
        if (currentLocation && mapRef.current) {
            //@ts-expect-error panTo
            mapRef.current.panTo(currentLocation)
        }
    }

    return (
        <section className='flex flex-col gap-8 px-8 py-8 overflow-auto'>
            <p className='italic text-4xl'>Hello, {organization.firstName}!</p>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col items-center max-h-[80vh] overflow-auto space-y-8">
                    <div className='flex w-full items-center justify-between gap-6 flex-wrap'>
                        <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                                <FormItem className='relative flex flex-col gap-6'>
                                    <FormLabel className='font-medium text-[#003B33] text-2xl'>First Name:</FormLabel>
                                    <FormControl>
                                        <input
                                            {...field}
                                            type="text"
                                            placeholder="First Name"
                                            className="w-screen max-w-[408px] outline-none  border-2 border-[rgba(0,59,51,0.5)] shadow-md px-2 py-2 rounded-2xl"
                                        />
                                    </FormControl>
                                    <FormMessage className='absolute -bottom-6 text-[#D84243]' />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="lastName"
                            render={({ field }) => (
                                <FormItem className='relative flex flex-col gap-6'>
                                    <FormLabel className='font-medium text-[#003B33] text-2xl'>Last Name:</FormLabel>
                                    <FormControl>
                                        <input
                                            {...field}
                                            type="text"
                                            placeholder="Last Name"
                                            className="w-screen max-w-[408px] outline-none  border-2 border-[rgba(0,59,51,0.5)] shadow-md px-2 py-2 rounded-2xl"
                                        />
                                    </FormControl>
                                    <FormMessage className='absolute -bottom-6 text-[#D84243]' />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className='relative flex flex-col gap-6'>
                                    <FormLabel className='font-medium text-[#003B33] text-2xl'>Email:</FormLabel>
                                    <FormControl>
                                        <input
                                            {...field}
                                            type="email"
                                            placeholder="Email"
                                            className="w-screen max-w-[408px] outline-none  border-2 border-[rgba(0,59,51,0.5)] shadow-md px-2 py-2 rounded-2xl"
                                        />
                                    </FormControl>
                                    <FormMessage className='absolute -bottom-6 text-[#D84243]' />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="gender"
                            render={({ field }) => (
                                <FormItem className='relative flex flex-col gap-2'>
                                    <FormLabel className='font-medium text-[#003B33] text-2xl'>Gender:</FormLabel>
                                    <FormControl>
                                        <select
                                            {...field}
                                            className="w-screen max-w-[408px] outline-none  border-2 border-[rgba(0,59,51,0.5)] shadow-md px-2 py-2 rounded-2xl"
                                        >
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                        </select>
                                    </FormControl>
                                    <FormMessage className='absolute -bottom-6 text-[#D84243]' />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="number"
                            render={({ field }) => (
                                <FormItem className='relative flex flex-col gap-6'>
                                    <FormLabel className='font-medium text-[#003B33] text-2xl'>Contact Number:</FormLabel>
                                    <FormControl>
                                        <input
                                            {...field}
                                            type="text"
                                            placeholder="Contact Number"
                                            className="w-screen max-w-[408px] outline-none  border-2 border-[rgba(0,59,51,0.5)] shadow-md px-2 py-2 rounded-2xl"
                                        />
                                    </FormControl>
                                    <FormMessage className='absolute -bottom-6 text-[#D84243]' />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className='flex w-full items-center justify-between gap-6 flex-wrap'>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem className='relative flex flex-col gap-6'>
                                    <FormLabel className='font-medium text-[#003B33] text-2xl'>Organization Name:</FormLabel>
                                    <FormControl>
                                        <input
                                            {...field}
                                            type="text"
                                            placeholder="Organization Name"
                                            className="w-screen max-w-[408px] outline-none  border-2 border-[rgba(0,59,51,0.5)] shadow-md px-2 py-2 rounded-2xl"
                                        />
                                    </FormControl>
                                    <FormMessage className='absolute -bottom-6 text-[#D84243]' />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem className='relative flex flex-col gap-6'>
                                    <FormLabel className='font-medium text-[#003B33] text-2xl'>Organization Description:</FormLabel>
                                    <FormControl>
                                        <input
                                            {...field}
                                            type="text"
                                            placeholder="Organization Description"
                                            className="w-screen max-w-[408px] outline-none  border-2 border-[rgba(0,59,51,0.5)] shadow-md px-2 py-2 rounded-2xl"
                                        />
                                    </FormControl>
                                    <FormMessage className='absolute -bottom-6 text-[#D84243]' />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="type"
                            render={({ field }) => (
                                <FormItem className='relative flex flex-col gap-6'>
                                    <FormLabel className='font-medium text-[#003B33] text-2xl'>Type:</FormLabel>
                                    <FormControl>
                                        <select
                                            {...field}
                                            className="w-screen max-w-[408px] outline-none  border-2 border-[rgba(0,59,51,0.5)] shadow-md px-2 py-2 rounded-2xl"
                                        >
                                            {types.map(type => (
                                                <option key={type} value={type}>{type}</option>
                                            ))}
                                        </select>
                                    </FormControl>
                                    <FormMessage className='absolute -bottom-6 text-[#D84243]' />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className='flex w-full items-center justify-between gap-6 flex-wrap'>
                        <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                                <FormItem className='relative flex flex-col gap-6'>
                                    <FormLabel className='font-medium text-[#003B33] text-2xl'>Address:</FormLabel>
                                    <FormControl>
                                        <input
                                            {...field}
                                            type="text"
                                            placeholder="Address"
                                            className="w-screen max-w-[408px] outline-none  border-2 border-[rgba(0,59,51,0.5)] shadow-md px-2 py-2 rounded-2xl"
                                        />
                                    </FormControl>
                                    <FormMessage className='absolute -bottom-6 text-[#D84243]' />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="area"
                            render={({ field }) => (
                                <FormItem className='relative flex flex-col gap-6'>
                                    <FormLabel className='font-medium text-[#003B33] text-2xl'>Area:</FormLabel>
                                    <FormControl>
                                        <input
                                            {...field}
                                            type="text"
                                            placeholder="Area"
                                            className="w-screen max-w-[408px] outline-none  border-2 border-[rgba(0,59,51,0.5)] shadow-md px-2 py-2 rounded-2xl"
                                        />
                                    </FormControl>
                                    <FormMessage className='absolute -bottom-6 text-[#D84243]' />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="governorate"
                            render={({ field }) => (
                                <FormItem className='relative flex flex-col gap-6'>
                                    <FormLabel className='font-medium text-[#003B33] text-2xl'>Governorate:</FormLabel>
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
                            name="pdf"
                            render={({ field }) => (
                                <FormItem className='relative flex flex-col gap-6'>
                                    <FormLabel className='font-medium text-[#003B33] text-2xl'>Organization's Documents:</FormLabel>
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
                                name="location"
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
            <Dialog open={success}>
                <DialogContent className='flex items-center gap-4 justify-center text-center'>
                    <BadgeCheck width={28} height={28} className='text-[#003B33]' />
                    <p className='text-[#003B33] font-bold text-lg'>Your Details Has Been Updated!</p>
                </DialogContent>
            </Dialog>
        </section>
    )
}