import React from 'react'
import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Doctors from './pages/Doctors'
import Login from './pages/Login'
import About from './pages/About'
import Contact from './pages/Contact'
import Appointment from './pages/Appointment'
import MyAppointments from './pages/MyAppointments'
import MyProfile from './pages/MyProfile'
import Footer from './components/Footer'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verify from './pages/Verify'

const App = () => {
    return (
        // --- Main App Container ---
        // 1. 'flex flex-col': Stacks Navbar, content, and Footer vertically.
        // 2. 'min-h-screen': Ensures the app is always at least the full height of the viewport.
        // 3. 'bg-white': Sets a clean, consistent background for the entire app.
        <div className='flex flex-col min-h-screen bg-white'>
            <ToastContainer />
            <Navbar />
            
            {/* --- Main Content Area ---
                - We use a <main> tag for semantic HTML (good for SEO/accessibility).
                - 'flex-grow': This is the key. It tells this element to expand and fill
                  all available space, which pushes the Footer to the bottom.
            */}
            <main className='flex-grow'>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/doctors' element={<Doctors />} />
                    <Route path='/doctors/:speciality' element={<Doctors />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/about' element={<About />} />
                    <Route path='/contact' element={<Contact />} />
                    <Route path='/appointment/:docId' element={<Appointment />} />
                    <Route path='/my-appointments' element={<MyAppointments />} />
                    <Route path='/my-profile' element={<MyProfile />} />
                    <Route path='/verify' element={<Verify />} />
                </Routes>
            </main>
            
            <Footer />
        </div>
    )
}

export default App