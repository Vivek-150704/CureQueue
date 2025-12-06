import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'
import { HiOutlineCalendar, HiOutlineLocationMarker } from 'react-icons/hi'

// Helper component for status badges
const StatusBadge = ({ status }) => {
  let colors = ''
  switch (status) {
    case 'Completed':
      colors = 'bg-green-100 text-green-800 border-green-200'
      break
    case 'Cancelled':
      colors = 'bg-red-100 text-red-800 border-red-200'
      break
    case 'Paid & Confirmed':
      colors = 'bg-blue-100 text-blue-800 border-blue-200'
      break
    default:
      colors = 'bg-yellow-100 text-yellow-800 border-yellow-200'
  }
  return (
    <span className={`px-3 py-1 text-xs font-medium rounded-full border ${colors}`}>
      {status}
    </span>
  )
}

const MyAppointments = () => {
  const { backendUrl, token } = useContext(AppContext)
  const navigate = useNavigate()

  const [appointments, setAppointments] = useState([])
  const [payment, setPayment] = useState('')

  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split('_')
    return `${dateArray[0]} ${months[Number(dateArray[1]) - 1]} ${dateArray[2]}`
  }

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/user/appointments`,
        { headers: { token } }
      )
      if (data.success) {
        setAppointments(data.appointments.reverse())
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/cancel-appointment`,
        { appointmentId },
        { headers: { token } }
      )
      if (data.success) {
        toast.success(data.message)
        getUserAppointments()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Appointment Payment',
      description: 'Appointment Payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        try {
          const { data } = await axios.post(
            `${backendUrl}/api/user/verifyRazorpay`,
            response,
            { headers: { token } }
          )
          if (data.success) {
            toast.success('Payment Successful!')
            getUserAppointments()
            navigate('/my-appointments')
          }
        } catch (error) {
          toast.error(error.message)
        }
      }
    }
    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  const appointmentRazorpay = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/payment-razorpay`,
        { appointmentId },
        { headers: { token } }
      )
      if (data.success) initPay(data.order)
      else toast.error(data.message)
    } catch (error) {
      toast.error(error.message)
    }
  }

  const appointmentStripe = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/payment-stripe`,
        { appointmentId },
        { headers: { token } }
      )
      if (data.success) {
        window.location.replace(data.session_url)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (token) getUserAppointments()
  }, [token])

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          My <span className="text-primary">Appointments</span>
        </h1>
      </div>

      <div className="flex flex-col gap-6">
        {appointments.length > 0 ? (
          appointments.map((item) => (
            <div
              key={item._id}
              className="bg-white border border-gray-200 rounded-xl shadow-lg p-6
                         flex flex-col sm:flex-row gap-6"
            >
              <img
                className="w-full h-48 sm:w-32 sm:h-32 rounded-lg object-cover"
                src={item.docData.image}
                alt=""
              />

              <div className="flex-1 flex flex-col gap-2">
                <p className="text-xl font-bold">{item.docData.name}</p>
                <p className="text-primary font-medium">{item.docData.speciality}</p>
                <p className="flex items-center gap-2 text-sm text-gray-600">
                  <HiOutlineCalendar />
                  {slotDateFormat(item.slotDate)} | {item.slotTime}
                </p>
                <p className="flex items-start gap-2 text-sm text-gray-600">
                  <HiOutlineLocationMarker />
                  {item.docData.address.line1}, {item.docData.address.line2}
                </p>
              </div>

              <div className="sm:w-56 flex flex-col gap-3 items-start sm:items-end">
                <div>
                  {item.isCompleted ? <StatusBadge status="Completed" />
                  : item.cancelled ? <StatusBadge status="Cancelled" />
                  : item.payment ? <StatusBadge status="Paid & Confirmed" />
                  : <StatusBadge status="Payment Pending" />}
                </div>

                {payment === item._id && !item.isCompleted && !item.cancelled && (
                  <>
                    <button
                      onClick={() => appointmentStripe(item._id)}
                      className="w-full border rounded-lg py-2.5 hover:bg-gray-50"
                    >
                      <img src={assets.stripe_logo} className="max-h-5 mx-auto" />
                    </button>
                    <button
                      onClick={() => appointmentRazorpay(item._id)}
                      className="w-full border rounded-lg py-2.5 hover:bg-gray-50"
                    >
                      <img src={assets.razorpay_logo} className="max-h-5 mx-auto" />
                    </button>
                  </>
                )}

                {payment !== item._id && !item.isCompleted && !item.cancelled && !item.payment && (
                  <button
                    onClick={() => setPayment(item._id)}
                    className="w-full bg-primary text-white py-2.5 rounded-lg"
                  >
                    Pay Now
                  </button>
                )}

                {!item.isCompleted && !item.cancelled && (
                  <button
                    onClick={() => cancelAppointment(item._id)}
                    className="w-full border border-red-500 text-red-600 py-2.5 rounded-lg hover:bg-red-50"
                  >
                    Cancel Appointment
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 py-20">
            <img src={assets.logo} className="w-40 mx-auto opacity-50" />
            <h2 className="text-xl font-semibold mt-6">No Appointments Found</h2>
            <button
              onClick={() => navigate('/doctors')}
              className="bg-primary text-white px-8 py-3 rounded-full mt-8"
            >
              Find a Doctor
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default MyAppointments
