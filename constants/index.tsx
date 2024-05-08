import { UserCog, ListChecks, Home, Building2, Users, UserCheck } from "lucide-react";

export const adminSideBarMenu = [
    {
        title: "Dashboard",
        icon: <Home width={48} />,
        path: "/",
    },
    {
        title: "My Profile",
        icon: <UserCog width={48} />,
        path: "/profile",
    },
    {
        title: "Submissions/Requests",
        icon: <ListChecks width={48} />,
        path: "/submission-review",
    },
    {
        title: "Donors Requests",
        icon: <UserCheck width={48} />,
        path: "/donors-reviews",
    },
    {
        title: "Organizations List",
        icon: <Building2 width={48} />,
        path: "/organizations",
    },
    {
        title: "Donors List",
        icon: <Users width={48} />,
        path: "/donors",
    },
]

export const governorates = [
    "Alexandria", 
    "Aswan", 
    "Asyut", 
    "Beheira", 
    "Beni Suef", 
    "Cairo", 
    "Dakahlia", 
    "Damietta", 
    "Faiyum", 
    "Gharbia", 
    "Giza", 
    "Ismailia", 
    "Kafr El Sheikh", 
    "Luxor", 
    "Matruh", 
    "Minya", 
    "Monufia", 
    "New Valley", 
    "North Sinai", 
    "Port Said", 
    "Qalyubia", 
    "Qena", 
    "Red Sea", 
    "Sharqia", 
    "Sohag", 
    "South Sinai", 
    "Suez",
]

// export const organinzationRequestList = [
//     {
//         name: 'Organization 6',
//         type: 'Charity',
//         description: 'A charity in Egypt that accepts donations.',
//         pdf: '/organizations/organization1.pdf',
//         firstName: 'John',
//         lastName: 'Doe',
//         address: '123 Main St',
//         area: 'Cairo',
//         governorate: 'Cairo',
//         email: 'john.doe@example.com',
//         number: '+1234567890',
//         gender: 'Male',
//     },
//     {
//         name: 'Organization 7',
//         type: 'Mosque',
//         description: 'A mosque in Egypt that accepts donations.',
//         pdf: '/organizations/organization2.pdf',
//         firstName: 'Jane',
//         lastName: 'Smith',
//         address: '456 Elm St',
//         area: 'Alexandria',
//         governorate: 'Alexandria',
//         email: 'jane.smith@example.com',
//         number: '+0987654321',
//         gender: 'Female',
//     },
//     {
//         name: 'Organization 8',
//         type: 'Hospital',
//         description: 'A hospital in Egypt that accepts donations.',
//         pdf: '/organizations/organization3.pdf',
//         firstName: 'Bob',
//         lastName: 'Johnson',
//         address: '789 Oak St',
//         area: 'Giza',
//         governorate: 'Giza',
//         email: 'bob.johnson@example.com',
//         number: '+1357924680',
//         gender: 'Male',
//     },
// ]

// export const organizationList = [
//     {
//         name: 'Organization 1',
//         type: 'Mosque',
//         description: 'A mosque in Egypt that accepts donations.',
//         email: 'organization1@example.com',
//         number: '+1234567890',
//         firstName: 'John',
//         lastName: 'Doe',
//         address: '123 Main St',
//         area: 'Cairo',
//         governorate: 'Cairo',
//         gender: 'Male',
//     },
//     {
//         name: 'Organization 2',
//         type: 'Charity',
//         description: 'A charity organization in Egypt that accepts donations.',
//         email: 'organization2@example.com',
//         number: '+1234567890',
//         firstName: 'Jane',
//         lastName: 'Smith',
//         address: '456 Elm St',
//         area: 'Alexandria',
//         governorate: 'Alexandria',
//         gender: 'Female',
//     },
//     {
//         name: 'Organization 3',
//         type: 'Hospital',
//         description: 'A hospital in Egypt that accepts donations.',
//         email: 'organization3@example.com',
//         number: '+1234567890',
//         firstName: 'Bob',
//         lastName: 'Johnson',
//         address: '789 Oak St',
//         area: 'Giza',
//         governorate: 'Giza',
//         gender: 'Male',
//     },
//     {
//         name: 'Organization 4',
//         type: 'Orphanage',
//         description: 'An orphanage in Egypt that accepts donations.',
//         email: 'organization4@example.com',
//         number: '+1234567890',
//         firstName: 'Alice',
//         lastName: 'Williams',
//         address: '321 Pine St',
//         area: 'Luxor',
//         governorate: 'Luxor',
//         gender: 'Female',
//     },
//     {
//         name: 'Organization 5',
//         type: 'Public School',
//         description: 'A public school in Egypt that accepts donations.',
//         email: 'organization5@example.com',
//         number: '+1234567890',
//         firstName: 'David',
//         lastName: 'Brown',
//         address: '654 Maple St',
//         area: 'Aswan',
//         governorate: 'Aswan',
//         gender: 'Male',
//     },
// ];