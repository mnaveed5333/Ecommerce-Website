import { useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { FiCheckCircle, FiShoppingBag, FiMail, FiBox, FiStar, FiClock } from 'react-icons/fi'
import { motion } from 'framer-motion'

const OrderConfirmation = () => {
  const location = useLocation()
  const order = location.state?.order

  useEffect(() => {
    if (!order) {
      // Redirect if no order data
      window.location.href = '/'
    }
  }, [order])

  if (!order) {
    return null
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 120
      }
    }
  }

  const buttonVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.98 }
  }

  const iconVariants = {
    rest: { rotate: 0 },
    hover: { rotate: 15, transition: { type: "spring", stiffness: 300 } }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        <motion.div 
          className="max-w-2xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Success Icon */}
          <motion.div 
            className="w-24 h-24 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
            variants={itemVariants}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            >
              <FiCheckCircle className="w-12 h-12 text-emerald-600" />
            </motion.div>
          </motion.div>
          
          <motion.h1 variants={itemVariants} className="text-3xl font-bold text-gray-800 mb-4 text-center">
            Order Confirmed!
          </motion.h1>
          
          <motion.p variants={itemVariants} className="text-lg text-gray-600 mb-8 text-center">
            Thank you for your order. We've sent a confirmation email with your order details.
          </motion.p>
          
          {/* Order Details */}
          <motion.div 
            variants={itemVariants}
            className="bg-white rounded-xl shadow-md p-6 mb-8 text-left border border-gray-100"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-6 pb-3 border-b border-gray-100">Order Summary</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-1">
                <h3 className="font-medium text-gray-500 text-sm">Order Number</h3>
                <p className="text-lg font-semibold text-gray-800">#{order.id}</p>
              </div>
              
              <div className="space-y-1">
                <h3 className="font-medium text-gray-500 text-sm">Order Date</h3>
                <p className="text-lg text-gray-800">{new Date().toLocaleDateString()}</p>
              </div>
              
              <div className="space-y-1">
                <h3 className="font-medium text-gray-500 text-sm">Total Amount</h3>
                <p className="text-lg font-semibold text-emerald-600">${order.total?.toFixed(2)}</p>
              </div>
              
              <div className="space-y-1">
                <h3 className="font-medium text-gray-500 text-sm">Payment Method</h3>
                <p className="text-lg text-gray-800">Credit Card</p>
              </div>
            </div>
            
            <div className="pt-4 border-t border-gray-100">
              <h3 className="font-medium text-gray-500 text-sm mb-2">Shipping Address</h3>
              <p className="text-gray-800">
                {order.shippingAddress?.firstName} {order.shippingAddress?.lastName}<br />
                {order.shippingAddress?.address}<br />
                {order.shippingAddress?.city}, {order.shippingAddress?.state} {order.shippingAddress?.zipCode}
              </p>
            </div>
          </motion.div>
          
          {/* Action Buttons */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <motion.div
              variants={buttonVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
            >
              <Link
                to="/orders"
                className="flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <motion.span variants={iconVariants}>
                  <FiShoppingBag />
                </motion.span>
                <span>View Orders</span>
              </Link>
            </motion.div>
            
            <motion.div
              variants={buttonVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
            >
              <Link
                to="/shop"
                className="flex items-center justify-center space-x-2 bg-white text-gray-700 px-6 py-3 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
              >
                <motion.span variants={iconVariants}>
                  <FiMail />
                </motion.span>
                <span>Continue Shopping</span>
              </Link>
            </motion.div>
          </motion.div>
          
          {/* Next Steps */}
          <motion.div variants={itemVariants} className="p-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-100">
            <h3 className="font-semibold text-gray-800 mb-4 text-lg">What's Next?</h3>
            <div className="space-y-4 text-gray-700">
              <div className="flex items-start">
                <div className="bg-blue-100 p-2 rounded-full mr-3">
                  <FiMail className="text-blue-600" />
                </div>
                <p>You'll receive an order confirmation email shortly</p>
              </div>
              
              <div className="flex items-start">
                <div className="bg-blue-100 p-2 rounded-full mr-3">
                  <FiBox className="text-blue-600" />
                </div>
                <p>We'll notify you when your order ships</p>
              </div>
              
              <div className="flex items-start">
                <div className="bg-blue-100 p-2 rounded-full mr-3">
                  <FiStar className="text-blue-600" />
                </div>
                <p>Don't forget to review your products after receiving them</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default OrderConfirmation