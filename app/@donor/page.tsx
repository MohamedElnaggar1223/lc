'use client'

import BloodDonationPost from "@/components/Donor/BloodDonationPost"
import ClothesPost from "@/components/Donor/ClothesPost"
import FoodPost from "@/components/Donor/FoodPost"
import MedicalCasesPost from "@/components/Donor/MedicalCasesPost"
import MedicalSuppliesPost from "@/components/Donor/MedicalSuppliesPost"
import SchoolSuppliesPost from "@/components/Donor/SchoolSuppliesPost"
import ToysPost from "@/components/Donor/ToysPost"
import { BloodDonation, Clothes, Food, MedicalCases, MedicalSupplies, SchoolSupplies, Teaching, Toys, useDoctorStore, useDonorStore, useOrganizationStore, usePostsStore, useTeacherStore } from "@/lib/store"
import { getCookie } from "cookies-next"
import { useEffect, useState } from "react"

export default function HomeDonor()
{
    const [category, setCategory] = useState<"All" | "Clothes" | "Food" | "Toys" | "Medical Supplies" | "School Supplies" | "Blood Donation" | "Medical Cases" | "Teaching">('All')
    const [age, setAge] = useState<"All" | number>("All")
    const [gender, setGender] = useState<"Male" | "Female" | "All">("All")
    const [season, setSeason] = useState<'Summer' | 'Winter' | 'Spring' | 'Fall' | "All">("All")
    const [schoolSupplies, setSchoolSupplies] = useState<"All" | "Books" | "Stationary" | "All">("All")
    const [toyCategory, setToyCategory] = useState<'Dolls' | 'Cars' | 'Stuffed Toys' | 'Sports' | 'Outdoor' | 'Board Games' | "All">("All")
    const [foodCategory, setFoodCategory] = useState<'Vegetables' | 'Fruits' | 'Baked Goods' | 'Fresh Meals' | 'Canned Food' | 'All'>('All')
    const [medicalSupplies, setMedicalSupplies] = useState<'All' | 'Medication' | 'Medical Devices' | 'Medical Equipment'>('All')
    const [medicationCategory, setMedicationCategory] = useState<'All' | "Painkillers" | "Antibiotics" | "Antivirals" | "Antifungals" | "Antiparasitics">('All')
    const [governorate, setGovernorate] = useState<'All' | "Alexandria" | "Aswan" | "Asyut" | "Beheira" | "Beni Suef" | "Cairo" | "Dakahlia" | "Damietta" | "Faiyum" | "Gharbia" | "Giza" | "Ismailia" | "Kafr El Sheikh" | "Luxor" | "Matruh" | "Minya" | "Monufia" | "New Valley" | "North Sinai" | "Port Said" | "Qalyubia" | "Qena" | "Red Sea" | "Sharqia" | "Sohag" | "South Sinai" | "Suez">('All')
    const [hospital, setHospital] = useState<'All' | string>('All')
    const [area, setArea] = useState<'All' | "Maadi" | "Zamalek" | "Downtown" | "Heliopolis" | "Nasr City" | "6th of October City" | "Sheikh Zayed" | "New Cairo" | "El Rehab City" | "Madinet Nasr" | "El Shorouk City" | "El Tagamo' El Khames" | "El Obour City" | "El Mohandessin" | "El Agouza" | "El Dokki" | "El Haram">('All')
    const [speciality, setSpeciality] = useState<'All' | "Cardiology" | "Dermatology" | "Endocrinology" | "Gastroenterology" | "Hematology" | "Infectious Disease" | "Nephrology" | "Neurology" | "Oncology" | "Pulmonology" | "Rheumatology" | "Urology">('All')
    const [organization, setOrganization] = useState<'All' | string>('All')
    const [subject, setSubject] = useState<'All' | "Arabic" | "Art" | "Biology" | "Chemistry" | "Computer Science" | "English" | "French" | "Geography" | "History" | "Math" | "Music" | "Physics" | "Physical Education" | "Religion" | "Social Studies" | "Spanish">('All')

    const { donors } = useDonorStore()
    const { doctors } = useDoctorStore()
    const { teachers } = useTeacherStore()
    const { posts } = usePostsStore()
    const { organizations } = useOrganizationStore()

    const donorLoggedIn = getCookie('donorEmail')

    if(!donorLoggedIn) return null

    const donor = donors.find(donor => donor.email === donorLoggedIn)
    const isDoctor = doctors.find(doctor => doctor.email === donorLoggedIn)
    const isTeacher = teachers.find(teacher => teacher.email === donorLoggedIn)

    const postsShown = posts
                        .filter(post => post.status === 'Pending')
                        .filter(post => !isDoctor ? post.category !== 'Medical Cases' : true)
                        .filter(post => !isTeacher ? post.category !== 'Teaching' : true)

    useEffect(() => {
        setAge('All')
        setGender('All')
        setSeason('All')
        setSchoolSupplies('All')
        setFoodCategory('All')
        setGovernorate('All')
        setHospital('All')
        setToyCategory('All')
        setMedicalSupplies('All')
        setMedicationCategory('All')
        setArea('All')
        setSpeciality('All')
        setOrganization('All')
        setSubject('All')
    }, [category])

    return (
        <section className='flex flex-col gap-8 px-8 py-8 overflow-auto'>
            <h1 className='italic text-4xl'>Welcome {donor?.firstName}!</h1>
            <div className='flex gap-4 flex-wrap my-2'>
                <div className='flex items-center gap-1'>
                    <p className='text-lg'>Category: </p>
                    <select className='p-2 rounded-lg border-2 border-[#003b33]' value={category} onChange={(e) => setCategory(e.target.value as "All" | "Clothes" | "Food" | "Toys" | "Medical Supplies" | "School Supplies" | "Blood Donation" | "Medical Cases" | "Teaching")}>
                        <option value='All'>All</option>
                        <option value='Clothes'>Clothes</option>
                        <option value='Food'>Food</option>
                        <option value='Toys'>Toys</option>
                        <option value='Medical Supplies'>Medical Supplies</option>
                        <option value='School Supplies'>School Supplies</option>
                        {isDoctor && <option value='Medical Cases'>Medical Cases</option>}
                        {isTeacher && <option value='Teaching'>Teaching</option>}
                        <option value='Blood Donation'>Blood Donation</option>
                    </select>
                </div>
                {category === 'Clothes' && (
                    <>
                        <div className='flex items-center gap-1'>
                            <p className='text-lg'>Gender: </p>
                            <select value={gender} onChange={(e) => setGender(e.target.value as "Male" | "Female" | "All")} className='p-2 rounded-lg border-2 border-[#003b33]'>
                                <option value='All'>All</option>
                                <option value='Male'>Male</option>
                                <option value='Female'>Female</option>
                            </select>
                        </div>
                        <div className='flex items-center gap-1'>
                            <p className='text-lg'>Age: </p>
                            <select value={age} onChange={(e) => setAge(e.target.value === "All" ? "All" : parseInt(e.target.value))} className='p-2 rounded-lg border-2 border-[#003b33]'>
                                <option value='All'>All</option>
                                {Array.from({ length: 100 }, (_, i) => i).map((age) => (
                                    <option key={age} value={age}>{age}</option>
                                ))}
                            </select>
                        </div>
                        <div className='flex items-center gap-1'>
                            <p className='text-lg'>Season: </p>
                            <select value={season} onChange={(e) => setSeason(e.target.value as 'Summer' | 'Winter' | 'Spring' | 'Fall' | "All")} className='p-2 rounded-lg border-2 border-[#003b33]'>
                                <option value='All'>All</option>
                                {['Summer', 'Winter', 'Spring', 'Fall'].map((age) => (
                                    <option key={age} value={age}>{age}</option>
                                ))}
                            </select>
                        </div>
                    </>
                )}
                {category === 'School Supplies' && (
                    <div className='flex items-center gap-1'>
                        <p className='text-lg'>Type: </p>
                        <select value={schoolSupplies} onChange={(e) => setSchoolSupplies(e.target.value as "All" | "Books" | "Stationary")} className='p-2 rounded-lg border-2 border-[#003b33]'>
                            <option value='All'>All</option>
                            <option value='Books'>Books</option>
                            <option value='Stationary'>Stationary</option>
                        </select>
                    </div>
                )}
                {category === 'Toys' && (
                    <>
                        <div className='flex items-center gap-1'>
                            <p className='text-lg'>Gender: </p>
                            <select value={gender} onChange={(e) => setGender(e.target.value as "Male" | "Female" | "All")} className='p-2 rounded-lg border-2 border-[#003b33]'>
                                <option value='All'>All</option>
                                <option value='Male'>Male</option>
                                <option value='Female'>Female</option>
                            </select>
                        </div>
                        <div className='flex items-center gap-1'>
                            <p className='text-lg'>Age: </p>
                            <select value={age} onChange={(e) => setAge(e.target.value === "All" ? "All" : parseInt(e.target.value))} className='p-2 rounded-lg border-2 border-[#003b33]'>
                                <option value='All'>All</option>
                                {Array.from({ length: 100 }, (_, i) => i).map((age) => (
                                    <option key={age} value={age}>{age}</option>
                                ))}
                            </select>
                        </div>
                        <div className='flex items-center gap-1'>
                            <p className='text-lg'>Gender: </p>
                            <select value={toyCategory} onChange={(e) => setToyCategory(e.target.value as 'Dolls' | 'Cars' | 'Stuffed Toys' | 'Sports' | 'Outdoor' | 'Board Games' | "All")} className='p-2 rounded-lg border-2 border-[#003b33]'>
                                <option value='All'>All</option>
                            {['Dolls', 'Cars', 'Stuffed Toys', 'Sports', 'Outdoor', 'Board Games',].map((category) => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                            </select>
                        </div>
                    </>
                )}
                {category === 'Food' && (
                    <div className='flex items-center gap-1'>
                        <p className='text-lg'>Category: </p>
                        <select value={foodCategory} onChange={(e) => setFoodCategory(e.target.value as 'Vegetables' | 'Fruits' | 'Baked Goods' | 'Fresh Meals' | 'Canned Food' | 'All')} className='p-2 rounded-lg border-2 border-[#003b33]'>
                            <option value='All'>All</option>
                            {['Vegetables', 'Fruits', 'Baked Goods', 'Fresh Meals', 'Canned Food'].map((category) => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </select>
                    </div>
                )}
                {category === 'Medical Supplies' && (
                    <>
                        <div className='flex items-center gap-1'>
                            <p className='text-lg'>Type: </p>
                            <select value={medicalSupplies} onChange={(e) => setMedicalSupplies(e.target.value as 'All' | 'Medication' | 'Medical Devices' | 'Medical Equipment')} className='p-2 rounded-lg border-2 border-[#003b33]'>
                                <option value='All'>All</option>
                                <option value='Medication'>Medication</option>
                                <option value='Medical Devices'>Medical Devices</option>
                                <option value='Medical Equipment'>Medical Equipment</option>
                            </select>
                        </div>
                        {medicalSupplies === 'Medication' && (
                            <div className='flex items-center gap-1'>
                                <p className='text-lg'>Medication Type: </p>
                                <select value={medicationCategory} onChange={(e) => setMedicationCategory(e.target.value as 'All' | "Painkillers" | "Antibiotics" | "Antivirals" | "Antifungals" | "Antiparasitics")} className='p-2 rounded-lg border-2 border-[#003b33]'>
                                    <option value='All'>All</option>
                                    {["Painkillers", "Antibiotics", "Antivirals", "Antifungals", "Antiparasitics"].map((category) => (
                                        <option key={category} value={category}>{category}</option>
                                    ))}
                                </select>
                            </div>
                        )}
                    </>
                
                )}
                {category === 'Blood Donation' && (
                    <>
                        <div className='flex items-center gap-1'>
                            <p className='text-lg'>Governorate: </p>
                            <select value={governorate} onChange={(e) => setGovernorate(e.target.value as 'All' | "Alexandria" | "Aswan" | "Asyut" | "Beheira" | "Beni Suef" | "Cairo" | "Dakahlia" | "Damietta" | "Faiyum" | "Gharbia" | "Giza" | "Ismailia" | "Kafr El Sheikh" | "Luxor" | "Matruh" | "Minya" | "Monufia" | "New Valley" | "North Sinai" | "Port Said" | "Qalyubia" | "Qena" | "Red Sea" | "Sharqia" | "Sohag" | "South Sinai" | "Suez")} className='p-2 rounded-lg border-2 border-[#003b33]'>
                                <option value='All'>All</option>
                                {["Alexandria", "Aswan", "Asyut", "Beheira", "Beni Suef", "Cairo", "Dakahlia", "Damietta", "Faiyum", "Gharbia", "Giza", "Ismailia", "Kafr El Sheikh", "Luxor", "Matruh", "Minya", "Monufia", "New Valley", "North Sinai", "Port Said", "Qalyubia", "Qena", "Red Sea", "Sharqia", "Sohag", "South Sinai", "Suez"].map((category) => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </select>
                        </div>
                        <div className='flex items-center gap-1'>
                            <p className='text-lg'>Area: </p>
                            <select value={area} onChange={(e) => setArea(e.target.value as 'All' | "Maadi" | "Zamalek" | "Downtown" | "Heliopolis" | "Nasr City" | "6th of October City" | "Sheikh Zayed" | "New Cairo" | "El Rehab City" | "Madinet Nasr" | "El Shorouk City" | "El Tagamo\' El Khames" | "El Obour City" | "El Mohandessin" | "El Agouza" | "El Dokki" | "El Haram")} className='p-2 rounded-lg border-2 border-[#003b33]'>
                                <option value='All'>All</option>
                                {["Maadi", "Zamalek", "Downtown", "Heliopolis", "Nasr City", "6th of October City", "Sheikh Zayed", "New Cairo", "El Rehab City", "Madinet Nasr", "El Shorouk City", "El Tagamo' El Khames", "El Obour City", "El Mohandessin", "El Agouza", "El Dokki", "El Haram"].map((category) => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </select>
                        </div>
                        <div className='flex items-center gap-1'>
                            <p className='text-lg'>Hospital: </p>
                            <select value={hospital} onChange={(e) => setHospital(e.target.value as 'All' | string)} className='p-2 rounded-lg border-2 border-[#003b33]'>
                                <option value='All'>All</option>
                                {organizations.filter(org => org.type === 'Hospital').map((org) => (
                                    <option key={org.name} value={org.name}>{org.name}</option>
                                ))}
                            </select>
                        </div>
                    </>
                )}
                {category === 'Medical Cases' && (
                    <>
                        <div className='flex items-center gap-1'>
                            <p className='text-lg'>Governorate: </p>
                            <select value={governorate} onChange={(e) => setGovernorate(e.target.value as 'All' | "Alexandria" | "Aswan" | "Asyut" | "Beheira" | "Beni Suef" | "Cairo" | "Dakahlia" | "Damietta" | "Faiyum" | "Gharbia" | "Giza" | "Ismailia" | "Kafr El Sheikh" | "Luxor" | "Matruh" | "Minya" | "Monufia" | "New Valley" | "North Sinai" | "Port Said" | "Qalyubia" | "Qena" | "Red Sea" | "Sharqia" | "Sohag" | "South Sinai" | "Suez")} className='p-2 rounded-lg border-2 border-[#003b33]'>
                                <option value='All'>All</option>
                                {["Alexandria", "Aswan", "Asyut", "Beheira", "Beni Suef", "Cairo", "Dakahlia", "Damietta", "Faiyum", "Gharbia", "Giza", "Ismailia", "Kafr El Sheikh", "Luxor", "Matruh", "Minya", "Monufia", "New Valley", "North Sinai", "Port Said", "Qalyubia", "Qena", "Red Sea", "Sharqia", "Sohag", "South Sinai", "Suez"].map((category) => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </select>
                        </div>
                        <div className='flex items-center gap-1'>
                            <p className='text-lg'>Speciality: </p>
                            <select value={speciality} onChange={(e) => setSpeciality(e.target.value as 'All' | "Cardiology" | "Dermatology" | "Endocrinology" | "Gastroenterology" | "Hematology" | "Infectious Disease" | "Nephrology" | "Neurology" | "Oncology" | "Pulmonology" | "Rheumatology" | "Urology")} className='p-2 rounded-lg border-2 border-[#003b33]'>
                                <option value='All'>All</option>
                                {["Cardiology", "Dermatology", "Endocrinology", "Gastroenterology", "Hematology", "Infectious Disease", "Nephrology", "Neurology", "Oncology", "Pulmonology", "Rheumatology", "Urology"].map((category) => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </select>
                        </div>
                        <div className='flex items-center gap-1'>
                            <p className='text-lg'>Area: </p>
                            <select value={area} onChange={(e) => setArea(e.target.value as 'All' | "Maadi" | "Zamalek" | "Downtown" | "Heliopolis" | "Nasr City" | "6th of October City" | "Sheikh Zayed" | "New Cairo" | "El Rehab City" | "Madinet Nasr" | "El Shorouk City" | "El Tagamo\' El Khames" | "El Obour City" | "El Mohandessin" | "El Agouza" | "El Dokki" | "El Haram")} className='p-2 rounded-lg border-2 border-[#003b33]'>
                                <option value='All'>All</option>
                                {["Maadi", "Zamalek", "Downtown", "Heliopolis", "Nasr City", "6th of October City", "Sheikh Zayed", "New Cairo", "El Rehab City", "Madinet Nasr", "El Shorouk City", "El Tagamo' El Khames", "El Obour City", "El Mohandessin", "El Agouza", "El Dokki", "El Haram"].map((category) => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </select>
                        </div>
                        <div className='flex items-center gap-1'>
                            <p className='text-lg'>Organization: </p>
                            <select value={organization} onChange={(e) => setOrganization(e.target.value as 'All' | string)} className='p-2 rounded-lg border-2 border-[#003b33]'>
                                <option value='All'>All</option>
                                {organizations.map((org) => (
                                    <option key={org.name} value={org.name}>{org.name}</option>
                                ))}
                            </select>
                        </div>
                    </>
                )}
                {category === 'Teaching' && (
                    <>
                        <div className='flex items-center gap-1'>
                            <p className='text-lg'>Subject: </p>
                            <select value={subject} onChange={(e) => setSubject(e.target.value as 'All' | "Arabic" | "Art" | "Biology" | "Chemistry" | "Computer Science" | "English" | "French" | "Geography" | "History" | "Math" | "Music" | "Physics" | "Physical Education" | "Religion" | "Social Studies" | "Spanish")} className='p-2 rounded-lg border-2 border-[#003b33]'>
                                <option value='All'>All</option>
                                {["Arabic", "Art", "Biology", "Chemistry", "Computer Science", "English", "French", "Geography", "History", "Math", "Music", "Physics", "Physical Education", "Religion", "Social Studies", "Spanish"].map((category) => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </select>
                        </div>
                    </>
                )}
            </div>
            <div className='flex flex-col bg-[#f0f0f0] divide-y rounded-3xl border-[rgba(0,59,51,0.5)] gap-12 py-8 mx-auto border-8 w-screen max-w-[1080px]'>
                {postsShown.map((post) => {
                    const postCategory = post.category
                    if(postCategory === 'Clothes')
                    {
                        const details = post.details as Clothes
                        return <ClothesPost key={post.id} category={category} details={details} age={age} gender={gender} season={season} />
                    }
                    else if(postCategory === 'Food')
                    {
                        const details = post.details as Food
                        return <FoodPost key={post.id} details={details} foodCategory={foodCategory} category={category} />
                    }
                    else if(postCategory === 'Toys')
                    {
                        const details = post.details as Toys
                        return <ToysPost key={post.id} details={details} category={category} age={age} gender={gender} toyCategory={toyCategory} />
                    }
                    else if(postCategory === 'Medical Supplies')
                    {
                        const details = post.details as MedicalSupplies
                        return <MedicalSuppliesPost key={post.id} details={details} category={category} medicalSupplies={medicalSupplies} medicationCategory={medicationCategory} />   
                    }
                    else if(postCategory === 'School Supplies')
                    {
                        const details = post.details as SchoolSupplies
                        return <SchoolSuppliesPost key={post.id} details={details} category={category} schoolSupplies={schoolSupplies} />   
                    }
                    else if(postCategory === 'Medical Cases')
                    {
                        const details = post.details as MedicalCases
                        return <MedicalCasesPost key={post.id} details={details} category={category} area={area} governorate={governorate} organization={organization} post={post} speciality={speciality} />   
                    }
                    else if(postCategory === 'Teaching')
                    {
                        const details = post.details as Teaching
                        // return <TeachingPost key={post.id} details={details} category={category} />
                    }
                    else if(postCategory === 'Blood Donation')
                    {
                        const details = post.details as BloodDonation
                        return <BloodDonationPost key={post.id} details={details} category={category} area={area} governorate={governorate} hospital={hospital} post={post} />
                    }
                })}
            </div>
        </section>
    )
}