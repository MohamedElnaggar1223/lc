import { create } from 'zustand';

export type Organization = {
    name: string,
    type: 'Mosque' | 'Charity' | 'Hospital' | 'Orphanage' | 'Public School' | 'Church',
    description: string,
    email: string,
    number: string,
    firstName: string,
    lastName: string,
    address: string,
    area: string,
    governorate: "Alexandria" | "Aswan" | "Asyut" | "Beheira" | "Beni Suef" | "Cairo" | "Dakahlia" | "Damietta" | "Faiyum" | "Gharbia" | "Giza" | "Ismailia" | "Kafr El Sheikh" | "Luxor" | "Matruh" | "Minya" | "Monufia" | "New Valley" | "North Sinai" | "Port Said" | "Qalyubia" | "Qena" | "Red Sea" | "Sharqia" | "Sohag" | "South Sinai" | "Suez",
    gender: "Male" | "Female",
    pdf: string[],
    status: 'Pending' | 'Accepted' | 'Declined',
    password: string
    location: {
        lat: number,
        lng: number
    }
}

export type OrganizationState = {
    organizations: Organization[],
    addOrganization: (organization: Organization) => void,
    removeOrganization: (name: string) => void,
    acceptOrganization: (name: string) => void,
    declineOrganization: (name: string) => void,
    updateOrganization: (name: string, organization: Organization) => void,
}

export const useOrganizationStore = create<OrganizationState>()((set) => ({
    organizations: [
        {
            name: 'Organization 6',
            type: 'Charity',
            description: 'A charity in Egypt that accepts donations.',
            pdf: ['/organizations/organization1.pdf'],
            firstName: 'John',
            lastName: 'Doe',
            address: '123 Main St',
            area: 'Cairo',
            governorate: 'Cairo',
            email: 'john.doe@example.com',
            number: '011234567890',
            gender: 'Male',
            status: 'Pending',
            password: 'password6',
            location: { lat: 0, lng: 0 }
        },
        {
            name: 'Organization 7',
            type: 'Mosque',
            description: 'A mosque in Egypt that accepts donations.',
            pdf: ['/organizations/organization2.pdf'],
            firstName: 'Jane',
            lastName: 'Smith',
            address: '456 Elm St',
            area: 'Alexandria',
            governorate: 'Alexandria',
            email: 'jane.smith@example.com',
            number: '010987654321',
            gender: 'Female',
            status: 'Pending',
            password: 'password7',
            location: { lat: 0, lng: 0 }
        },
        {
            name: 'Organization 8',
            type: 'Hospital',
            description: 'A hospital in Egypt that accepts donations.',
            pdf: ['/organizations/organization3.pdf'],
            firstName: 'Bob',
            lastName: 'Johnson',
            address: '789 Oak St',
            area: 'Giza',
            governorate: 'Giza',
            email: 'bob.johnson@example.com',
            number: '011357924680',
            gender: 'Male',
            status: 'Pending',
            password: 'password8',
            location: { lat: 0, lng: 0 }
        },
        {
            name: 'Organization 1',
            type: 'Mosque',
            description: 'A mosque in Egypt that accepts donations.',
            email: 'organization1@example.com',
            number: '011234567890',
            firstName: 'John',
            lastName: 'Doe',
            address: '123 Main St',
            area: 'Cairo',
            governorate: 'Cairo',
            gender: 'Male',
            status: 'Accepted',
            pdf: ['/organizations/organization3.pdf'],
            password: 'password1',
            location: { lat: 0, lng: 0 }
        },
        {
            name: 'Organization 2',
            type: 'Charity',
            description: 'A charity organization in Egypt that accepts donations.',
            email: 'organization2@example.com',
            number: '011234567890',
            firstName: 'Jane',
            lastName: 'Smith',
            address: '456 Elm St',
            area: 'Alexandria',
            governorate: 'Alexandria',
            gender: 'Female',
            status: 'Accepted',
            pdf: ['/organizations/organization3.pdf'],
            password: 'password2',
            location: { lat: 0, lng: 0 }
        },
        {
            name: 'Organization 3',
            type: 'Hospital',
            description: 'A hospital in Egypt that accepts donations.',
            email: 'organization3@example.com',
            number: '011234567890',
            firstName: 'Bob',
            lastName: 'Johnson',
            address: '789 Oak St',
            area: 'Giza',
            governorate: 'Giza',
            gender: 'Male',
            status: 'Accepted',
            pdf: ['/organizations/organization3.pdf'],
            password: 'password3',
            location: { lat: 0, lng: 0 }
        },
        {
            name: 'Organization 4',
            type: 'Orphanage',
            description: 'An orphanage in Egypt that accepts donations.',
            email: 'organization4@example.com',
            number: '011234567890',
            firstName: 'Alice',
            lastName: 'Williams',
            address: '321 Pine St',
            area: 'Luxor',
            governorate: 'Luxor',
            gender: 'Female',
            status: 'Accepted',
            pdf: ['/organizations/organization3.pdf'],
            password: 'password4',
            location: { lat: 0, lng: 0 }
        },
        {
            name: 'Organization 5',
            type: 'Public School',
            description: 'A public school in Egypt that accepts donations.',
            email: 'organization5@example.com',
            number: '011234567890',
            firstName: 'David',
            lastName: 'Brown',
            address: '654 Maple St',
            area: 'Aswan',
            governorate: 'Aswan',
            gender: 'Male',
            status: 'Accepted',
            pdf: ['/organizations/organization3.pdf'],
            password: 'password5',
            location: { lat: 0, lng: 0 }
        },
    ],
    acceptOrganization: (name) => set((state) => ({
        organizations: state.organizations.map((organization) => organization.name === name ? { ...organization, status: 'Accepted' } : organization)
    })),
    addOrganization: (organization) => set((state) => ({ organizations: [...state.organizations, organization] })),
    declineOrganization: (name) => set((state) => ({
        organizations: state.organizations.map((organization) => organization.name === name ? { ...organization, status: 'Declined' } : organization)
    })),
    removeOrganization: (name) => set((state) => ({ organizations: state.organizations.filter((organization) => organization.name !== name) })),
    updateOrganization: (name, organization) => set((state) => ({
        organizations: state.organizations.map((org) => org.name === name ? organization : org)
    }))
}))

