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
    pdf: string,
    status: 'Pending' | 'Accepted' | 'Declined',
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
            pdf: '/organizations/organization1.pdf',
            firstName: 'John',
            lastName: 'Doe',
            address: '123 Main St',
            area: 'Cairo',
            governorate: 'Cairo',
            email: 'john.doe@example.com',
            number: '+1234567890',
            gender: 'Male',
            status: 'Pending',
        },
        {
            name: 'Organization 7',
            type: 'Mosque',
            description: 'A mosque in Egypt that accepts donations.',
            pdf: '/organizations/organization2.pdf',
            firstName: 'Jane',
            lastName: 'Smith',
            address: '456 Elm St',
            area: 'Alexandria',
            governorate: 'Alexandria',
            email: 'jane.smith@example.com',
            number: '+0987654321',
            gender: 'Female',
            status: 'Pending',
        },
        {
            name: 'Organization 8',
            type: 'Hospital',
            description: 'A hospital in Egypt that accepts donations.',
            pdf: '/organizations/organization3.pdf',
            firstName: 'Bob',
            lastName: 'Johnson',
            address: '789 Oak St',
            area: 'Giza',
            governorate: 'Giza',
            email: 'bob.johnson@example.com',
            number: '+1357924680',
            gender: 'Male',
            status: 'Pending',
        },
    {
            name: 'Organization 1',
            type: 'Mosque',
            description: 'A mosque in Egypt that accepts donations.',
            email: 'organization1@example.com',
            number: '+1234567890',
            firstName: 'John',
            lastName: 'Doe',
            address: '123 Main St',
            area: 'Cairo',
            governorate: 'Cairo',
            gender: 'Male',
            status: 'Accepted',
            pdf: '/organizations/organization3.pdf',
        },
        {
            name: 'Organization 2',
            type: 'Charity',
            description: 'A charity organization in Egypt that accepts donations.',
            email: 'organization2@example.com',
            number: '+1234567890',
            firstName: 'Jane',
            lastName: 'Smith',
            address: '456 Elm St',
            area: 'Alexandria',
            governorate: 'Alexandria',
            gender: 'Female',
            status: 'Accepted',
            pdf: '/organizations/organization3.pdf',
        },
        {
            name: 'Organization 3',
            type: 'Hospital',
            description: 'A hospital in Egypt that accepts donations.',
            email: 'organization3@example.com',
            number: '+1234567890',
            firstName: 'Bob',
            lastName: 'Johnson',
            address: '789 Oak St',
            area: 'Giza',
            governorate: 'Giza',
            gender: 'Male',
            status: 'Accepted',
            pdf: '/organizations/organization3.pdf',
        },
        {
            name: 'Organization 4',
            type: 'Orphanage',
            description: 'An orphanage in Egypt that accepts donations.',
            email: 'organization4@example.com',
            number: '+1234567890',
            firstName: 'Alice',
            lastName: 'Williams',
            address: '321 Pine St',
            area: 'Luxor',
            governorate: 'Luxor',
            gender: 'Female',
            status: 'Accepted',
            pdf: '/organizations/organization3.pdf',
        },
        {
            name: 'Organization 5',
            type: 'Public School',
            description: 'A public school in Egypt that accepts donations.',
            email: 'organization5@example.com',
            number: '+1234567890',
            firstName: 'David',
            lastName: 'Brown',
            address: '654 Maple St',
            area: 'Aswan',
            governorate: 'Aswan',
            gender: 'Male',
            status: 'Accepted',
            pdf: '/organizations/organization3.pdf',
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
            number: '+1234567890',
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
            number: '+0987654321',
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
            number: '+1357924680',
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
            number: '+1234567890',
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
            number: '+1234567890',
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
            number: '+1234567890',
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
            number: '+1234567890',
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
            number: '+1234567890',
            gender: 'Female',
            address: '321 Oak St',
            area: 'Giza',
            governorate: 'Giza',
            role: 'regular',
            activated: true,
        },
        {
            firstName: 'Donor 9',
            lastName: 'Lastname 9',
            email: 'donor9@example.com',
            password: 'password9',
            number: '+1234567890',
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
            number: '+1234567890',
            gender: 'Female',
            address: '654 Maple St',
            area: 'Aswan',
            governorate: 'Aswan',
            role: 'regular',
            activated: true,
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
                location: 'Room 101',
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
                location: 'Room 202',
                specialty: 'Dermatology',
                cases: 20,
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