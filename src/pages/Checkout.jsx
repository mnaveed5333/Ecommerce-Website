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
  const [step, setStep] = useState(1)
  const [shippingData, setShippingData] = useState(null)
  const [paymentData, setPaymentData] = useState(null)
  const [hasStartedCheckout, setHasStartedCheckout] = useState(false)

  const { items, clearCart, getCartTotal } = useCart()
  const { createOrder } = useOrder()
  const { user } = useAuth()
  const navigate = useNavigate()

  // Only check for empty cart on initial mount, not during checkout process
  useEffect(() => {
    if (items.length === 0 && !hasStartedCheckout) {
      navigate('/cart')
    }
  }, [items.length, hasStartedCheckout, navigate])

  const handleShippingSubmit = (data) => {
    setShippingData(data)
    setStep(2)
    setHasStartedCheckout(true)
  }

  const handlePaymentSubmit = async (data) => {
    setPaymentData(data)

    // Create order
    const order = {
      items,
      shippingAddress: shippingData,
      paymentMethod: data,
      total: getCartTotal(),
      subtotal: getCartTotal(),
      shipping: getCartTotal() > 50 ? 0 : 5.99,
      tax: getCartTotal() * 0.08
    }

    try {
      await createOrder(order)
      clearCart()
      // Fixed navigation path to match route definition
      navigate('/order-confirmation', { state: { order } })
    } catch (error) {
      console.error('Failed to create order:', error)
    }
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
          Checkout
        </motion.h1>

        {/* Progress Steps */}
        <div className="mb-8 sm:mb-12">
          <div className="flex items-center justify-center space-x-4 sm:space-x-8">
            <motion.div
              className={`flex items-center ${step >= 1 ? 'text-blue-600' : 'text-gray-400'}`}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border-2 ${
                step >= 1 ? 'border-blue-600 bg-blue-600 text-white' : 'border-gray-300'
              }`}>
                1
              </div>
              <span className="ml-2 text-sm sm:text-base">Shipping</span>
            </motion.div>

            <div className={`w-16 sm:w-24 h-0.5 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>

            <motion.div
              className={`flex items-center ${step >= 2 ? 'text-blue-600' : 'text-gray-400'}`}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border-2 ${
                step >= 2 ? 'border-blue-600 bg-blue-600 text-white' : 'border-gray-300'
              }`}>
                2
              </div>
              <span className="ml-2 text-sm sm:text-base">Payment</span>
            </motion.div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="shipping"
                  className="bg-white rounded-xl shadow-lg p-6 sm:p-8"
                  variants={stepVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Shipping Information</h2>
                  <ShippingForm
                    onSubmit={handleShippingSubmit}
                    initialData={user ? {
                      firstName: user.name?.split(' ')[0],
                      lastName: user.name?.split(' ')[1],
                      email: user.email
                    } : {}}
                  />
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="payment"
                  className="bg-white rounded-xl shadow-lg p-6 sm:p-8"
                  variants={stepVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Payment Method</h2>
                  <PaymentForm onSubmit={handlePaymentSubmit} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <OrderSummary
              shippingAddress={shippingData}
              paymentMethod={paymentData}
            />
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