export type Admin = {
    email: string,
    password: string,
}

export type AdminState = {
    admin: Admin,
    updatePassword: (newPassword: string) => void,
}

export const useAdminStore = create<AdminState>()((set) => ({
    admin: {
        email: 'admin@test.com',
        password: 'admin123'
    },
    updatePassword: (newPassword) => set((state) => ({ admin: {...state.admin, password: newPassword} }))
}))

export type Donor = {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    number: string,
    gender: "Male" | "Female",
    address: string,
    area: string,
    governorate: "Alexandria" | "Aswan" | "Asyut" | "Beheira" | "Beni Suef" | "Cairo" | "Dakahlia" | "Damietta" | "Faiyum" | "Gharbia" | "Giza" | "Ismailia" | "Kafr El Sheikh" | "Luxor" | "Matruh" | "Minya" | "Monufia" | "New Valley" | "North Sinai" | "Port Said" | "Qalyubia" | "Qena" | "Red Sea" | "Sharqia" | "Sohag" | "South Sinai" | "Suez",
    role: 'regular' | 'teacher' | 'doctor',
    activated: boolean,
}

export type DonorState = {
    donors: Donor[],
    addDonor: (donor: Donor) => void,
    removeDonor: (email: string) => void,
    updateDonor: (email: string, donor: Donor) => void,
}

