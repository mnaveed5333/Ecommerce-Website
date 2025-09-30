import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiArrowLeft, FiArrowRight, FiCheckCircle } from 'react-icons/fi'
import { useCart } from '../context/CartContext'
import { useOrder } from '../context/OrderContext'
import { useAuth } from '../context/AuthContext'
import ShippingForm from '../components/checkout/ShippingForm'
import PaymentForm from '../components/checkout/PaymentForm'
import OrderSummary from '../components/checkout/OrderSummary'

const Checkout = () => {
  const { items, clearCart, getCartTotal } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()

  // Check for empty cart
  useEffect(() => {
    if (items.length === 0) {
      navigate('/cart')
    }
  }, [items.length, navigate])

  const handleWhatsAppOrder = () => {
    const orderDetails = items.map(item => `${item.title} (x${item.quantity}) - $${item.price * item.quantity}`).join('\n')
    const total = getCartTotal()
    const message = `Hi, I want to place an order:\n\n${orderDetails}\n\nTotal: $${total}\n\nPlease confirm my order.`
    const whatsappUrl = `https://wa.me/923405542097?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
    // Optionally clear cart after ordering
    // clearCart()
  }

  // Framer Motion variants for animations
  const stepVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeOut' } },
    exit: { opacity: 0, x: -50, transition: { duration: 0.4, ease: 'easeOut' } }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50">
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <motion.h1
          className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          Complete Your Order
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <motion.div
            className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-6 sm:p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6">Order Summary</h2>
            <div className="space-y-4">
              {items.map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-center space-x-4 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded-lg shadow-md"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{item.title}</h3>
                    <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                    <p className="text-sm font-bold text-blue-600">${item.price * item.quantity}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <motion.div
              className="border-t border-gray-200/50 pt-6 mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.5 }}
            >
              <div className="flex justify-between text-xl font-black">
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Total:</span>
                <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">${getCartTotal()}</span>
              </div>
            </motion.div>
          </motion.div>

          {/* WhatsApp Order */}
          <motion.div
            className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-6 sm:p-8 flex flex-col justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <motion.div
              className="w-20 h-20 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mb-6 shadow-xl"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <FiCheckCircle className="w-10 h-10 text-green-600" />
            </motion.div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">Ready to Order?</h2>
            <p className="text-gray-600 text-center mb-8">
              Click below to complete your order via WhatsApp. We'll confirm your details and process your order.
            </p>
            <motion.button
              onClick={handleWhatsAppOrder}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white py-4 px-6 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-3"
              whileHover={{ scale: 1.02, boxShadow: '0 20px 40px rgba(16, 185, 129, 0.3)' }}
              whileTap={{ scale: 0.98 }}
            >
              <FiCheckCircle size={24} />
              Complete Order on WhatsApp
            </motion.button>
            <p className="text-xs text-gray-500 mt-4 text-center">
              You'll be redirected to WhatsApp to finalize your order
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
