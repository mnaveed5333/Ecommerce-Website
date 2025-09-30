import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FaGoogle, FaFacebookF, FaCheck, FaSpinner } from 'react-icons/fa'
import { useAuth } from '../../context/AuthContext'

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }
    
    if (!formData.agreeToTerms) {
      setError('You must agree to the terms and conditions')
      return
    }
    
    setLoading(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock registration - in a real app, this would be an API call
      const userData = {
        id: Date.now().toString(),
        email: formData.email,
        name: `${formData.firstName} ${formData.lastName}`,
        avatar: '/images/avatar.png'
      }
      
      login(userData, 'mock-jwt-token')
      navigate('/account')
    } catch (err) {
      setError('Failed to create account. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // Framer Motion variants for animations
  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } }
  }

  const inputVariants = {
    hover: { scale: 1.02 },
    focus: { scale: 1.02, boxShadow: '0 0 8px rgba(79, 70, 229, 0.3)' }
  }

  const buttonVariants = {
    hover: { scale: 1.05, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' },
    tap: { scale: 0.95 },
    disabled: { scale: 1, boxShadow: 'none' }
  }

  const errorVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  }

  return (
    <motion.div
      className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-6 sm:p-8"
      initial="hidden"
      animate="visible"
      variants={formVariants}
    >
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-900">Create Your Account</h2>
      
      <AnimatePresence>
        {error && (
          <motion.div
            className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={errorVariants}
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <motion.input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 transition-all"
              variants={inputVariants}
              whileHover="hover"
              whileFocus="focus"
              transition={{ duration: 0.2 }}
            />
          </div>
          
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <motion.input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 transition-all"
              variants={inputVariants}
              whileHover="hover"
              whileFocus="focus"
              transition={{ duration: 0.2 }}
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <motion.input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 transition-all"
            variants={inputVariants}
            whileHover="hover"
            whileFocus="focus"
            transition={{ duration: 0.2 }}
          />
        </div>
        
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <motion.input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength={6}
            className="mt-1 block w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 transition-all"
            variants={inputVariants}
            whileHover="hover"
            whileFocus="focus"
            transition={{ duration: 0.2 }}
          />
        </div>
        
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <motion.input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            minLength={6}
            className="mt-1 block w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 transition-all"
            variants={inputVariants}
            whileHover="hover"
            whileFocus="focus"
            transition={{ duration: 0.2 }}
          />
        </div>
        
        <div>
          <label className="flex items-center group relative">
            <motion.input
              type="checkbox"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleChange}
              className="rounded border-gray-300 text-indigo-500 focus:ring-indigo-300 cursor-pointer"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="ml-2 text-sm text-gray-600 group-hover:text-indigo-600 transition-colors"
              whileHover={{ x: 2 }}
              transition={{ duration: 0.2 }}
            >
              I agree to the{' '}
              <Link to="/terms" className="text-indigo-600 hover:text-indigo-500">
                Terms and Conditions
              </Link>
              <span className="absolute left-full ml-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2">
                Accept terms to proceed
              </span>
            </motion.span>
          </label>
        </div>
        
        <motion.button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-500 text-white py-2.5 px-4 rounded-lg text-sm font-medium hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-offset-2 disabled:opacity-50 shadow-md transition-colors"
          variants={buttonVariants}
          whileHover={loading ? 'disabled' : 'hover'}
          whileTap={loading ? 'disabled' : 'tap'}
          transition={{ duration: 0.2 }}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <FaSpinner className="animate-spin mr-2 h-4 w-4" />
              Creating Account...
            </span>
          ) : (
            'Create Account'
          )}
        </motion.button>
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{' '}
          <motion.span whileHover={{ x: 2 }} transition={{ duration: 0.2 }}>
            <Link to="/login" className="text-indigo-600 hover:text-indigo-500">
              Sign in
            </Link>
          </motion.span>
        </p>
      </div>
      
      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>
        
        <div className="mt-6 grid grid-cols-2 gap-3">
          {[
            { icon: FaGoogle, label: 'Google' },
            { icon: FaFacebookF, label: 'Facebook' }
          ].map(({ icon: Icon, label }, index) => (
            <motion.button
              key={index}
              type="button"
              className="w-full inline-flex justify-center items-center py-2.5 px-4 border border-gray-200 rounded-lg bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:ring-indigo-300 shadow-sm group relative"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              transition={{ duration: 0.2 }}
            >
              <Icon className="mr-2 h-4 w-4" />
              {label}
              <span className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2">
                Sign up with {label}
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default RegisterForm