export const useDonorStore = create<DonorState>()((set) => ({
    donors: [
        {
            firstName: 'Donor 1',
            lastName: 'Lastname 1',
            email: 'donor1@example.com',
            password: 'password1',
            number: '011234567890',
            gender: 'Male',
            address: '123 Main St',
            area: 'Cairo',
            governorate: 'Cairo',
            role: 'regular',
            activated: true,
        },
        {
            firstName: 'Donor 2',
            lastName: 'Lastname 2',
            email: 'donor2@example.com',
            password: 'password2',
            number: '010987654321',
            gender: 'Female',
            address: '456 Elm St',
            area: 'Alexandria',
            governorate: 'Alexandria',
            role: 'teacher',
            activated: true,
        },
        {
            firstName: 'Donor 3',
            lastName: 'Lastname 3',
            email: 'donor3@example.com',
            password: 'password3',
            number: '011357924680',
            gender: 'Male',
            address: '789 Oak St',
            area: 'Giza',
            governorate: 'Giza',
            role: 'teacher',
            activated: true,
        },
        {
            firstName: 'Donor 4',
            lastName: 'Lastname 4',
            email: 'donor4@example.com',
            password: 'password4',
            number: '011234567890',
            gender: 'Female',
            address: '321 Pine St',
            area: 'Luxor',
            governorate: 'Luxor',
            role: 'doctor',
            activated: true,
        },
        {
            firstName: 'Donor 5',
            lastName: 'Lastname 5',
            email: 'donor5@example.com',
            password: 'password5',
            number: '011234567890',
            gender: 'Male',
            address: '654 Maple St',
            area: 'Aswan',
            governorate: 'Aswan',
            role: 'doctor',
            activated: true,
        },
        {
            firstName: 'Donor 6',
            lastName: 'Lastname 6',
            email: 'donor6@example.com',
            password: 'password6',
            number: '011234567890',
            gender: 'Female',
            address: '987 Oak St',
            area: 'Cairo',
            governorate: 'Cairo',
            role: 'regular',
            activated: true,
        },
        {
            firstName: 'Donor 7',
            lastName: 'Lastname 7',
            email: 'donor7@example.com',
            password: 'password7',
            number: '011234567890',
            gender: 'Male',
            address: '654 Elm St',
            area: 'Alexandria',
            governorate: 'Alexandria',
            role: 'regular',
            activated: true,
        },
        {
            firstName: 'Donor 8',
            lastName: 'Lastname 8',
            email: 'donor8@example.com',
            password: 'password8',
            number: '011234567890',
            gender: 'Female',
            address: '321 Oak St',
            area: 'Giza',
            governorate: 'Giza',
            role: 'doctor',
            activated: true,
        },
        {
            firstName: 'Donor 9',
            lastName: 'Lastname 9',
            email: 'donor9@example.com',
            password: 'password9',
            number: '011234567890',
            gender: 'Male',
            address: '987 Pine St',
            area: 'Luxor',
            governorate: 'Luxor',
            role: 'regular',
            activated: true,
        },
        {
            firstName: 'Donor 10',
            lastName: 'Lastname 10',
            email: 'donor10@example.com',
            password: 'password10',
            number: '011234567890',
            gender: 'Female',
            address: '654 Maple St',
            area: 'Aswan',
            governorate: 'Aswan',
            role: 'regular',
            activated: false,
        },
    ],
    addDonor: (donor) => set((state) => ({ donors: [...state.donors, donor] })),
    removeDonor: (email) => set((state) => ({ donors: state.donors.filter((donor) => donor.email !== email) })),
    updateDonor: (email, donor) => set((state) => ({
        donors: state.donors.map((d) => d.email === email ? donor : d)
    }))
}))

export type Doctor = {
    email: string
    status: 'Pending' | 'Accepted' | 'Declined'
    pdf: string[]
    clinic: {
        address: string
        area: string
        governorate: "Alexandria" | "Aswan" | "Asyut" | "Beheira" | "Beni Suef" | "Cairo" | "Dakahlia" | "Damietta" | "Faiyum" | "Gharbia" | "Giza" | "Ismailia" | "Kafr El Sheikh" | "Luxor" | "Matruh" | "Minya" | "Monufia" | "New Valley" | "North Sinai" | "Port Said" | "Qalyubia" | "Qena" | "Red Sea" | "Sharqia" | "Sohag" | "South Sinai" | "Suez",
        location: string
        specialty: string
        cases: number
    }
}

export type DoctorState = {
    doctors: Doctor[],
    addDoctor: (doctor: Doctor) => void,
    removeDoctor: (email: string) => void,
    updateDoctor: (email: string, doctor: Doctor) => void,
    acceptDoctor: (email: string) => void,
    declineDoctor: (email: string) => void,
}

