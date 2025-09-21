import { useCart } from '../../context/CartContext'
import { useAuth } from '../../context/AuthContext'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FaShoppingCart, FaGift, FaCheckCircle } from 'react-icons/fa'
import { FiPackage, FiDollarSign } from 'react-icons/fi'

const CartSummary = () => {
  const { items = [], getCartTotal = () => 0 } = useCart()
  const { isAuthenticated } = useAuth()

  const subtotal = Number(getCartTotal() || 0)
  const shipping = subtotal > 0 ? (subtotal > 50 ? 0 : 5.99) : 0
  const tax = +(subtotal * 0.08)
  const total = +(subtotal + shipping + tax)

  const currency = (v) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(v)

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, staggerChildren: 0.05 } }
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -8 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.25 } }
  }

  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95 }
  }

  if (items.length === 0) {
    return (
      <motion.div
        className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden w-full max-w-md mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-4 text-white">
          <div className="flex items-center gap-3">
            <div className="rounded-md p-2 bg-white/10">
              <FaShoppingCart className="text-2xl" />
            </div>
            <div>
              <h2 className="text-lg font-bold leading-tight">Cart Summary</h2>
              <p className="text-blue-100 text-sm">Your cart is empty</p>
            </div>
          </div>
        </div>
        <div className="p-4 text-center text-gray-500 text-sm">
          Add items to start shopping!
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden w-full max-w-md mx-auto"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-4 text-white">
        <motion.div className="flex items-center justify-between" variants={containerVariants}>
          <div className="flex items-center gap-3">
            <div className="rounded-md p-2 bg-white/10">
              <FaShoppingCart className="text-2xl" />
            </div>
            <div>
              <h2 className="text-lg font-bold leading-tight">Cart Summary</h2>
              <p className="text-blue-100 text-sm">
                {items.length} {items.length === 1 ? 'item' : 'items'}
              </p>
            </div>
          </div>
          {subtotal > 50 && (
            <motion.div
              className="flex items-center gap-2 bg-green-500 px-2.5 py-0.5 rounded-full text-xs font-medium"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.25, type: 'spring', stiffness: 200 }}
            >
              <FaGift className="text-xs" />
              Free Shipping
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Items List */}
        <motion.div className="space-y-3 mb-4" variants={containerVariants}>
          <AnimatePresence>
            <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
              {items.map((item, index) => (
                <motion.div
                  key={item.id || `${item.name}-${index}`}
                  className="flex items-center gap-3 p-2 bg-gray-50 rounded-md border border-gray-100 hover:bg-gray-100 transition-colors duration-200"
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, x: -40, transition: { duration: 0.2 } }}
                  variants={itemVariants}
                >
                  <div className="relative flex-shrink-0">
                    <div className="w-16 h-16 rounded-md overflow-hidden border border-gray-200 bg-white flex items-center justify-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="object-contain w-full h-full p-1"
                        onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = ''; }}
                      />
                    </div>
                    <div className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold shadow">
                      {item.quantity}
                    </div>
                  </div>
                  <div className="flex-grow min-w-0">
                    <h3 className="text-sm font-medium text-gray-900 truncate">{item.name}</h3>
                    <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                      <span>{currency(item.price)}</span>
                      <span className="text-gray-400">×{item.quantity}</span>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0 min-w-[80px]">
                    <div className="text-sm font-bold text-gray-900">{currency(item.price * item.quantity)}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        </motion.div>

        {/* Pricing Breakdown */}
        <motion.div className="bg-gray-50 rounded-md p-3 space-y-2 mb-4" variants={containerVariants}>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600 flex items-center gap-2">
              <FiDollarSign className="text-gray-400" />
              Subtotal
            </span>
            <span className="font-medium text-gray-900">{currency(subtotal)}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600 flex items-center gap-2">
              <FiPackage className="text-gray-400" />
              Shipping
            </span>
            <span className={`font-medium ${shipping === 0 ? 'text-green-600' : 'text-gray-900'}`}>
              {shipping === 0 ? 'Free' : currency(shipping)}
            </span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600 flex items-center gap-2">
              <FaGift className="text-gray-400" />
              Tax
            </span>
            <span className="font-medium text-gray-900">{currency(tax)}</span>
          </div>
          <div className="border-t border-gray-200 pt-2 mt-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-bold text-gray-900">Total</span>
              <motion.span
                className="text-lg font-bold text-blue-600"
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.15 }}
              >
                {currency(total)}
              </motion.span>
            </div>
          </div>
        </motion.div>

        {/* Checkout/Login Buttons */}
        {isAuthenticated ? (
          <motion.div variants={itemVariants} className="mt-4">
            <Link to="/checkout">
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="relative w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-4 rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-colors duration-200 shadow-md group"
              >
                Proceed to Checkout
                <span className="absolute hidden -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded-md group-hover:block">
                  Checkout
                </span>
              </motion.button>
            </Link>
          </motion.div>
        ) : (
          <motion.div variants={itemVariants} className="mt-4 space-y-3">
            <Link to="/login">
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="relative w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-4 rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-colors duration-200 shadow-md group"
              >
                Login to Checkout
                <span className="absolute hidden -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded-md group-hover:block">
                  Login
                </span>
              </motion.button>
            </Link>
            <Link to="/register">
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="relative w-full border border-gray-200 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors duration-200 shadow-sm group"
              >
                Create Account
                <span className="absolute hidden -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded-md group-hover:block">
                  Sign Up
                </span>
              </motion.button>
            </Link>
          </motion.div>
        )}

        {/* Benefits */}
        

        {/* Free Shipping Prompt */}
        {subtotal < 50 && subtotal > 0 && (
          <motion.div
            variants={itemVariants}
            className="mt-4 p-3 bg-amber-50 rounded-lg border border-amber-100"
          >
            <p className="text-sm text-amber-700 flex items-center gap-2">
              <FaShoppingCart size={16} />
              Add {currency(50 - subtotal)} more for free shipping!
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

export default CartSummary