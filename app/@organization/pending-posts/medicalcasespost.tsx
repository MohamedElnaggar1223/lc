import { MedicalCases, PostType, usePostsStore } from "@/lib/store"
import { Check, Edit, Save, Trash2 } from "lucide-react"
import { useEffect, useState } from "react"
import { addDays, format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"
 
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

type Props = {
    post: PostType
    postDetails: MedicalCases
    index: number
    create?: boolean
    pending?: boolean
}

export default function MedicalCasesPost({ post, postDetails, index, pending }: Props) 
{
    const [details, setDetails] = useState(postDetails)
    const [isEditing, setIsEditing] = useState(false)
    const [time, setTime] = useState<string | undefined>(undefined)
    const [date, setDate] = useState<DateRange | undefined>({
        from: new Date(2022, 0, 20),
        to: addDays(new Date(2022, 0, 20), 20),
    })
    const [timeSubmitted, setTimeSubmitted] = useState(false)

    const { updatePost, removePost } = usePostsStore()

    return (
        <div className='flex px-8 w-full gap-4 items-center justify-between'>
            <p className='text-[rgba(0,59,51,1)] text-2xl'>{index + 1}</p>
            {isEditing ? (
                <div className='flex gap-4'>
                    <div className='flex flex-col gap-4'>
                        <select value={details.speciality} onChange={e => setDetails(prev => ({ ...prev, subject: (e.target.value as "Cardiology" | "Dermatology" | "Orthopedics" | "Pediatrics" | "Neurology" | "Oncology" | "Gynecology" | "Urology" | "Psychiatry" | "Dentistry") }))}>
                        {["Cardiology", "Dermatology", "Orthopedics", "Pediatrics", "Neurology", "Oncology", "Gynecology", "Urology", "Psychiatry", "Dentistry"].map(option => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                        </select>
                        <input type='text' value={parseInt(details.patientName)} onChange={e => setDetails(prev => ({ ...prev, patientName: e.target.value }))} />
                        <input type='number' value={details.patientWeight} onChange={e => setDetails(prev => ({ ...prev, name: e.target.value }))} />
                    </div>
                    <div className='flex flex-col gap-4'>
                        <input type='text' value={details.patientAge} onChange={e => setDetails(prev => ({ ...prev, patientAge: parseInt(e.target.value) }))} />
                        <select value={details.patientGender} onChange={e => setDetails(prev => ({ ...prev, gender: (e.target.value as 'Male' | 'Female') }))}>
                            <option value='Male'>Male</option>
                            <option value='Female'>Female</option>
                        </select>  
                        <input type='number' value={details.description} onChange={e => setDetails(prev => ({ ...prev, description: (e.target.value) }))} />                
                    </div>
                </div>
            ) : (
                <>
                    <div className='flex px-12 flex-1 flex-col gap-4'>
                        <p className='text-[rgba(0,59,51,1)] text-2xl'>Speciality: {details.speciality}</p>
                        <p className='text-[rgba(0,59,51,1)] text-2xl'>Patient Name: {details.patientName}</p>
                        <p className='text-[rgba(0,59,51,1)] text-2xl'>Patient Age: {details.patientAge}</p>
                    </div>
                    <div className='flex px-12 flex-1 flex-col gap-4'>
                        <p className='text-[rgba(0,59,51,1)] text-2xl'>Patient Weight: {details.patientWeight}KG</p>
                        <p className='text-[rgba(0,59,51,1)] text-2xl'>Patient Gender: {details.patientGender}</p>
                        <p className='text-[rgba(0,59,51,1)] text-2xl'>Description: {details.description}</p>
                    </div>
                </>
            )}
            {pending ? timeSubmitted ? <p>We will get back to you soon!</p> : post.ETA ? (
                <p>ETA: {post.ETA.getMinutes()} Mins</p>
            ) : (
                <div className='flex items-center gap-2'>
                    <p>Choose Time For Delivery</p>
                    <Popover>
                        <PopoverTrigger asChild>
                        <Button
                            id="date"
                            variant={"outline"}
                            className={cn(
                            "w-[200px] justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                            )}
                        >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date?.from ? (
                            date.to ? (
                                <>
                                {format(date.from, "LLL dd, y")} -{" "}
                                {format(date.to, "LLL dd, y")}
                                </>
                            ) : (
                                format(date.from, "LLL dd, y")
                            )
                            ) : (
                            <span>Pick a date</span>
                            )}
                        </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                            initialFocus
                            mode="range"
                            defaultMonth={date?.from}
                            selected={date}
                            onSelect={setDate}
                            numberOfMonths={2}
                        />
                        </PopoverContent>
                    </Popover>
                    <select className='py-2 rounded-md' value={time} onChange={(e) => setTime(e.target.value)}>
                        <option value='8AM-9AM'>8AM-9AM</option>
                        <option value='9AM-10AM'>9AM-10AM</option>
                        <option value='10AM-11AM'>10AM-11AM</option>
                        <option value='11AM-12PM'>11AM-12PM</option>
                        <option value='1PM-2PM'>1PM-2PM</option>
                        <option value='2PM-3PM'>2PM-3PM</option>
                        <option value='3PM-4PM'>3PM-4PM</option>
                        <option value='4PM-5PM'>4PM-5PM</option>
                        <option value='5PM-6PM'>5PM-6PM</option>
                        <option value='6PM-7PM'>6PM-7PM</option>
                        <option value='7PM-8PM'>7PM-8PM</option>
                        <option value='8PM-9PM'>8PM-9PM</option>
                        <option value='9PM-10PM'>9PM-10PM</option>
                        <option value='10PM-11PM'>10PM-11PM</option>
                        <option value='11PM-12AM'>11PM-12AM</option>
                    </select>
                    <Check onClick={() => setTimeSubmitted(true)} className='cursor-pointer' />
                </div>
            ) : (
            <div className='flex items-end justify-center flex-col gap-8'>
                {isEditing ? <Save onClick={() => {
                    setIsEditing(false)
                    updatePost(post.id, {...post, details})
                }} className='cursor-pointer' /> : <Edit onClick={() => setIsEditing(true)} className='cursor-pointer' />}
                <Trash2 onClick={() => removePost(post.id)} className='cursor-pointer' />
            </div>
            )}
        </div>
    )
}