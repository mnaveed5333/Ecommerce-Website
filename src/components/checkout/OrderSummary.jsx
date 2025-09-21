import { useCart } from '../../context/CartContext'
import { motion, AnimatePresence } from 'framer-motion'
import { FaShoppingCart, FaTruck, FaCreditCard, FaTag, FaGift, FaCheckCircle } from 'react-icons/fa'
import { FiPackage, FiDollarSign } from 'react-icons/fi'

const OrderSummary = ({ shippingAddress, paymentMethod }) => {
  const { items = [], getCartTotal = () => 0 } = useCart()

  const subtotal = Number(getCartTotal() || 0)
  const shipping = subtotal > 0 ? (subtotal > 50 ? 0 : 5.99) : 0
  const tax = +(subtotal * 0.08)
  const total = +(subtotal + shipping + tax)

  const currency = (v) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(v)

  // simplified motion variants
  const containerVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, staggerChildren: 0.04 } }
  }
  const itemVariants = {
    hidden: { opacity: 0, x: -6 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.28 } }
  }

  return (
    <motion.div
      className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden w-full max-w-lg"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Header (larger) */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-4 text-white">
        <motion.div className="flex items-center justify-between" variants={containerVariants}>
          <div className="flex items-center gap-3">
            <div className="rounded-md p-2 bg-white/10">
              <FaShoppingCart className="text-2xl" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold leading-tight">Order Summary</h2>
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
              Free
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Items List (scrollable to limit height) */}
        <motion.div className="space-y-3 mb-4" variants={containerVariants}>
          <AnimatePresence>
            <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
              {items.map((item, index) => (
                <motion.div
                  key={item.id || `${item.name}-${index}`}
                  className="flex items-center gap-3 p-2 bg-gray-50 rounded-md border border-gray-100 group"
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, x: -40, transition: { duration: 0.2 } }}
                  variants={itemVariants}
                >
                  {/* larger image */}
                  <div className="relative flex-shrink-0">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-md overflow-hidden border border-gray-200 bg-white flex items-center justify-center">
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
                    <h3 className="text-sm sm:text-base font-medium text-gray-900 truncate">{item.name}</h3>
                    <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                      <span>{currency(item.price)}</span>
                      <span className="text-gray-400">×{item.quantity}</span>
                    </div>
                  </div>

                  <div className="text-right flex-shrink-0 min-w-[88px]">
                    <div className="text-sm sm:text-base font-bold text-gray-900">{currency(item.price * item.quantity)}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        </motion.div>

        {/* Pricing Breakdown (slightly larger text) */}
        <motion.div className="bg-gray-50 rounded-md p-3 space-y-2 mb-3" variants={containerVariants}>
          <div className="flex justify-between items-center text-sm sm:text-base">
            <span className="text-gray-600 flex items-center gap-2">
              <FiDollarSign className="text-gray-400" />
              Subtotal
            </span>
            <span className="font-medium text-gray-900">{currency(subtotal)}</span>
          </div>

          <div className="flex justify-between items-center text-sm sm:text-base">
            <span className="text-gray-600 flex items-center gap-2">
              <FiPackage className="text-gray-400" />
              Shipping
            </span>
            <span className={`font-medium ${shipping === 0 ? 'text-green-600' : 'text-gray-900'}`}>
              {shipping === 0 ? 'Free' : currency(shipping)}
            </span>
          </div>

          <div className="flex justify-between items-center text-sm sm:text-base">
            <span className="text-gray-600 flex items-center gap-2">
              <FaTag className="text-gray-400" />
              Tax
            </span>
            <span className="font-medium text-gray-900">{currency(tax)}</span>
          </div>

          <div className="border-t border-gray-200 pt-2 mt-1">
            <div className="flex justify-between items-center">
              <span className="text-sm sm:text-base font-bold text-gray-900">Total</span>
              <motion.span
                className="text-base sm:text-lg font-bold text-blue-600"
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.12 }}
              >
                {currency(total)}
              </motion.span>
            </div>
          </div>
        </motion.div>

        {/* Shipping & Payment (compact but bigger text) */}
        {shippingAddress && (
          <motion.div className="mb-2 p-2 bg-blue-50 rounded-md border border-blue-100 text-sm sm:text-base" variants={containerVariants}>
            <div className="flex items-start gap-2">
              <FaTruck className="text-blue-500 mt-0.5" />
              <div>
                <div className="font-medium text-gray-900 text-sm sm:text-base">
                  {shippingAddress.firstName} {shippingAddress.lastName}
                </div>
                <div className="text-xs sm:text-sm text-gray-600">
                  {shippingAddress.address}, {shippingAddress.city} {shippingAddress.zipCode}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {paymentMethod && (
          <motion.div className="mb-2 p-2 bg-green-50 rounded-md border border-green-100 text-sm sm:text-base" variants={containerVariants}>
            <div className="flex items-start gap-2">
              <FaCreditCard className="text-green-500 mt-0.5" />
              <div>
                <div className="font-medium text-gray-900 text-sm sm:text-base">•••• •••• •••• {paymentMethod.cardNumber.slice(-4)}</div>
                <div className="text-xs sm:text-sm text-gray-600">{paymentMethod.cardName}</div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Benefits */}
        {subtotal > 0 && (
          <motion.div className="grid grid-cols-1 sm:grid-cols-1 gap-2 mt-1" variants={containerVariants}>
            <div className="flex items-center gap-2 p-2 bg-blue-50 rounded-md border border-blue-100 text-xs sm:text-sm">
              <FiPackage className="text-blue-500" />
              <div>
                <div className="font-medium text-blue-900">Fast Delivery</div>
                <div className="text-xs text-blue-600">2-3 days</div>
              </div>
            </div>
            
            <div className="flex items-center gap-2 p-2 bg-purple-50 rounded-md border border-purple-100 text-xs sm:text-sm">
              <FaGift className="text-purple-500" />
              <div>
                <div className="font-medium text-purple-900">Easy Returns</div>
                <div className="text-xs text-purple-600">30 days</div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

export default OrderSummary
