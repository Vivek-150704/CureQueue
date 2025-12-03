import axios from 'axios';
import React, { useContext, useEffect, useCallback } from 'react' // Import useCallback
import { useNavigate, useSearchParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';

const Verify = () => {

    const [searchParams] = useSearchParams()
    const success = searchParams.get("success")
    const appointmentId = searchParams.get("appointmentId")

    const { backendUrl, token } = useContext(AppContext)
    const navigate = useNavigate()

    // --- We wrap this in useCallback to make the effect hook more stable ---
    const verifyStripe = useCallback(async () => {
        try {
            const { data } = await axios.post(backendUrl + "/api/user/verifyStripe", { success, appointmentId }, { headers: { token } })

            if (data.success) {
                toast.success(data.message)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
            console.log(error)
        } finally {
            // Always navigate away, even if the verification fails
            navigate("/my-appointments")
        }
    }, [backendUrl, token, success, appointmentId, navigate])

    useEffect(() => {
        // --- CRITICAL FIX ---
        // The 'if' condition now correctly checks if all three variables exist
        // The dependency array now correctly includes all dependencies
        if (token && appointmentId && success) {
            verifyStripe()
        }
    }, [token, appointmentId, success, verifyStripe]) // Added all dependencies

    return (
        // --- Added a text label to the spinner for better UX ---
        <div className='min-h-[60vh] flex items-center justify-center'>
            <div className='flex flex-col items-center gap-4'>
                <div className="w-20 h-20 border-4 border-gray-300 border-t-4 border-t-primary rounded-full animate-spin"></div>
                <p className='text-lg font-medium text-gray-600'>Verifying Payment...</p>
            </div>
        </div>
    )
}

export default Verify