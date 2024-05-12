import { Dialog, DialogContent } from "@/components/ui/dialog"
import { usePostsStore, SchoolSupplies } from "@/lib/store"
import { getCookie } from "cookies-next"
import { BadgeCheck, Upload } from "lucide-react"
import Image from "next/image"
import { ChangeEvent, useEffect, useRef, useState } from "react"

export default function CreateSchoolSuppliesPost() 
{
    const { addPost, posts } = usePostsStore()

    const nextId = posts.slice().sort((a, b) => a.id - b.id)[0].id + 1

    const [details, setDetails] = useState<SchoolSupplies>({
        type: 'Books',
        bookAuthor: '',
        bookName: '',
        bookEdition: '',
        bookImage: '',
        bookLanguage: '',
        bookSummary: '',
        stationaryType: 'Binders'
    })

    const organization = getCookie('organizationEmail')

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
        {details.type === 'Books' ? (
            <div className='w-full flex items-center justify-between'>
                <div className='flex flex-col items-center justify-between gap-4'>
                    <div className='flex flex-col gap-4'>
                        <div className='text-[rgba(0,59,51,1)] items-start flex flex-col text-2xl font-bold gap-2'>
                            <p className='text-lg'>Type: </p>
                            <select className="w-screen max-w-[408px] outline-none  border-2 border-[rgba(0,59,51,0.5)] shadow-md px-2 py-2 rounded-2xl" value={details.type} onChange={e => setDetails(prev => ({ ...prev, type: (e.target.value as 'Books' | 'Stationary') }))}>
                                <option value='Books'>Books</option>
                                <option value='Stationary'>Stationary</option>
                            </select>
                        </div>
                        <div className='text-[rgba(0,59,51,1)] items-start flex flex-col text-2xl font-bold gap-2'>
                            <p className='text-lg'>Book Name: </p>
                            <input className="w-screen max-w-[408px] outline-none  border-2 border-[rgba(0,59,51,0.5)] shadow-md px-2 py-2 rounded-2xl" type='text' value={details.bookName} onChange={e => setDetails(prev => ({ ...prev, bookName: e.target.value }))} />
                        </div>
                        <div className='text-[rgba(0,59,51,1)] items-start flex flex-col text-2xl font-bold gap-2'>
                            <p className='text-lg'>Book Author: </p>
                            <input className="w-screen max-w-[408px] outline-none  border-2 border-[rgba(0,59,51,0.5)] shadow-md px-2 py-2 rounded-2xl" type='text' value={details.bookAuthor} onChange={e => setDetails(prev => ({ ...prev, bookAuthor: e.target.value }))} />
                        </div>
                        <div className='text-[rgba(0,59,51,1)] items-start flex flex-col text-2xl font-bold gap-2'>
                            <p className='text-lg'>Book Language: </p>
                            <input className="w-screen max-w-[408px] outline-none  border-2 border-[rgba(0,59,51,0.5)] shadow-md px-2 py-2 rounded-2xl" type='text' value={details.bookLanguage} onChange={e => setDetails(prev => ({ ...prev, bookLanguage: e.target.value }))} />
                        </div>
                    </div>
                    <div className='flex flex-col gap-4'>
                        <div className='text-[rgba(0,59,51,1)] items-start flex flex-col text-2xl font-bold gap-2'>
                            <p className='text-lg'>Book Edition: </p>
                            <input className="w-screen max-w-[408px] outline-none  border-2 border-[rgba(0,59,51,0.5)] shadow-md px-2 py-2 rounded-2xl" type='text' value={details.bookEdition} onChange={e => setDetails(prev => ({ ...prev, bookEdition: e.target.value }))} />                
                        </div>
                        <div className='text-[rgba(0,59,51,1)] items-start flex flex-col text-2xl font-bold gap-2'>
                            <p className='text-lg'>Book Summary: </p>
                            <input className="w-screen max-w-[408px] outline-none  border-2 border-[rgba(0,59,51,0.5)] shadow-md px-2 py-2 rounded-2xl" type='text' value={details.bookSummary} onChange={e => setDetails(prev => ({ ...prev, bookSummary: e.target.value }))} />                
                        </div>
                    </div>
                </div>
                <div className='rounded-3xl w-96 h-96 flex items-center justify-center overflow-visible cursor-pointer' onClick={() => fileInputRef.current?.click()}>
                    {!details.bookImage ? (
                        <div className='w-full h-full items-start justify-start flex flex-col gap-2'>
                            <p className='text-lg text-[rgba(0,59,51,1)] font-bold'>Upload Image:</p>
                            <div className='bg-[rgba(0,59,51,1)] flex items-center justify-center rounded-3xl w-[240px] h-[240px]'>
                                <Upload stroke='#fff' />
                            </div>
                        </div>
                    ) : (
                        <Image
                            src={details.bookImage!}
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
                <div className='flex gap-4'>
                    <div className='flex items-center justify-between w-full gap-4'>
                        <div className='text-[rgba(0,59,51,1)] items-start flex flex-col text-2xl font-bold gap-2'>
                            <p className='text-lg'>Type: </p>
                            <select className="w-screen max-w-[408px] outline-none  border-2 border-[rgba(0,59,51,0.5)] shadow-md px-2 py-2 rounded-2xl" value={details.type} onChange={e => setDetails(prev => ({ ...prev, type: (e.target.value as 'Books' | 'Stationary') }))}>
                                <option value='Books'>Books</option>
                                <option value='Stationary'>Stationary</option>
                            </select>
                        </div>
                        <div className='text-[rgba(0,59,51,1)] items-start flex flex-col text-2xl font-bold gap-2'>
                            <p className='text-lg'>Type: </p>
                            <select className="w-screen max-w-[408px] outline-none  border-2 border-[rgba(0,59,51,0.5)] shadow-md px-2 py-2 rounded-2xl" value={details.stationaryType} onChange={e => setDetails(prev => ({ ...prev, stationaryType: (e.target.value as 'Pens' | 'Pencils' | 'Erasers' | 'Rulers' | 'Sharpeners' | 'Notebooks' | 'Folders' | 'Binders' | 'Scissors' | 'Glue' | 'Tape' | 'Staplers' | 'Staples' | 'Paper' | 'Markers' | 'Highlighters' | 'Crayons' | 'Colored Pencils' | 'Paint' | 'Brushes' | 'Canvas' | 'Sketchbooks' | 'Watercolors' | 'Pastels' | 'Charcoal' | 'Ink' | 'Easels' | 'Palettes' | 'Clay' | 'Glazes' | 'Pottery Tools' | 'Wood' | 'Metal' | 'Plastic' | 'Fabric' | 'Glass' | 'Ceramic') }))}>
                            {['Pens', 'Pencils', 'Erasers', 'Rulers', 'Sharpeners', 'Notebooks', 'Folders', 'Binders', 'Scissors', 'Glue', 'Tape', 'Staplers', 'Staples', 'Paper', 'Markers', 'Highlighters', 'Crayons', 'Colored Pencils', 'Paint', 'Brushes', 'Canvas', 'Sketchbooks', 'Watercolors', 'Pastels', 'Charcoal', 'Ink', 'Easels', 'Palettes', 'Clay', 'Glazes', 'Pottery Tools', 'Wood', 'Metal', 'Plastic', 'Fabric', 'Glass', 'Ceramic'].map(option => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                            </select>
                        </div>
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