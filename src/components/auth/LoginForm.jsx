import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FaGoogle, FaFacebookF, FaCheck, FaSpinner } from 'react-icons/fa'
import { useAuth } from '../../context/AuthContext'

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock authentication - in a real app, this would be an API call
      if (formData.email === 'demo@example.com' && formData.password === 'password') {
        const userData = {
          id: '1',
          email: formData.email,
          name: 'Demo User',
          avatar: '/images/avatar.png'
        }
        
        login(userData, 'mock-jwt-token')
        navigate('/account')
      } else {
        setError('Invalid email or password')
      }
    } catch (err) {
      setError('Failed to login. Please try again.')
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
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-900">Login to Your Account</h2>
      
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
            className="mt-1 block w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 transition-all"
            variants={inputVariants}
            whileHover="hover"
            whileFocus="focus"
            transition={{ duration: 0.2 }}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <label className="flex items-center group relative">
            <motion.input
              type="checkbox"
              name="remember"
              className="rounded border-gray-300 text-indigo-500 focus:ring-indigo-300 cursor-pointer"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="ml-2 text-sm text-gray-600 group-hover:text-indigo-600 transition-colors"
              whileHover={{ x: 2 }}
              transition={{ duration: 0.2 }}
            >
              Remember me
              <span className="absolute left-full ml-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2">
                Keep me signed in
              </span>
            </motion.span>
          </label>
          
          <motion.div whileHover={{ x: 2 }} transition={{ duration: 0.2 }}>
            <Link to="/forgot-password" className="text-sm text-indigo-600 hover:text-indigo-500">
              Forgot password?
            </Link>
          </motion.div>
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
              Logging in...
            </span>
          ) : (
            'Login'
          )}
        </motion.button>
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Don't have an account?{' '}
          <motion.span whileHover={{ x: 2 }} transition={{ duration: 0.2 }}>
            <Link to="/register" className="text-indigo-600 hover:text-indigo-500">
              Sign up
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
                Sign in with {label}
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default LoginForm