export const useDoctorStore = create<DoctorState>()((set) => ({
    doctors: [
        {
            email: 'donor5@example.com',
            status: 'Pending',
            pdf: ['/doctors/doctor1.pdf'],
            clinic: {
                address: '123 Main St',
                area: 'Cairo',
                governorate: 'Cairo',
                location: 'https://maps.app.goo.gl/9SxqbrT9JDN8Hfms5',
                specialty: 'Cardiology',
                cases: 10,
            }
        },
        {
            email: 'donor4@example.com',
            status: 'Accepted',
            pdf: ['/doctors/doctor2.pdf'],
            clinic: {
                address: '456 Elm St',
                area: 'Alexandria',
                governorate: 'Alexandria',
                location: 'https://maps.app.goo.gl/tgCtZfE2Tb23DnbR6',
                specialty: 'Dermatology',
                cases: 20,
            }
        },
        {
            email: 'donor8@example.com',
            status: 'Accepted',
            pdf: ['/doctors/doctor2.pdf'],
            clinic: {
                address: '789 Oak St',
                area: 'Giza',
                governorate: 'Giza',
                location: 'https://maps.app.goo.gl/6Zu7vzZk3g5G4Q2U6',
                specialty: 'Orthopedics',
                cases: 30,
            }
        }
    ],
    acceptDoctor: (email) => set((state) => ({
        doctors: state.doctors.map((doctor) => doctor.email === email ? { ...doctor, status: 'Accepted' } : doctor)
    })),
    addDoctor: (doctor) => set((state) => ({ doctors: [...state.doctors, doctor] })),
    declineDoctor: (email) => set((state) => ({
        doctors: state.doctors.map((doctor) => doctor.email === email ? { ...doctor, status: 'Declined' } : doctor)
    })),
    removeDoctor: (email) => set((state) => ({ doctors: state.doctors.filter((doctor) => doctor.email !== email) })),
    updateDoctor: (email, doctor) => set((state) => ({
        doctors: state.doctors.map((doc) => doc.email === email ? doctor : doc)
    }))
}))

export type Teacher = {
    email: string
    status: 'Pending' | 'Accepted' | 'Declined'
    pdf: string[]
    subject: "Arabic" | "Art" | "Biology" | "Chemistry" | "Computer Science" | "English" | "French" | "Geography" | "History" | "Math" | "Music" | "Physics" | "Physical Education" | "Religion" | "Social Studies" | "Spanish"
    cases: number
}

export type TeacherState = {
    teachers: Teacher[],
    addTeacher: (teacher: Teacher) => void,
    removeTeacher: (email: string) => void,
    updateTeacher: (email: string, teacher: Teacher) => void,
    acceptTeacher: (email: string) => void,
    declineTeacher: (email: string) => void,
}

export const useTeacherStore = create<TeacherState>()((set) => ({
    teachers: [
        {
            email: 'donor2@example.com',
            status: 'Pending',
            pdf: ['/pdfs/teacher1.pdf'],
            subject: 'Math',
            cases: 10,
        },
        {
            email: 'donor3@example.com',
            status: 'Accepted',
            pdf: ['/pdfs/teacher2.pdf'],
            subject: 'Biology',
            cases: 20,
        }
    ],
    acceptTeacher: (email) => set((state) => ({
        teachers: state.teachers.map((teacher) => teacher.email === email ? { ...teacher, status: 'Accepted' } : teacher)
    })),
    addTeacher: (teacher) => set((state) => ({ teachers: [...state.teachers, teacher] })),
    declineTeacher: (email) => set((state) => ({
        teachers: state.teachers.map((teacher) => teacher.email === email ? { ...teacher, status: 'Declined' } : teacher)
    })),
    removeTeacher: (email) => set((state) => ({ teachers: state.teachers.filter((teacher) => teacher.email !== email) })),
    updateTeacher: (email, teacher) => set((state) => ({
        teachers: state.teachers.map((teach) => teach.email === email ? teacher : teach)
    }))
}))

export type Clothes = {
    age: number,
    gender: 'Male' | 'Female',
    season: 'Summer' | 'Winter' | 'Spring' | 'Fall'
}

export type Food = {
    type: 'Vegetables' | 'Fruits' | 'Baked Goods' | 'Fresh Meals' | 'Canned Food',
    quantity: string,
    name: string
}

export type Toys = {
    type: 'Dolls' | 'Cars' | 'Stuffed Toys' | 'Sports' | 'Outdoor' | 'Board Games',
    age: number
    quantity: string,
    gender: 'Male' | 'Female',
    image: string
}

