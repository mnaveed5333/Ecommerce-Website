import { motion } from 'framer-motion'
import { FiPackage, FiCalendar, FiDollarSign, FiEye, FiChevronRight } from 'react-icons/fi'
import { useOrder } from '../context/OrderContext'
import OrderHistory from '../components/user/OrderHistory'

const Orders = () => {
  const { orders, loading } = useOrder()

  // Calculate real statistics from orders data
  const totalOrders = orders.length
  const pendingOrders = orders.filter(order => order.status === 'processing').length
  const totalSpent = orders.reduce((sum, order) => sum + (order.total || 0), 0)

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
        stiffness: 300,
        damping: 24
      }
    }
  }

  return (
    <motion.div
      className="min-h-screen bg-gray-50"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <motion.div 
          className="mb-8"
          variants={itemVariants}
        >
          <div className="flex items-center mb-4">
            <div className="p-3 bg-blue-100 rounded-lg mr-4">
              <FiPackage className="text-blue-600 text-2xl" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
          </div>
          <p className="text-gray-600">Track and manage your order history</p>
        </motion.div>

        {/* Stats Overview */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          variants={itemVariants}
        >
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Total Orders</p>
                <p className="text-2xl font-bold text-gray-900">
                  {loading ? '...' : totalOrders}
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <FiPackage className="text-blue-600 text-xl" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Pending</p>
                <p className="text-2xl font-bold text-gray-900">
                  {loading ? '...' : pendingOrders}
                </p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-lg">
                <FiCalendar className="text-yellow-600 text-xl" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Total Spent</p>
                <p className="text-2xl font-bold text-gray-900">
                  {loading ? '...' : `$${totalSpent.toFixed(2)}`}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <FiDollarSign className="text-green-600 text-xl" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Order History */}
        <motion.div variants={itemVariants}>
          <OrderHistory />
        </motion.div>
      </div>
    </motion.div>
  )
}

export default Orders