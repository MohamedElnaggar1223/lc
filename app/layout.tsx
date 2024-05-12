import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";
import "./globals.css";
import Slider from "@/components/shared/Slider";
import TopBar from "@/components/shared/TopBar";
import Login from "@/components/shared/Login";

const playfair = Playfair_Display({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sadaqa",
  description: "Sadaqa is a platform for giving and receiving donations.",
};

export default async function RootLayout({
  children,
  admin,
  donor,
  organization
}: Readonly<{
  children: React.ReactNode;
  admin: React.ReactNode;
  donor: React.ReactNode;
  organization: React.ReactNode;
}>) {
  const isAdminLoggedIn = await getCookie('adminLoggedIn', { cookies })
  const isDonorLoggedIn = await getCookie('donorLoggedIn', { cookies })
  const isOrganizationLoggedIn = await getCookie('organizationLoggedIn', { cookies })

	if(![isAdminLoggedIn, isDonorLoggedIn, isOrganizationLoggedIn].some(elem => elem)) return (
    <html lang="en">
      <body className={playfair.className}>
        <main className="relative w-screen h-screen max-h-screen">
          <Login>
            {children}
          </Login>
        </main>
      </body>
    </html>
	)
  return (
    <html lang="en">
      <body className={playfair.className}>
        <main className="relative w-screen overflow-x-hidden h-screen max-h-screen flex">
          <Slider />
          <div className='h-screen max-h-screen flex flex-col flex-1 py-4 backgroundImage'>
            <TopBar />
            {/* {children} */}
            {isAdminLoggedIn ? admin : isDonorLoggedIn ? donor : isOrganizationLoggedIn ? organization : null}
          </div>
		    </main>
      </body>
    </html>
  );
}