export type MedicalSupplies = {
    type: 'Medication' | 'Medical Devices' | 'Medical Equipment',
    medicationType?: 'Painkillers' | 'Antibiotics' | 'Antivirals' | 'Antifungals' | 'Antiparasitics',
    deviceType?: 'Wheelchair' | 'Crutches' | 'Oxygen Tank' | 'Blood Pressure Monitor' | 'Thermometer',
    quantity: string,
    use: string,
    image: string
    gender: 'Male' | 'Female'
    medicationUse?: 'Pain Relief' | 'Antibacterial' | 'Antiviral' | 'Antifungal' | 'Antiparasitic'
}

export type SchoolSupplies = {
    type: 'Books' | 'Stationery',
    bookName?: string,
    bookSummary?: string,
    bookEdition?: string,
    bookAuthor?: string,
    bookLanguage?: string,
    bookImage?: string,
    stationaryType?: 'Pens' | 'Pencils' | 'Erasers' | 'Rulers' | 'Sharpeners' | 'Notebooks' | 'Folders' | 'Binders' | 'Scissors' | 'Glue' | 'Tape' | 'Staplers' | 'Staples' | 'Paper' | 'Markers' | 'Highlighters' | 'Crayons' | 'Colored Pencils' | 'Paint' | 'Brushes' | 'Canvas' | 'Sketchbooks' | 'Watercolors' | 'Pastels' | 'Charcoal' | 'Ink' | 'Easels' | 'Palettes' | 'Clay' | 'Glazes' | 'Pottery Tools' | 'Wood' | 'Metal' | 'Plastic' | 'Fabric' | 'Glass' | 'Ceramic'
}

export type BloodDonation = {
    bloodType: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-',
    nameOfPatient: string
    location: {
        lat: number,
        lng: number
    }
}

export type MedicalCases = {
    speciality: 'Cardiology' | 'Dermatology' | 'Orthopedics' | 'Pediatrics' | 'Neurology' | 'Oncology' | 'Gynecology' | 'Urology' | 'Psychiatry' | 'Dentistry',
    patientName: string,
    patientAge: number,
    patientGender: 'Male' | 'Female'
    patientWeight: number,
    description: string,
    location: {
        lat: number,
        lng: number
    }
    fullfilledBy?: string
}

export type Teaching = {
    subject: 'Arabic' | 'Art' | 'Biology' | 'Chemistry' | 'Computer Science' | 'English' | 'French' | 'Geography' | 'History' | 'Math' | 'Music' | 'Physics' | 'Physical Education' | 'Religion' | 'Social Studies' | 'Spanish',
    numberOfStudents: number,
    location: {
        lat: number,
        lng: number
    }
    fullfilledBy?: string
}

export type PostType = {
    id: number
    organization: string,
    category: 'Clothes' | 'Food' | 'Toys' | 'Medical Supplies' | 'School Supplies' | 'Blood Donation' | 'Medical Cases' | 'Teaching',
    status?: 'Pending' | 'Fullfilled' | 'In Progress',
    ETA?: Date | null,
    details: Clothes | Food | Toys | MedicalSupplies | SchoolSupplies | BloodDonation | MedicalCases | Teaching
}
    

export type PostsState = {
    posts: PostType[],
    addPost: (post: PostType) => void,
    removePost: (index: number) => void,
    updatePost: (index: number, post: PostType) => void,
    fullfillPost: (index: number, fullfilledBy: string) => void,
}

