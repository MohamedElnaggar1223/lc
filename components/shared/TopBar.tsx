import { Bell } from "lucide-react";

export default function TopBar()
{
    return (
        <div className='w-[95%] self-center bg-[#F8E6D9] px-4 py-4 flex items-center justify-between rounded-xl'>
            <div className='flex-1' />
            <Bell />
        </div>
    )
}