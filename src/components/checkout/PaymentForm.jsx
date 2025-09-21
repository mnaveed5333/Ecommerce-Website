import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiCreditCard, FiUser, FiCalendar, FiLock, FiShield, FiCheck } from 'react-icons/fi'

const PaymentForm = ({ onSubmit, initialData = {} }) => {
  const [formData, setFormData] = useState({
    cardNumber: initialData.cardNumber || '',
    cardName: initialData.cardName || '',
    expiryDate: initialData.expiryDate || '',
    cvv: initialData.cvv || '',
    saveCard: false
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

  const formatCardNumber = (e) => {
    const value = e.target.value
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    const matches = v.match(/\d{4,16}/g)
    const match = matches && matches[0] || ''
    const parts = []
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    
    return parts.length ? parts.join(' ') : value
  }

  const handleCardNumberChange = (e) => {
    const formattedValue = formatCardNumber(e)
    setFormData(prev => ({
      ...prev,
      cardNumber: formattedValue
    }))
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
      className="space-y-6 max-w-md mx-auto"
      initial="hidden"
      animate="visible"
      variants={formVariants}
    >
      {/* Card Number Field */}
      <div className="space-y-2">
        <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
          Card Number *
        </label>
        <div className="relative">
          <motion.input
            type="text"
            id="cardNumber"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleCardNumberChange}
            placeholder="1234 5678 9012 3456"
            maxLength={19}
            required
            className="block w-full px-4 py-2.5 pl-10 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all"
            variants={inputVariants}
            whileHover="hover"
            whileFocus="focus"
            transition={{ duration: 0.2 }}
          />
          <FiCreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500" size={18} />
        </div>
      </div>

      {/* Name on Card Field */}
      <div className="space-y-2">
        <label htmlFor="cardName" className="block text-sm font-medium text-gray-700">
          Name on Card *
        </label>
        <div className="relative">
          <motion.input
            type="text"
            id="cardName"
            name="cardName"
            value={formData.cardName}
            onChange={handleChange}
            required
            className="block w-full px-4 py-2.5 pl-10 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all"
            variants={inputVariants}
            whileHover="hover"
            whileFocus="focus"
            transition={{ duration: 0.2 }}
          />
          <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-500" size={18} />
        </div>
      </div>

      {/* Expiry Date & CVV Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">
            Expiry Date *
          </label>
          <div className="relative">
            <motion.input
              type="text"
              id="expiryDate"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleChange}
              placeholder="MM/YY"
              maxLength={5}
              required
              className="block w-full px-4 py-2.5 pl-10 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all"
              variants={inputVariants}
              whileHover="hover"
              whileFocus="focus"
              transition={{ duration: 0.2 }}
            />
            <FiCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-500" size={18} />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">
            CVV *
          </label>
          <div className="relative">
            <motion.input
              type="text"
              id="cvv"
              name="cvv"
              value={formData.cvv}
              onChange={handleChange}
              placeholder="123"
              maxLength={3}
              required
              className="block w-full px-4 py-2.5 pl-10 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all"
              variants={inputVariants}
              whileHover="hover"
              whileFocus="focus"
              transition={{ duration: 0.2 }}
            />
            <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500" size={18} />
          </div>
        </div>
      </div>

      {/* Save Card Checkbox */}
      <div>
        <label className="flex items-center group relative">
          <motion.input
            type="checkbox"
            name="saveCard"
            id="saveCard"
            checked={formData.saveCard}
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
            Save card for future purchases
            <span className="absolute left-full ml-2 hidden group-hover:block bg-gray-900 text-white text-xs rounded py-1 px-2">
              Save payment details
            </span>
          </motion.span>
        </label>
      </div>

      {/* Security Notice */}
      <motion.div
        className="p-4 bg-teal-50 rounded-lg border border-teal-100 flex items-start space-x-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <FiShield size={18} className="text-blue-500 mt-0.5 flex-shrink-0" />
        <p className="text-sm text-gray-700">
          Your payment details are encrypted and processed securely. We do not store your card details on our servers.
        </p>
      </motion.div>

      {/* Submit Button */}
      <motion.button
        type="submit"
        className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg text-sm font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 shadow-md transition-colors group relative"
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        transition={{ duration: 0.2 }}
      >
        <FiCheck className="inline-block mr-2" size={18} />
        Complete Order
        <span className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-900 text-white text-xs rounded py-1 px-2">
          Finalize payment
        </span>
      </motion.button>
    </motion.form>
  )
}

export default PaymentForm