import { Dialog, DialogContent } from "@/components/ui/dialog"
import { usePostsStore, MedicalSupplies } from "@/lib/store"
import { getCookie } from "cookies-next"
import { BadgeCheck, Upload } from "lucide-react"
import Image from "next/image"
import { ChangeEvent, useEffect, useRef, useState } from "react"

export default function CreateMedicalSuppliesPost() 
{
    const { addPost, posts } = usePostsStore()

    const nextId = posts.slice().sort((a, b) => a.id - b.id)[0].id + 1

    const [details, setDetails] = useState<MedicalSupplies>({
        gender: 'Male',
        image: '',
        quantity: '0',
        type: 'Medical Devices',
        use: '',
        deviceType: 'Wheelchair',
        medicationType: 'Antibiotics',
        medicationUse: 'Antibacterial'
    })

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        let reader = new FileReader();
        if(e.target.files === null) return;
        let file = e.target.files[0];

        if(!file) return;

        reader.onloadend = () => {
            setDetails(prev => ({...prev, image: reader.result?.toString()!})); // Update image preview URL
        };

        reader.readAsDataURL(file);
    };

    const organization = getCookie('organizationEmail')

    const [success, setSuccess] = useState(false)

    useEffect(() => {
        if(success) {
            setTimeout(() => {
                setSuccess(false)
            }, 3000)
        }
    }, [success])

    return (
        <>
        {

        details.type === 'Medication' ? (
            <div className='w-full flex items-center justify-between'>
                <div className='flex flex-col items-center justify-between gap-4'>
                    
                    <div className='flex flex-col gap-4'>
                        <div className='text-[rgba(0,59,51,1)] items-start flex flex-col text-2xl font-bold gap-2'>
                            <p className='text-lg'>Quantity: </p>

                            <input className="w-screen max-w-[408px] outline-none  border-2 border-[rgba(0,59,51,0.5)] shadow-md px-2 py-2 rounded-2xl" type='number' value={details.quantity} onChange={e => setDetails(prev => ({ ...prev, quantity: e.target.value }))} />
                        </div>
                        <div className='text-[rgba(0,59,51,1)] items-start flex flex-col text-2xl font-bold gap-2'>
                            <p className='text-lg'>Gender: </p>
                            <select className="w-screen max-w-[408px] outline-none  border-2 border-[rgba(0,59,51,0.5)] shadow-md px-2 py-2 rounded-2xl" value={details.gender} onChange={e => setDetails(prev => ({ ...prev, gender: (e.target.value as 'Male' | 'Female') }))}>
                                <option value='Male'>Male</option>
                                <option value='Female'>Female</option>
                            </select>
                        </div>
                        <div className='text-[rgba(0,59,51,1)] items-start flex flex-col text-2xl font-bold gap-2'>
                            <p className='text-lg'>Type: </p>

                            <select className="w-screen max-w-[408px] outline-none  border-2 border-[rgba(0,59,51,0.5)] shadow-md px-2 py-2 rounded-2xl" value={details.type} onChange={e => setDetails(prev => ({ ...prev, type: (e.target.value as "Medication" | "Medical Devices" | "Medical Equipment") }))}>
                            {["Medication", "Medical Devices", "Medical Equipment"].map(option => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                            </select>
                        </div>
                    </div>
                    <div className='flex flex-col gap-4'>
                        <div className='text-[rgba(0,59,51,1)] items-start flex flex-col text-2xl font-bold gap-2'>
                            <p className='text-lg'>Medication Type: </p>

                            <select className="w-screen max-w-[408px] outline-none  border-2 border-[rgba(0,59,51,0.5)] shadow-md px-2 py-2 rounded-2xl" value={details.medicationType} onChange={e => setDetails(prev => ({ ...prev, medicationType: (e.target.value as "Painkillers" | "Antibiotics" | "Antivirals" | "Antifungals" | "Antiparasitics") }))}>
                            {["Painkillers", "Antibiotics", "Antivirals", "Antifungals", "Antiparasitics"].map(option => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                            </select>                
                        </div>
                        <div className='flex flex-col justify-between items-center gap-4'>
                            <div className='text-[rgba(0,59,51,1)] items-start flex flex-col text-2xl font-bold gap-2'>
                                <p className='text-lg'>Medication Use: </p>
                                <select className="w-screen max-w-[408px] outline-none  border-2 border-[rgba(0,59,51,0.5)] shadow-md px-2 py-2 rounded-2xl" value={details.medicationUse} onChange={e => setDetails(prev => ({ ...prev, medicationUse: (e.target.value as "Pain Relief" | "Antibacterial" | "Antiviral" | "Antifungal" | "Antiparasitic") }))}>
                                {["Pain Relief", "Antibacterial", "Antiviral", "Antifungal", "Antiparasitic"].map(option => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                                </select>
                            </div>
                            <div className='text-[rgba(0,59,51,1)] items-start flex flex-col text-2xl font-bold gap-2'>
                                <p className='text-lg'>Age: </p>
                                <input className="w-screen max-w-[408px] outline-none  border-2 border-[rgba(0,59,51,0.5)] shadow-md px-2 py-2 rounded-2xl" type='number' value={details.use} onChange={e => setDetails(prev => ({ ...prev, use: e.target.value }))} />                
                            </div>
                        </div>
                    </div>
                </div>
                <div className='rounded-3xl w-96 h-96 flex items-center justify-center overflow-visible cursor-pointer' onClick={() => fileInputRef.current?.click()}>
                    {!details.image ? (
                        <div className='w-full h-full items-start justify-start flex flex-col gap-2'>
                            <p className='text-lg text-[rgba(0,59,51,1)] font-bold'>Upload Image:</p>
                            <div className='bg-[rgba(0,59,51,1)] flex items-center justify-center rounded-3xl w-[240px] h-[240px]'>
                                <Upload stroke='#fff' />
                            </div>
                        </div>
                    ) : (
                        <Image
                            src={details.image}
                            alt="image"
                            width={384}
                            height={384}
                            className='object-cover'
                        />
                    )}
                    <input className="w-screen max-w-[408px] outline-none  border-2 border-[rgba(0,59,51,0.5)] shadow-md px-2 py-2 rounded-2xl" 
                        type='file' 
                        hidden
                        onChange={(e) => handleImageChange(e)}
                        ref={fileInputRef} 
                    />
                </div>
            </div>
        ) : details.type === 'Medical Devices' ? (
            <div className='w-full flex items-center justify-between'>
                <div className='flex flex-col items-center justify-between gap-4'>
                    <div className='flex flex-col gap-4'>
                        <div className='text-[rgba(0,59,51,1)] items-start flex flex-col text-2xl font-bold gap-2'>
                            <p className='text-lg'>Quantity: </p>
                            <input className="w-screen max-w-[408px] outline-none  border-2 border-[rgba(0,59,51,0.5)] shadow-md px-2 py-2 rounded-2xl" type='number' value={details.quantity} onChange={e => setDetails(prev => ({ ...prev, quantity: e.target.value }))} />
                        </div>
                        <div className='text-[rgba(0,59,51,1)] items-start flex flex-col text-2xl font-bold gap-2'>
                            <p className='text-lg'>Gender: </p>
                            <select className="w-screen max-w-[408px] outline-none  border-2 border-[rgba(0,59,51,0.5)] shadow-md px-2 py-2 rounded-2xl" value={details.gender} onChange={e => setDetails(prev => ({ ...prev, gender: (e.target.value as 'Male' | 'Female') }))}>
                                <option value='Male'>Male</option>
                                <option value='Female'>Female</option>
                            </select>
                        </div>
                        <div className='text-[rgba(0,59,51,1)] items-start flex flex-col text-2xl font-bold gap-2'>
                            <p className='text-lg'>Type: </p>
                            <select className="w-screen max-w-[408px] outline-none  border-2 border-[rgba(0,59,51,0.5)] shadow-md px-2 py-2 rounded-2xl" value={details.type} onChange={e => setDetails(prev => ({ ...prev, type: (e.target.value as "Medication" | "Medical Devices" | "Medical Equipment") }))}>
                            {["Medication", "Medical Devices", "Medical Equipment"].map(option => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                            </select>
                        </div>
                    </div>
                    <div className='flex flex-col gap-4'>
                        <div className='text-[rgba(0,59,51,1)] items-start flex flex-col text-2xl font-bold gap-2'>
                            <p className='text-lg'>Type: </p>
                            <select className="w-screen max-w-[408px] outline-none  border-2 border-[rgba(0,59,51,0.5)] shadow-md px-2 py-2 rounded-2xl" value={details.deviceType} onChange={e => setDetails(prev => ({ ...prev, deviceType: (e.target.value as "Wheelchair" | "Crutches" | "Oxygen Tank" | "Blood Pressure Monitor" | "Thermometer") }))}>
                            {["Wheelchair", "Crutches", "Oxygen Tank", "Blood Pressure Monitor", "Thermometer"].map(option => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                            </select>
                        </div>
                        <div className='text-[rgba(0,59,51,1)] items-start flex flex-col text-2xl font-bold gap-2'>
                            <p className='text-lg'>Type: </p>
                            <input className="w-screen max-w-[408px] outline-none  border-2 border-[rgba(0,59,51,0.5)] shadow-md px-2 py-2 rounded-2xl" type='text' value={details.use} onChange={e => setDetails(prev => ({ ...prev, use: e.target.value }))} />                
                        </div>
                    </div>
                </div>
                <div className='rounded-3xl w-96 h-96 flex items-center justify-center overflow-visible cursor-pointer' onClick={() => fileInputRef.current?.click()}>
                    {!details.image ? (
                        <div className='w-full h-full items-start justify-start flex flex-col gap-2'>
                            <p className='text-lg text-[rgba(0,59,51,1)] font-bold'>Upload Image:</p>
                            <div className='bg-[rgba(0,59,51,1)] flex items-center justify-center rounded-3xl w-[240px] h-[240px]'>
                                <Upload stroke='#fff' />
                            </div>
                        </div>
                    ) : (
                        <Image
                            src={details.image}
                            alt="image"
                            width={384}
                            height={384}
                            className='object-cover'
                        />
                    )}
                    <input className="w-screen max-w-[408px] outline-none  border-2 border-[rgba(0,59,51,0.5)] shadow-md px-2 py-2 rounded-2xl" 
                        type='file' 
                        hidden
                        onChange={(e) => handleImageChange(e)}
                        ref={fileInputRef} 
                    />
                </div>
            </div>
        ) : (
            <div className='w-full flex items-center justify-between'>
                <div className='flex flex-col items-center justify-between gap-4'>
                    <div className='flex flex-col gap-4'>
                        <div className='text-[rgba(0,59,51,1)] items-start flex flex-col text-2xl font-bold gap-2'>
                            <p className='text-lg'>Quantity: </p>
                            <input className="w-screen max-w-[408px] outline-none  border-2 border-[rgba(0,59,51,0.5)] shadow-md px-2 py-2 rounded-2xl" type='number' value={details.quantity} onChange={e => setDetails(prev => ({ ...prev, quantity: e.target.value }))} />
                        </div>
                        <div className='text-[rgba(0,59,51,1)] items-start flex flex-col text-2xl font-bold gap-2'>
                            <p className='text-lg'>Gender: </p>
                            <select className="w-screen max-w-[408px] outline-none  border-2 border-[rgba(0,59,51,0.5)] shadow-md px-2 py-2 rounded-2xl" value={details.gender} onChange={e => setDetails(prev => ({ ...prev, gender: (e.target.value as 'Male' | 'Female') }))}>
                                <option value='Male'>Male</option>
                                <option value='Female'>Female</option>
                            </select>
                        </div>
                        <div className='text-[rgba(0,59,51,1)] items-start flex flex-col text-2xl font-bold gap-2'>
                            <p className='text-lg'>Type: </p>
                            <select className="w-screen max-w-[408px] outline-none  border-2 border-[rgba(0,59,51,0.5)] shadow-md px-2 py-2 rounded-2xl" value={details.type} onChange={e => setDetails(prev => ({ ...prev, type: (e.target.value as "Medication" | "Medical Devices" | "Medical Equipment") }))}>
                            {["Medication", "Medical Devices", "Medical Equipment"].map(option => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                            </select>
                        </div>
                        <div className='text-[rgba(0,59,51,1)] items-start flex flex-col text-2xl font-bold gap-2'>
                            <p className='text-lg'>Use: </p>
                            <input className="w-screen max-w-[408px] outline-none  border-2 border-[rgba(0,59,51,0.5)] shadow-md px-2 py-2 rounded-2xl" type='text' value={details.use} onChange={e => setDetails(prev => ({ ...prev, use: e.target.value }))} />                
                        </div>
                    </div>
                </div>
                <div className='rounded-3xl w-96 h-96 flex items-center justify-center overflow-visible cursor-pointer' onClick={() => fileInputRef.current?.click()}>
                    {!details.image ? (
                        <div className='w-full h-full items-start justify-start flex flex-col gap-2'>
                            <p className='text-lg text-[rgba(0,59,51,1)] font-bold'>Upload Image:</p>
                            <div className='bg-[rgba(0,59,51,1)] flex items-center justify-center rounded-3xl w-[240px] h-[240px]'>
                                <Upload stroke='#fff' />
                            </div>
                        </div>
                    ) : (
                        <Image
                            src={details.image}
                            alt="image"
                            width={384}
                            height={384}
                            className='object-cover'
                        />
                    )}
                    <input className="w-screen max-w-[408px] outline-none  border-2 border-[rgba(0,59,51,0.5)] shadow-md px-2 py-2 rounded-2xl" 
                        type='file' 
                        hidden
                        onChange={(e) => handleImageChange(e)}
                        ref={fileInputRef} 
                    />
                </div>
            </div>
        )}
        <button onClick={() => {
            addPost({ id: nextId, organization: organization?.toString()!, details, status: 'Pending', category: 'Food' })
            setSuccess(true)
        }}                 
        className=" text-[#fff] bg-[rgba(0,59,51,1)] mx-auto mt-12 font-semibold text-xl py-2 rounded-2xl w-screen max-w-[408px] shadow-md"
        >Add Post</button>
        <Dialog open={success}>
                <DialogContent className='flex items-center gap-4 justify-center text-center'>
                    <BadgeCheck width={28} height={28} className='text-[#003B33]' />
                    <p className='text-[#003B33] font-bold text-lg'>Post Has Been Created!</p>
                </DialogContent>
            </Dialog>
        </>
    )
}