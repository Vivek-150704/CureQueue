import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'
import { HiPencil } from 'react-icons/hi'

// ---- Reusable inputs ----
const ProfileInput = ({ label, id, ...props }) => (
  <div className="md:col-span-2">
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <input
      id={id}
      {...props}
      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm
                 focus:outline-none focus:ring-primary focus:border-primary
                 disabled:bg-gray-50 disabled:cursor-not-allowed"
    />
  </div>
)

const ProfileSelect = ({ label, id, children, ...props }) => (
  <div className="md:col-span-2">
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <select
      id={id}
      {...props}
      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm
                 focus:outline-none focus:ring-primary focus:border-primary"
    >
      {children}
    </select>
  </div>
)

const ProfileViewField = ({ label, value }) => (
  <>
    <dt className="text-sm font-medium text-gray-600">{label}</dt>
    <dd className="text-sm text-gray-900 md:col-span-2">{value}</dd>
  </>
)

const MyProfile = () => {
  const { token, backendUrl, userData, loadUserProfileData } =
    useContext(AppContext)

  const [isEdit, setIsEdit] = useState(false)
  const [image, setImage] = useState(false)
  const [formData, setFormData] = useState(userData || {})

  useEffect(() => {
    if (userData) setFormData(userData)
  }, [userData])

  const onChangeHandler = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const onAddressChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      address: { ...prev.address, [name]: value },
    }))
  }

  const updateUserProfileData = async () => {
    try {
      const data = new FormData()
      data.append('name', formData.name)
      data.append('phone', formData.phone)
      data.append('address', JSON.stringify(formData.address))
      data.append('gender', formData.gender)
      data.append('dob', formData.dob)
      if (image) data.append('image', image)

      const { data: res } = await axios.post(
        `${backendUrl}/api/user/update-profile`,
        data,
        { headers: { token } }
      )

      if (res.success) {
        toast.success(res.message)
        await loadUserProfileData()
        setIsEdit(false)
        setImage(false)
      } else {
        toast.error(res.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const cancelEdit = () => {
    setIsEdit(false)
    setFormData(userData)
    setImage(false)
  }

  return userData ? (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl bg-white p-8 sm:p-10 border border-gray-200 rounded-2xl shadow-2xl">
        
        {/* Image */}
        <div className="flex justify-center">
          <label
            htmlFor="image"
            className={`relative w-36 h-36 ${
              isEdit ? 'cursor-pointer' : ''
            }`}
          >
            <img
              className="w-full h-full rounded-full object-cover border-4 border-gray-100 shadow-md"
              src={
                image
                  ? URL.createObjectURL(image)
                  : formData.image || assets.profile_placeholder
              }
              alt="Profile"
            />
            {isEdit && (
              <div className="absolute -bottom-1 -right-1 bg-primary text-white rounded-full p-2.5
                              border-4 border-white hover:scale-110 transition">
                <HiPencil className="w-5 h-5" />
              </div>
            )}
            <input
              type="file"
              id="image"
              hidden
              disabled={!isEdit}
              onChange={(e) => setImage(e.target.files[0])}
            />
          </label>
        </div>

        {/* Name */}
        <div className="text-center mt-6">
          {isEdit ? (
            <input
              className="w-full max-w-sm mx-auto text-3xl font-bold text-center p-2 border rounded-lg"
              name="name"
              value={formData.name}
              onChange={onChangeHandler}
            />
          ) : (
            <p className="text-3xl font-bold">{formData.name}</p>
          )}
        </div>

        {/* Contact */}
        <div className="border-t mt-8 pt-8">
          <h2 className="text-lg font-semibold">Contact Information</h2>
          <dl className="grid md:grid-cols-3 gap-6 mt-6">
            {isEdit ? (
              <>
                <ProfileViewField label="Email:" value={formData.email} />
                <ProfileInput label="Phone" name="phone" value={formData.phone} onChange={onChangeHandler} />
                <ProfileInput label="Address Line 1" name="line1" value={formData.address.line1} onChange={onAddressChange} />
                <ProfileInput label="Address Line 2" name="line2" value={formData.address.line2} onChange={onAddressChange} />
              </>
            ) : (
              <>
                <ProfileViewField label="Email:" value={formData.email} />
                <ProfileViewField label="Phone:" value={formData.phone} />
                <ProfileViewField label="Address:" value={`${formData.address.line1}, ${formData.address.line2}`} />
              </>
            )}
          </dl>
        </div>

        {/* Basic */}
        <div className="border-t mt-8 pt-8">
          <h2 className="text-lg font-semibold">Basic Information</h2>
          <dl className="grid md:grid-cols-3 gap-6 mt-6">
            {isEdit ? (
              <>
                <ProfileSelect name="gender" label="Gender" value={formData.gender} onChange={onChangeHandler}>
                  <option>Not Selected</option>
                  <option>Male</option>
                  <option>Female</option>
                </ProfileSelect>
                <ProfileInput type="date" label="Birthday" name="dob" value={formData.dob} onChange={onChangeHandler} />
              </>
            ) : (
              <>
                <ProfileViewField label="Gender:" value={formData.gender} />
                <ProfileViewField label="Birthday:" value={formData.dob} />
              </>
            )}
          </dl>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 mt-8 pt-8 border-t">
          {isEdit ? (
            <>
              <button onClick={cancelEdit} className="px-6 py-2.5 border rounded-full">
                Cancel
              </button>
              <button onClick={updateUserProfileData} className="px-6 py-2.5 bg-primary text-white rounded-full">
                Save
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEdit(true)}
              className="px-6 py-2.5 border border-primary text-primary rounded-full hover:bg-primary hover:text-white"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  ) : null
}

export default MyProfile
