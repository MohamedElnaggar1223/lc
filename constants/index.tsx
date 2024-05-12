import { UserCog, ListChecks, Home, Building2, Users, UserCheck, FileClock, NotepadText, FilePlus2, HeartHandshake } from "lucide-react";

export const adminSideBarMenu = [
    {
        title: "Dashboard",
        icon: <Home stroke='#003B33' width={48} />,
        path: "/",
    },
    {
        title: "My Profile",
        icon: <UserCog stroke='#003B33' width={48} />,
        path: "/profile",
    },
    {
        title: "Submissions/Requests",
        icon: <ListChecks stroke='#003B33' width={48} />,
        path: "/submission-review",
    },
    {
        title: "Donors Requests",
        icon: <UserCheck stroke='#003B33' width={48} />,
        path: "/donors-reviews",
    },
    {
        title: "Organizations List",
        icon: <Building2 stroke='#003B33' width={48} />,
        path: "/organizations",
    },
    {
        title: "Donors List",
        icon: <Users stroke='#003B33' width={48} />,
        path: "/donors",
    },
]

export const donorSideBarMenu = [
    {
        title: "Dashboard",
        icon: <Home stroke='#003B33' width={48} />,
        path: "/",
    },
    {
        title: "My Profile",
        icon: <UserCog stroke='#003B33' width={48} />,
        path: "/profile",
    },
    {
        title: "Donations",
        icon: <HeartHandshake stroke='#003B33' width={48} />,
        path: "/donations",
    },
    {
        title: 'Organizations',
        icon: <Building2 stroke='#003B33' width={48} />,
        path: '/organizations',
    }
]

export const organizationSideBarMenu = [
    {
        title: 'My Details',
        icon: <UserCog stroke='#003B33' width={48} />,
        path: '/',
    },
    {
        title: 'Fullfilled Posts',
        icon: <ListChecks stroke='#003B33' width={48} />,
        path: '/fullfilled-posts',
    },
    {
        title: 'Pending Posts',
        icon: <NotepadText stroke='#003B33' width={48} />,
        path: '/pending-posts',
    },
    {
        title: 'In Progress Posts',
        icon: <FileClock stroke='#003B33' width={48} />,
        path: '/in-progress-posts',
    },
    {
        title: 'Create Post',
        icon: <FilePlus2 stroke='#003B33' width={48} />,
        path: '/create-post',
    }
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

export const subjects = [
    "Arabic",
    "Art",
    "Biology",
    "Chemistry",
    "Computer Science",
    "English",
    "French",
    "Geography",
    "History",
    "Math",
    "Music",
    "Physics",
    "Physical Education",
    "Religion",
    "Social Studies",
    "Spanish",
]

export const types = [
    'Mosque',
    'Charity',
    'Hospital',
    'Orphanage',
    'Public School',
    'Church'
]

export const areas = [
    "Maadi", 
    "Zamalek", 
    "Downtown", 
    "Heliopolis", 
    "Nasr City", 
    "6th of October City", 
    "Sheikh Zayed", 
    "New Cairo", 
    "El Rehab City", 
    "Madinet Nasr", 
    "El Shorouk City", 
    "El Tagamo' El Khames", 
    "El Obour City", 
    "El Mohandessin", 
    "El Agouza", 
    "El Dokki", 
    "El Haram"
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