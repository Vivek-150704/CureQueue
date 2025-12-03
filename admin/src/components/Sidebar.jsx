import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { DoctorContext } from '../context/DoctorContext'
import { AdminContext } from '../context/AdminContext'
// Using react-icons for a cleaner, more professional dashboard look
import { 
    HiOutlineHome, 
    HiOutlineCalendar, 
    HiOutlinePlusCircle, 
    HiOutlineUsers, 
    HiOutlineUser 
} from "react-icons/hi";

// --- Helper component to keep our code DRY (Don't Repeat Yourself) ---
const SidebarLink = ({ to, icon: Icon, label }) => {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                `flex items-center gap-4 py-4 px-6 md:px-8
                 justify-center md:justify-start // Centers icon on mobile, left-aligns on desktop
                 transition-all duration-200
                 ${isActive
                    ? 'bg-indigo-50 text-primary font-semibold border-r-4 border-primary' // Active style
                    : 'text-gray-600 hover:bg-gray-100 hover:text-primary' // Inactive style
                 }`
            }
        >
            {/* Icon */}
            <Icon className='w-6 h-6 flex-shrink-0' />
            {/* Label (hidden on mobile) */}
            <span className='hidden md:block font-medium'>{label}</span>
        </NavLink>
    );
}

// --- Link definitions for Admin and Doctor ---
const adminLinks = [
    { to: '/admin-dashboard', icon: HiOutlineHome, label: 'Dashboard' },
    { to: '/all-appointments', icon: HiOutlineCalendar, label: 'Appointments' },
    { to: '/add-doctor', icon: HiOutlinePlusCircle, label: 'Add Doctor' },
    { to: '/doctor-list', icon: HiOutlineUsers, label: 'Doctors List' }
];

const doctorLinks = [
    { to: '/doctor-dashboard', icon: HiOutlineHome, label: 'Dashboard' },
    { to: '/doctor-appointments', icon: HiOutlineCalendar, label: 'Appointments' },
    { to: '/doctor-profile', icon: HiOutlineUser, label: 'Profile' }
];


const Sidebar = () => {
    const { dToken } = useContext(DoctorContext)
    const { aToken } = useContext(AdminContext)

    // Determine which set of links to display (Admin takes precedence)
    const links = aToken ? adminLinks : (dToken ? doctorLinks : []);

    return (
        // --- Main Sidebar Container ---
        // 1. 'h-screen sticky top-0': Makes it a full-height sidebar that stays in place.
        // 2. 'w-20 md:w-72': Creates the responsive icon-only (mobile) and expanded (desktop) widths.
        // 3. 'transition-all': Smooths the width change if you were to toggle it with JS.
        <aside className='h-screen sticky top-0 border-r border-gray-200 bg-white w-20 md:w-72 transition-all duration-300'>
            
            {/* --- Link List ---
                - 'pt-[76px]': IMPORTANT! This adds padding to the top, equal to the 
                  height of your sticky navbar, so the links start *below* it.
            */}
            <ul className='pt-[76px]'>
                {links.map((link) => (
                    <SidebarLink
                        key={link.to}
                        to={link.to}
                        icon={link.icon}
                        label={link.label}
                    />
                ))}
            </ul>
        </aside>
    )
}

export default Sidebar