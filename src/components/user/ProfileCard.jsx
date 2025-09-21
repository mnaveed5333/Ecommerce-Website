import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiEdit, FiSave, FiX } from 'react-icons/fi'
import { useAuth } from '../../context/AuthContext'

const ProfileCard = () => {
  const { user, updateUser } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSave = async () => {
    try {
      const updatedUser = { ...user, ...formData }
      updateUser(updatedUser)
      setIsEditing(false)
    } catch (error) {
      console.error('Failed to update profile:', error)
    }
  }

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: '',
      address: ''
    })
    setIsEditing(false)
  }

  if (!user) return null

  // Framer Motion variants for animations
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } }
  }

  const inputVariants = {
    hover: { scale: 1.02 },
    focus: { scale: 1.02, boxShadow: '0 0 8px rgba(79, 70, 229, 0.3)' }
  }

  const buttonVariants = {
    hover: { scale: 1.1, color: '#4f46e5' },
    tap: { scale: 0.95 }
  }

  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg p-6 sm:p-8"
      initial="hidden"
      animate="visible"
      variants={cardVariants}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Profile Information</h2>
        <AnimatePresence>
          {!isEditing ? (
            <motion.button
              key="edit"
              onClick={() => setIsEditing(true)}
              className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-700 group relative"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              transition={{ duration: 0.2 }}
            >
              <FiEdit size={16} />
              <span>Edit</span>
              <span className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2">
                Edit Profile
              </span>
            </motion.button>
          ) : (
            <motion.div
              key="actions"
              className="flex space-x-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <motion.button
                onClick={handleSave}
                className="flex items-center space-x-2 text-green-600 hover:text-green-700 group relative"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                transition={{ duration: 0.2 }}
              >
                <FiSave size={16} />
                <span>Save</span>
                <span className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2">
                  Save Changes
                </span>
              </motion.button>
              <motion.button
                onClick={handleCancel}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-700 group relative"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                transition={{ duration: 0.2 }}
              >
                <FiX size={16} />
                <span>Cancel</span>
                <span className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2">
                  Cancel Editing
                </span>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="space-y-6">
        <motion.div
          className="flex items-center space-x-4"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <img
            src={user.avatar || '/images/avatar.png'}
            alt={user.name}
            className="w-16 h-16 rounded-full shadow-sm object-cover"
          />
          <div>
            <h3 className="text-lg font-medium text-gray-900">{user.name}</h3>
            <p className="text-gray-600 text-sm">Member since 2023</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            {isEditing ? (
              <motion.input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 transition-all"
                variants={inputVariants}
                whileHover="hover"
                whileFocus="focus"
                transition={{ duration: 0.2 }}
              />
            ) : (
              <p className="text-gray-900 text-sm">{user.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            {isEditing ? (
              <motion.input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 transition-all"
                variants={inputVariants}
                whileHover="hover"
                whileFocus="focus"
                transition={{ duration: 0.2 }}
              />
            ) : (
              <p className="text-gray-900 text-sm">{user.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            {isEditing ? (
              <motion.input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 transition-all"
                variants={inputVariants}
                whileHover="hover"
                whileFocus="focus"
                transition={{ duration: 0.2 }}
              />
            ) : (
              <p className="text-gray-900 text-sm">{user.phone || 'Not provided'}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            {isEditing ? (
              <motion.textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows={2}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 transition-all"
                variants={inputVariants}
                whileHover="hover"
                whileFocus="focus"
                transition={{ duration: 0.2 }}
              />
            ) : (
              <p className="text-gray-900 text-sm">{user.address || 'Not provided'}</p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default ProfileCard