'use client'
import { useOrganizationStore } from "@/lib/store";

import { useState } from "react";

export default function SubmissionReviewPage()
{
    const { organizations, acceptOrganization, declineOrganization } = useOrganizationStore()
    
    const downloadFiles = (files: string[]) => {
        files.forEach((file, index) => {
            const link = document.createElement('a')
            link.href = file
            link.download = file
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
        })
    }

    return (
        <section className='flex flex-col gap-8 px-8 py-8 overflow-auto'>
            <div className='flex flex-col bg-[#f0f0f0] divide-y rounded-3xl border-[rgba(0,59,51,0.5)] gap-12 py-8 mx-auto border-8 w-screen max-w-[1080px]'>
                {organizations
                .filter(organization => organization.status === 'Pending')
                .map((organization, index) => (
                    <div className='px-12 flex items-center justify-between py-4'>
                        <p className='text-[rgba(0,59,51,1)] text-2xl'>{index + 1}</p>
                        <div className='flex flex-col gap-3'>
                            <p className='text-[rgba(0,59,51,1)] text-2xl'>{organization.name}</p>
                            <p className='text-[rgba(0,59,51,1)] text-xl'>{organization.type}</p>
                            <p className='text-[rgba(0,59,51,1)] text-lg'>{organization.description}</p>
                            <button onClick={() => downloadFiles(organization.pdf)} className='outline-none border-none mr-auto max-w-fit bg-[#F8E6D9] px-1.5 py-1.5 rounded-md'>View PDF(s)</button>                        </div>
                        <div className='flex gap-2 h-full'>
                            <button onClick={() => acceptOrganization(organization.name)} className='rounded-3xl h-fit px-4 flex items-center justify-center py-0.5 bg-[rgba(147,255,152,0.5)]'>Accept</button>
                            <button onClick={() => declineOrganization(organization.name)} className='rounded-3xl h-fit px-4 flex items-center justify-center py-0.5 bg-[rgba(255,141,141,0.5)]'>Decline</button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}