'use client'
import { Teacher, useTeacherStore, useDonorStore } from "@/lib/store"
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
import { governorates, subjects } from "@/constants"

type Props = {
    teacher: Teacher
}

export default function TeacherApplication({ teacher }: Props)
{
    const router = useRouter()

    const { updateTeacher } = useTeacherStore()
    const { donors, updateDonor } = useDonorStore()

    const teacherSchema = z.object({
        cases: z.string().refine((value) => !isNaN(Number(value)), {
            message: "Cases must be a number."
        }),
        pdf: z.array(z.string().min(1, { message: 'Please upload at least one document.' })).min(1, {
            message: "Please upload at least one document."
        }),
        subject: z.enum(["Arabic", "Art", "Biology", "Chemistry", "Computer Science", "English", "French", "Geography", "History", "Math", "Music", "Physics", "Physical Education", "Religion", "Social Studies", "Spanish"], {
            message: "Subject must be a valid one."
        }),
    })

    const form = useForm<z.infer<typeof teacherSchema>>({
        resolver: zodResolver(teacherSchema),
        defaultValues: {
            cases: teacher.cases.toString(),
            pdf: teacher.pdf,
            subject: teacher.subject,
        },
    })

    const onSubmit = (values: z.infer<typeof teacherSchema>) => {
        updateTeacher(teacher.email, { status: 'Pending', cases: parseInt(values.cases), pdf: values.pdf, email: teacher.email, subject: values.subject})
        const donor = donors.find(doc => doc.email === teacher.email)!
        updateDonor(teacher.email, { ...donor, activated: true })
        router.refresh()
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col items-center max-h-[80vh] overflow-auto space-y-8">
                <FormField
                    control={form.control}
                    name="cases"
                    render={({ field }) => (
                        <FormItem className='relative flex flex-col gap-8'>
                            <FormLabel className='font-medium text-[#003B33] text-2xl'># of Cases:</FormLabel>
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
                    name="subject"
                    render={({ field }) => (
                        <FormItem className='relative flex flex-col gap-8'>
                            <FormLabel className='font-medium text-[#003B33] text-2xl'>Subject:</FormLabel>
                            <FormControl>
                                <select
                                    {...field}
                                    className="w-screen max-w-[408px] outline-none  border-2 border-[rgba(0,59,51,0.5)] shadow-md px-2 py-2 rounded-2xl"
                                >
                                    {subjects.map(subject => (
                                        <option key={subject} value={subject}>{subject}</option>
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
                        <FormItem className='relative flex flex-col gap-8'>
                            <FormLabel className='font-medium text-[#003B33] text-2xl'>Documents:</FormLabel>
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
                                    placeholder="Clinic # of Cases"
                                    className="w-screen max-w-[408px] outline-none  border-2 border-[rgba(0,59,51,0.5)] shadow-md px-2 py-2 rounded-2xl"
                                />
                            </FormControl>
                            <FormMessage className='absolute -bottom-6 text-[#D84243]' />
                        </FormItem>
                    )}
                />
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