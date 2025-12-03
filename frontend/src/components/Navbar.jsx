import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { HiOutlineMenuAlt3, HiX } from "react-icons/hi";

// Helper component for clean active/inactive NavLink styling
const NavLinkItem = ({ to, children }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `text-sm font-medium transition-colors duration-200 border-b-2
         ${isActive
          ? 'text-primary border-primary'
          : 'text-gray-600 border-transparent hover:text-primary'
        }`
      }
    >
      {children}
    </NavLink>
  );
};

// --- Helper for Mobile NavLinks ---
const MobileNavLink = ({ to, children, onClick }) => {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `block text-xl font-semibold py-3 px-4 rounded-lg
         ${isActive
          ? 'bg-indigo-50 text-primary' // Active style
          : 'text-gray-700 hover:bg-gray-100' // Inactive style
         }`
      }
    >
      {children}
    </NavLink>
  );
};

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const { token, setToken, userData } = useContext(AppContext);

  const logout = () => {
    localStorage.removeItem('token');
    setToken(false);
    setShowMenu(false);
    navigate('/login');
  };

  return (
    // --- Main Nav Container ---
    // --- THIS IS THE FIX: ---
    // Removed 'bg-white/95' and 'backdrop-blur-sm'
    // Added 'bg-white' (solid) and a 'shadow-sm' for separation.
    <nav className='sticky top-0 z-40 w-full bg-white shadow-sm'>
      <div className='flex items-center justify-between max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4'>
        
        {/* Logo */}
        <img
          onClick={() => navigate('/')}
          className='w-36 cursor-pointer flex-shrink-0'
          src={assets.logo}
          alt="CureQueue Logo"
        />

        {/* Desktop Navigation */}
        <ul className='hidden md:flex items-center gap-8'>
          <NavLinkItem to='/'>HOME</NavLinkItem>
          <NavLinkItem to='/doctors'>ALL DOCTORS</NavLinkItem>
          <NavLinkItem to='/about'>ABOUT</NavLinkItem>
          <NavLinkItem to='/contact'>CONTACT</NavLinkItem>
        </ul>

        {/* Right-side Controls (Desktop) */}
        <div className='hidden md:flex items-center gap-4'>
          {token && userData ? (
            // Logged-in User Dropdown
            <div className='relative group'>
              <div className='flex items-center gap-2 cursor-pointer'>
                <img
                  className='w-9 h-9 rounded-full object-cover border border-gray-200'
                  src={userData.image || assets.profile_placeholder}
                  alt="Profile"
                />
                <img className='w-4 h-4 text-gray-500' src={assets.dropdown_icon} alt="dropdown" />
              </div>
              {/* Dropdown Menu (Fixed gap issue) */}
              <div className='absolute top-full right-0 pt-3 w-56 bg-white rounded-lg shadow-lg border border-gray-100
                              overflow-hidden z-20 hidden group-hover:block transition-all duration-300
                              opacity-0 group-hover:opacity-100'>
                <NavLink to='/my-profile' className='block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary'>
                  My Profile
                </NavLink>
                <NavLink to='/my-appointments' className='block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary'>
                  My Appointments
                </NavLink>
                <div className="border-t border-gray-100"></div>
                <button onClick={logout} className='block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 hover:text-red-500 cursor-pointer'>
                  Logout
                </button>
              </div>
            </div>
          ) : (
            // Logged-out Button
            <button
              onClick={() => navigate('/login')}
              className='bg-primary text-white px-6 py-2 rounded-full text-sm font-medium
                         transition-all duration-300 hover:shadow-lg hover:bg-opacity-90'
            >
              Create account
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className='md:hidden'>
          <button onClick={() => setShowMenu(true)} className='text-3xl text-gray-700'>
            <HiOutlineMenuAlt3 />
          </button>
        </div>
      </div>

      {/* --- 
        --- 
        --- "SOLID COLOUR" FULL-SCREEN MOBILE MENU --- 
        --- 
        --- */}
      
      {/* This is the full-screen div with a solid 'bg-white' */}
      <div
        className={`md:hidden fixed inset-0 z-50 bg-white
                    transition-opacity duration-200 ease-in-out
                    ${showMenu ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        {/* Mobile Menu Header */}
        <div className='flex items-center justify-between px-5 py-5 border-b border-gray-200'>
          <img src={assets.logo} className='w-36' alt="CureQueue Logo" />
          <button onClick={() => setShowMenu(false)} className='text-3xl text-gray-700'>
            <HiX />
          </button>
        </div>

        {/* Mobile Menu Links */}
        <ul className='flex flex-col gap-2 mt-6 px-6'>
          <MobileNavLink to='/' onClick={() => setShowMenu(false)}>HOME</MobileNavLink>
          <MobileNavLink to='/doctors' onClick={() => setShowMenu(false)}>ALL DOCTORS</MobileNavLink>
          <MobileNavLink to='/about' onClick={() => setShowMenu(false)}>ABOUT</MobileNavLink>
          <MobileNavLink to='/contact' onClick={() => setShowMenu(false)}>CONTACT</MobileNavLink>
        </ul>

        {/* Mobile "Create Account" / Profile Links */}
        <div className='absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200 bg-white'>
          {!token ? (
            <button
              onClick={() => { navigate('/login'); setShowMenu(false); }}
              className='w-full bg-primary text-white px-6 py-3 rounded-full font-semibold'
            >
              Create account
            </button>
          ) : (
            <div className='flex flex-col gap-4'>
              <button onClick={() => { navigate('/my-profile'); setShowMenu(false); }} className='w-full bg-gray-100 text-gray-800 px-6 py-3 rounded-full font-semibold'>My Profile</button>
              <button onClick={logout} className='w-full bg-red-50 text-red-600 px-6 py-3 rounded-full font-semibold'>Logout</button>
            </div>
          )}
        </div>
      </div>
      {/* --- END OF "SOLID COLOUR" MOBILE MENU --- */}
      
    </nav>
  );
}

export default Navbar;