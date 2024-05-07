import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import LogInForm from "@/components/shared/LogInForm";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";
import "./globals.css";
import Slider from "@/components/shared/Slider";
import TopBar from "@/components/shared/TopBar";

const playfair = Playfair_Display({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sadaqa",
  description: "Sadaqa is a platform for giving and receiving donations.",
};

export default async function RootLayout({
  children,
  admin,
  donor,
  receiver
}: Readonly<{
  children: React.ReactNode;
  admin: React.ReactNode;
  donor: React.ReactNode;
  receiver: React.ReactNode;
}>) {
  const isAdminLoggedIn = await getCookie('adminLoggedIn', { cookies })
  const isDonorLoggedIn = await getCookie('donorLoggedIn', { cookies })
  const isReceiverLoggedIn = await getCookie('receiverLoggedIn', { cookies })

	if(![isAdminLoggedIn, isDonorLoggedIn, isReceiverLoggedIn].some(elem => elem)) return (
    <html lang="en">
      <body className={playfair.className}>
        <main className="relative w-screen h-screen max-h-screen">
          <section className='flex h-full'>
            <div className='relative flex flex-1 items-center justify-center overflow-hidden'>
              <div className='relative z-20 flex flex-col items-center justify-evenly w-screen max-w-[450px] bg-white max-h-[600px] h-screen rounded-3xl'>
                <div className='flex flex-col gap-1'>
                  {/* <Image
                    src='/assets/logo.png'
                    width={100}
                    height={100}
                    alt='logo'
                  />
                  <p className='text-2xl italic font-medium text-[#003B33]'>SADAQA</p> */}
                </div>
                {/* <p className='text-center text-[#003B33] text-2xl px-2'>
                  Lorem ipsum dolor sit amet, consectetur 
                  adipiscing elit, sed do eiusmod tempor incididunt
                  ut labore et dolore magna aliqua.
                  Quis eleifend quam adipiscing 
                  vitae proin sagittis. Commodo quis imperdiet
                  massa tincidunt nunc pulvinar sapien et ligula. 
                </p> */}
              </div>
              <div className='absolute w-screen max-w-[475px] max-h-[650px] h-screen z-10 bg-[#003B33] opacity-40 rounded-3xl -rotate-[20deg] animate-spin-second' />
              <div className='absolute w-screen max-w-[475px] max-h-[650px] h-screen z-10 bg-[#F4D8C2] opacity-80 rounded-3xl rotate-[20deg] animate-spin-first' />
            </div>
            <div className='flex flex-1 backgroundGradient py-16 items-center justify-center'>
              <div className='bg-[#FFF] text-[#003B33] rounded-3xl max-w-[568px] w-screen h-full flex flex-col justify-evenly px-16'>
                <p className='font-bold text-5xl'>Log in</p>
                <LogInForm />
              </div>
            </div>
          </section>
        </main>
      </body>
    </html>
	)
  return (
    <html lang="en">
      <body className={playfair.className}>
        <main className="relative w-screen h-screen max-h-screen flex">
          <Slider />
          <div className='h-screen max-h-screen flex flex-col flex-1 py-4 backgroundImage'>
            <TopBar />
            {/* {children} */}
            {isAdminLoggedIn ? admin : isDonorLoggedIn ? donor : isReceiverLoggedIn ? receiver : null}
          </div>
		    </main>
      </body>
    </html>
  );
}
