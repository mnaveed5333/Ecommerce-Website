import { Link } from 'react-router-dom'
import { FiShoppingBag, FiArrowLeft, FiTrash2 } from 'react-icons/fi'
import { useCart } from '../context/CartContext'
import { motion } from 'framer-motion'
import CartItem from '../components/cart/CartItem'
import CartSummary from '../components/cart/CartSummary'

const Cart = () => {
  const { items, clearCart } = useCart()

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  const buttonVariants = {
    hover: { 
      scale: 1.05,
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.95 }
  }

  if (items.length === 0) {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <motion.div
            variants={itemVariants}
            className="max-w-lg mx-auto text-center"
          >
            <motion.div
              className="w-32 h-32 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <FiShoppingBag className="w-16 h-16 text-blue-600" />
            </motion.div>

            <h1 className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
              Your cart is empty
            </h1>
            <p className="text-gray-600 mb-8 text-base sm:text-lg">
              Looks like you haven't added any items to your cart yet.
            </p>

            <Link to="/shop">
              <motion.div
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="relative inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-500 text-white px-8 py-4 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 group"
                style={{ boxShadow: '0 10px 30px rgba(59, 130, 246, 0.3)' }}
              >
                <FiArrowLeft size={20} />
                <span className="text-lg font-semibold">Continue Shopping</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ filter: 'blur(20px)' }}
                />
                <span className="absolute hidden -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded-md group-hover:block whitespace-nowrap">
                  Shop Now
                </span>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-8"
        >
          Shopping Cart
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Cart Items */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-2"
          >
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20">
              <div className="p-6 sm:p-8 border-b border-gray-100/50 flex justify-between items-center">
                <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  {items.length} {items.length === 1 ? 'Item' : 'Items'}
                </h2>
                <motion.button
                  onClick={clearCart}
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="relative text-red-500 hover:text-red-600 text-sm sm:text-base group px-4 py-2 rounded-lg hover:bg-red-50 transition-all duration-300"
                >
                  <div className="flex items-center space-x-1">
                    <FiTrash2 size={18} />
                    <span>Clear Cart</span>
                  </div>
                  <span className="absolute hidden -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded-md group-hover:block whitespace-nowrap">
                    Remove All Items
                  </span>
                </motion.button>
              </div>

              <div className="divide-y divide-gray-100/50">
                {items.map(item => (
                  <motion.div key={item.id} variants={itemVariants}>
                    <CartItem item={item} />
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              variants={itemVariants}
              className="mt-8"
            >
              <Link to="/shop">
                <motion.div
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="relative inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 group px-6 py-3 rounded-xl hover:bg-blue-50 transition-all duration-300"
                >
                  <FiArrowLeft size={18} />
                  <span className="text-lg font-semibold">Continue Shopping</span>
                  <span className="absolute hidden -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded-md group-hover:block whitespace-nowrap">
                    Shop More
                  </span>
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>

          {/* Cart Summary */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <CartSummary />
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export default Cart
