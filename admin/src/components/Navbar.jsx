import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { DoctorContext } from '../context/DoctorContext'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'
// Using an icon for a cleaner, more professional logout button
import { HiOutlineLogout } from 'react-icons/hi'

const Navbar = () => {

    const { dToken, setDToken } = useContext(DoctorContext)
    const { aToken, setAToken } = useContext(AdminContext)

    const navigate = useNavigate()

    // Cleaned up the logout logic slightly
    const logout = () => {
        if (dToken) {
            setDToken('');
            localStorage.removeItem('dToken');
        }
        if (aToken) {
            setAToken('');
            localStorage.removeItem('aToken');
        }
        // Navigate after clearing tokens
        navigate('/');
    }

    return (
        // --- Main Nav Container ---
        // 1. 'sticky top-0 z-50': Makes the navbar stay at the top.
        // 2. 'bg-white/95 backdrop-blur-sm': Gives it a modern, blurred glass effect.
        // 3. 'shadow-md': Adds a subtle shadow for a clean "lift" off the page.
        <nav className='sticky top-0 z-50 flex justify-between items-center 
                       px-6 sm:px-10 py-3.5 border-b border-gray-200 
                       bg-white/95 backdrop-blur-sm'>
            
            {/* --- Left Side (Logo + Role) --- */}
            <div className='flex items-center gap-4'>
                <img 
                    onClick={() => navigate('/')} 
                    className='w-32 sm:w-36 cursor-pointer' 
                    src={assets.admin_logo} 
                    alt="CureQueue Admin" 
                />
                
                {/* --- Restyled "Pill" Badge --- */}
                <span className={`px-3 py-0.5 rounded-full text-xs font-medium
                    ${aToken 
                        ? 'bg-indigo-100 text-indigo-800' // Admin badge style
                        : 'bg-green-100 text-green-800'   // Doctor badge style
                    }`}
                >
                    {aToken ? 'Admin' : 'Doctor'}
                </span>
            </div>

            {/* --- Right Side (Logout) --- */}
            {/* - Replaced the solid button with a subtle, professional icon button.
                - It shows text on larger screens.
            */}
            <button 
                onClick={logout} 
                className='flex items-center gap-2 text-sm font-medium text-gray-600 
                           transition-colors duration-200 hover:text-red-500'
            >
                <HiOutlineLogout className='w-5 h-5' />
                <span className='hidden sm:block'>Logout</span>
            </button>
        </nav>
    )
}

export default Navbar