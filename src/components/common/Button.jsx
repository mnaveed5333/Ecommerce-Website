import { motion } from 'framer-motion'
import { FaSpinner } from 'react-icons/fa'

const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  className = '',
  ...props
}) => {
  // Base classes for consistent styling
  const baseClasses = 'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-opacity-50 shadow-sm'

  // Variant styles for different button types
  const variants = {
    primary: 'bg-indigo-500 text-white hover:bg-indigo-600 focus:ring-indigo-400',
    secondary: 'bg-gray-100 text-gray-800 hover:bg-gray-200 focus:ring-gray-300',
    danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-400',
    outline: 'border border-gray-300 bg-transparent text-gray-800 hover:bg-gray-50 focus:ring-indigo-300',
    ghost: 'bg-transparent text-gray-800 hover:bg-gray-50 focus:ring-indigo-300'
  }

  // Size classes for different button sizes
  const sizes = {
    small: 'px-3 py-1.5 text-sm',
    medium: 'px-4 py-2 text-sm',
    large: 'px-6 py-3 text-base'
  }

  // Disabled state styling
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : ''

  // Combine all classes
  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${disabledClasses} ${className}`

  // Framer Motion variants for animations
  const buttonVariants = {
    hover: { scale: 1.05, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' },
    tap: { scale: 0.95 },
    disabled: { scale: 1, boxShadow: 'none' }
  }

  return (
    <motion.button
      className={classes}
      disabled={disabled || loading}
      variants={buttonVariants}
      whileHover={disabled || loading ? 'disabled' : 'hover'}
      whileTap={disabled || loading ? 'disabled' : 'tap'}
      transition={{ duration: 0.2 }}
      {...props}
    >
      {loading && (
        <FaSpinner className="animate-spin -ml-1 mr-2 h-4 w-4" />
      )}
      {children}
    </motion.button>
  )
}

export default Button