export const usePostsStore = create<PostsState>()((set) => ({
    posts: [
        {
            id: 1,
            organization: 'organization1@example.com',
            category: 'Clothes',
            status: 'Pending',
            details: {
                age: 7,
                gender: 'Male',
                season: 'Winter',
            } as Clothes
        },
        {
            id: 2,
            organization: 'organization2@example.com',
            category: 'Food',
            status: 'Pending',
            details: {
                type: 'Vegetables',
                quantity: '10KG',
                name: 'Tomatoes',
            } as Food
        },
        {
            id: 3,
            organization: 'organization1@example.com',
            category: 'Food',
            status: 'Pending',
            details: {
                type: 'Baked Goods',
                quantity: '20',
                name: 'Bread',
            } as Food
        },
        {
            id: 4,
            organization: 'organization3@example.com',
            category: 'Medical Supplies',
            status: 'Pending',
            details: {
                type: 'Medication',
                medicationType: 'Painkillers',
                quantity: '50',
                use: 'Pain Relief',
                image: '/images/medication.webp',
            } as MedicalSupplies
        },
        {
            id: 5,
            organization: 'organization2@example.com',
            category: 'Toys',
            status: 'Pending',
            details: {
                type: 'Dolls',
                gender: 'Female',
                quantity: '1',
                age: 5,
                image: '/images/doll.png',
            } as Toys
        },
        {
            id: 6,
            organization: 'organization3@example.com',
            category: 'Medical Supplies',
            status: 'Pending',
            details: {
                type: 'Medical Devices',
                deviceType: 'Wheelchair',
                quantity: '1',
                use: 'Mobility',
                image: '/images/wheelchair.jpg',
            } as MedicalSupplies
        },
        {
            id: 7,
            organization: 'organization2@example.com',
            category: 'Toys',
            status: 'Pending',
            details: {
                type: 'Cars',
                age: 10,
                image: '/images/car.png',
                quantity: '1',
                gender: 'Male'
            } as Toys
        },
        {
            id: 8,
            organization: 'organization5@example.com',
            category: 'School Supplies',
            status: 'Pending',
            details: {
                type: 'Books',
                bookName: 'Mathematics 101',
                bookSummary: 'A book about basic math.',
                bookEdition: '1st Edition',
                bookAuthor: 'John Doe',
                bookLanguage: 'English',
                bookImage: '/images/book.png',
            } as SchoolSupplies
        },
        {
            id: 9,
            organization: 'organization3@example.com',
            category: 'Blood Donation',
            status: 'Pending',
            details: {
                bloodType: 'A+',
                nameOfPatient: 'John Doe',
            } as BloodDonation
        },
        {
            id: 10,
            organization: 'organization4@example.com',
            category: 'Clothes',
            status: 'In Progress',
            ETA: new Date(new Date().setMinutes(new Date().getMinutes() + 30)),
            details: {
                age: 5,
                gender: 'Female',
                season: 'Summer',
            } as Clothes
        },
        {
            id: 11,
            organization: 'organization4@example.com',
            category: 'Food',
            ETA: null,
            status: 'In Progress',
            details: {
                type: 'Fruits',
                quantity: '5KG',
                name: 'Apples',
            } as Food
        },
        {
            id: 12,
            organization: 'organization3@example.com',
            category: 'Medical Cases',
            status: 'Pending',
            details: {
                speciality: 'Cardiology',
                patientName: 'John Doe',
                patientAge: 45,
                patientGender: 'Male',
                patientWeight: 70,
                description: 'Patient needs a heart transplant.',
                location: {
                    lat: 31,
                    lng: 31
                }
            } as MedicalCases
        },
        {
            id: 13,
            organization: 'organization5@example.com',
            category: 'Teaching',
            status: 'Pending',
            details: {
                subject: 'Math',
                numberOfStudents: 30,
                location: {
                    lat: 30,
                    lng: 30
                }
            } as Teaching
        },
        {
            id: 14,
            organization: 'organization3@example.com',
            category: 'Medical Cases',
            status: 'Pending',
            details: {
                speciality: 'Dermatology',
                patientName: 'Jane Smith',
                patientAge: 32,
                patientGender: 'Female',
                patientWeight: 60,
                description: 'Patient needs a skin graft.',
                location: {
                    lat: 30.5,
                    lng: 30.5
                }
            } as MedicalCases
        },
        {
            id: 15,
            organization: 'organization5@example.com',
            category: 'Teaching',
            status: 'Pending',
            details: {
                subject: 'Chemistry',
                numberOfStudents: 25,
                location: {
                    lat: 30.7,
                    lng: 30.7
                }
            } as Teaching
        }
    ],
    addPost: (post) => set((state) => ({ posts: [...state.posts, post] })),
    fullfillPost: (id, fullfilledBy) => set((state) => ({
        posts: state.posts.map((post) => post.id === id ? { ...post, status: 'Fullfilled', details: { ...post.details, fullfilledBy } } : post)
    })),
    removePost: (id) => set((state) => ({ posts: state.posts.filter((post) => post.id !== id) })),
    updatePost: (id, post) => set((state) => ({
        posts: state.posts.map((p) => p.id === id ? post : p)
    }))
}))