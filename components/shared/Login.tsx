'use client'
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Login({ children }: { children: React.ReactNode }) 
{
    const pathname = usePathname()

    const ImageMotion = motion(Image)
    
    return (
        <AnimatePresence>
            <section className='flex h-full'>
                {pathname.includes('/sign-up') && (
                    <motion.div 
                        exit={{ opacity: 0, transition: { duration: 0.8 } }} // Set duration to 2 seconds
                        transition={{ duration: 0.8 }} layoutId='formBigger' className='flex flex-1 backgroundGradient py-16 items-center justify-center'
                    >
                        <motion.div 
                            exit={{ opacity: 0, transition: { duration: 0.8 } }} // Set duration to 2 seconds
                            transition={{ duration: 0.8 }} layoutId='formBig' className='bg-[#FFF] text-[#003B33] rounded-3xl max-w-[568px] w-screen h-full flex flex-col justify-evenly px-16'
                        >
                            {children}
                        </motion.div>
                    </motion.div>
                )}
                <motion.div 
                    exit={{ opacity: 0, transition: { duration: 0.8 } }} // Set duration to 2 seconds
                    transition={{ duration: 0.8 }} layoutId='biggerBox' className='relative flex flex-1 items-center justify-center overflow-hidden'>
                <motion.div 
                    exit={{ opacity: 0, transition: { duration: 0.8 } }} // Set duration to 2 seconds
                    transition={{ duration: 0.8 }} layoutId='bigBox' className='relative z-20 flex flex-col items-center justify-evenly w-screen max-w-[450px] bg-white max-h-[600px] h-screen rounded-3xl'>
                    <div className='flex flex-col items-center justify-start py-12 gap-8 h-full'>
                    <ImageMotion
                        src='/assets/logoSadaqa.png'
                        width={120}
                        height={120}
                        alt='logo'
                        className='animate-bounce'
                    />
                    {/* <p className='text-2xl italic font-medium text-[#003B33]'>SADAQA</p> */}
                    {pathname.includes('/sign-up') ? (
                        <div className="flex flex-col items-center text-center justify-start gap-12 px-12 flex-1">
                            <p className='text-[#003B33] font-black text-5xl'>Hello, Friend!</p>
                            <p className='text-[#003B33] font-medium text-xl text-center'>Please enter your personal details to start your donation journey with us! As you take this step forward, know that you're joining a group of individuals who share your values and are committed to creating positive change in the world.</p>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center text-center justify-start gap-12 px-12 flex-1">
                            <p className='text-[#003B33] font-black text-5xl'>Welcome back!</p>
                            <p className='text-[#003B33] font-medium text-xl text-center'>Dear Supporter, it is with great joy that you return. Your commitment to our cause is truly remarkable. As you log in once again, remember the countless lives you've touched and the profound impact you've made.!</p>
                        </div>
                    )}
                    </div>
                    {/* <p className='text-center text-[#003B33] text-2xl px-2'>
                    Lorem ipsum dolor sit amet, consectetur 
                    adipiscing elit, sed do eiusmod tempor incididunt
                    ut labore et dolore magna aliqua.
                    Quis eleifend quam adipiscing 
                    vitae proin sagittis. Commodo quis imperdiet
                    massa tincidunt nunc pulvinar sapien et ligula. 
                    </p> */}
                </motion.div>
                <motion.div 
                    animate={{ opacity: 0.5 }}
                    exit={{ opacity: 0, transition: { duration: 0.8 } }} // Set duration to 2 seconds
                    transition={{ duration: 0.8 }} layoutId="greenBox" className='absolute w-screen max-w-[475px] max-h-[650px] h-screen z-10 bg-[#003B33] opacity-40 rounded-3xl -rotate-[20deg] animate-spin-second' />
                <motion.div 
                    animate={{ opacity: 0.8 }}
                    exit={{ opacity: 0, transition: { duration: 0.8 } }} // Set duration to 2 seconds
                    transition={{ duration: 0.8 }} layoutId="yellowBox" className='absolute w-screen max-w-[475px] max-h-[650px] h-screen z-10 bg-[#F4D8C2] opacity-80 rounded-3xl rotate-[20deg] animate-spin-first' />
                </motion.div>
                {!pathname?.includes('/sign-up') && (
                    <motion.div 
                        exit={{ opacity: 0, transition: { duration: 0.8 } }} // Set duration to 2 seconds
                        transition={{ duration: 0.8 }} layoutId='formBigger' className='flex flex-1 backgroundGradient py-16 items-center justify-center'
                    >
                    <motion.div 
                        exit={{ opacity: 0, transition: { duration: 0.8 } }} // Set duration to 2 seconds
                        transition={{ duration: 0.8 }} layoutId='formBig' className='bg-[#FFF] text-[#003B33] rounded-3xl max-w-[568px] w-screen h-full flex flex-col justify-evenly px-16'
                    >
                        {children}
                    </motion.div>
                    </motion.div>
                )}
            </section>
        </AnimatePresence>
    )
}