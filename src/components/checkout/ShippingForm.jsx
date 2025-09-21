import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaCheck } from 'react-icons/fa'

const ShippingForm = ({ onSubmit, initialData = {} }) => {
  const [formData, setFormData] = useState({
    firstName: initialData.firstName || '',
    lastName: initialData.lastName || '',
    email: initialData.email || '',
    phone: initialData.phone || '',
    address: initialData.address || '',
    city: initialData.city || '',
    state: initialData.state || '',
    zipCode: initialData.zipCode || '',
    country: initialData.country || 'United States',
    saveInfo: false
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  // Framer Motion variants for animations
  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } }
  }

  const inputVariants = {
    hover: { scale: 1.02 },
    focus: { scale: 1.02, boxShadow: '0 0 8px rgba(13, 148, 136, 0.3)' }
  }

  const buttonVariants = {
    hover: { scale: 1.05, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' },
    tap: { scale: 0.95 }
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-6"
      initial="hidden"
      animate="visible"
      variants={formVariants}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
            First Name *
          </label>
          <motion.input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all"
            variants={inputVariants}
            whileHover="hover"
            whileFocus="focus"
            transition={{ duration: 0.2 }}
          />
        </div>

        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
            Last Name *
          </label>
          <motion.input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all"
            variants={inputVariants}
            whileHover="hover"
            whileFocus="focus"
            transition={{ duration: 0.2 }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email Address *
          </label>
          <motion.input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all"
            variants={inputVariants}
            whileHover="hover"
            whileFocus="focus"
            transition={{ duration: 0.2 }}
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Phone Number *
          </label>
          <motion.input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all"
            variants={inputVariants}
            whileHover="hover"
            whileFocus="focus"
            transition={{ duration: 0.2 }}
          />
        </div>
      </div>

      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
          Street Address *
        </label>
        <motion.input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all"
          variants={inputVariants}
          whileHover="hover"
          whileFocus="focus"
          transition={{ duration: 0.2 }}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700">
            City *
          </label>
          <motion.input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all"
            variants={inputVariants}
            whileHover="hover"
            whileFocus="focus"
            transition={{ duration: 0.2 }}
          />
        </div>

        <div>
          <label htmlFor="state" className="block text-sm font-medium text-gray-700">
            State *
          </label>
          <motion.input
            type="text"
            id="state"
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all"
            variants={inputVariants}
            whileHover="hover"
            whileFocus="focus"
            transition={{ duration: 0.2 }}
          />
        </div>

        <div>
          <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
            ZIP Code *
          </label>
          <motion.input
            type="text"
            id="zipCode"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all"
            variants={inputVariants}
            whileHover="hover"
            whileFocus="focus"
            transition={{ duration: 0.2 }}
          />
        </div>
      </div>

      <div>
        <label htmlFor="country" className="block text-sm font-medium text-gray-700">
          Country *
        </label>
        <motion.select
          id="country"
          name="country"
          value={formData.country}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-teal-300 transition-all"
          variants={inputVariants}
          whileHover="hover"
          whileFocus="focus"
          transition={{ duration: 0.2 }}
        >
          <option value="United States">United States</option>
          <option value="Canada">Canada</option>
          <option value="United Kingdom">United Kingdom</option>
          <option value="Australia">Australia</option>
          <option value="Germany">Germany</option>
        </motion.select>
      </div>

      <div>
        <label className="flex items-center group relative">
          <motion.input
            type="checkbox"
            name="saveInfo"
            checked={formData.saveInfo}
            onChange={handleChange}
            className="rounded border-gray-300 text-blue-500 focus:ring-blue-300 cursor-pointer"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
          />
          <motion.span
            className="ml-2 text-sm text-gray-600 group-hover:text-blue-600 transition-colors"
            whileHover={{ x: 2 }}
            transition={{ duration: 0.2 }}
          >
            Save this information for next time
            <span className="absolute left-full ml-2 hidden group-hover:block bg-gray-900 text-white text-xs rounded py-1 px-2">
              Save shipping details
            </span>
          </motion.span>
        </label>
      </div>

      <motion.button
        type="submit"
        className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg text-sm font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-teal-300 focus:ring-offset-2 shadow-md transition-colors group relative"
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        transition={{ duration: 0.2 }}
      >
        Continue to Payment
        <span className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-900 text-white text-xs rounded py-1 px-2">
          Proceed to payment
        </span>
      </motion.button>
    </motion.form>
  );
}
export default ShippingForm