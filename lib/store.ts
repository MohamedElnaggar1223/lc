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

export const useAdminStore = create<AdminState>((set) => ({
    admin: {
        email: 'admin@test.com',
        password: 'admin123'
    },
    updatePassword: (newPassword) => set((state) => ({ admin: {...state.admin, password: newPassword} }))
}))