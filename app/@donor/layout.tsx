import DonorOnBoarding from "@/components/Donor/DonorOnBoarding";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";

export default async function LayoutDonor({ children }: { children: React.ReactNode }) 
{
    const isDonorLoggedIn = await getCookie('donorLoggedIn', { cookies })
    if(!isDonorLoggedIn) return null

    const loggedInDonor = await getCookie('donorEmail', { cookies })

    return (
        <DonorOnBoarding loggedInDonor={loggedInDonor}>
            {children}
        </DonorOnBoarding>
    )
}