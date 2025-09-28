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
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <motion.h1
          className="text-3xl font-bold text-gray-900 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          Complete Your Order
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <motion.div
            className="bg-white rounded-xl shadow-lg p-6 sm:p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
            <div className="space-y-4">
              {items.map((item, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{item.title}</h3>
                    <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                    <p className="text-sm font-medium text-gray-900">${item.price * item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t pt-4 mt-6">
              <div className="flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span>${getCartTotal()}</span>
              </div>
            </div>
          </motion.div>

          {/* WhatsApp Order */}
          <motion.div
            className="bg-white rounded-xl shadow-lg p-6 sm:p-8 flex flex-col justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <h2 className="text-xl font-bold text-gray-900 mb-4">Ready to Order?</h2>
            <p className="text-gray-600 text-center mb-6">
              Click below to complete your order via WhatsApp. We'll confirm your details and process your order.
            </p>
            <motion.button
              onClick={handleWhatsAppOrder}
              className="w-full bg-green-500 hover:bg-green-600 text-white py-4 px-6 rounded-lg font-medium text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3"
              whileHover={{ scale: 1.02 }}
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
