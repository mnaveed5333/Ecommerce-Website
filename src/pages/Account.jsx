import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FaUser, FaShoppingBag, FaHeart, FaCog, FaCheck } from 'react-icons/fa'
import { useAuth } from '../context/AuthContext'
import ProfileCard from '../components/user/ProfileCard'
import OrderHistory from '../components/user/OrderHistory'

const Account = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('profile')

  // Framer Motion variants for animations
  const tabVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    hover: { scale: 1.05, color: '#4f46e5' }
  }

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } }
  }

  const buttonVariants = {
    hover: { scale: 1.05, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' },
    tap: { scale: 0.95 }
  }

  if (!user) {
    return (
      <motion.div
        className="min-h-screen flex items-center justify-center bg-gray-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="text-center p-6 bg-white rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Please log in</h2>
          <p className="text-gray-600 mb-6 text-sm">You need to be logged in to view your account.</p>
          <motion.div whileHover="hover" whileTap="tap" variants={buttonVariants}>
            <Link
              to="/login"
              className="inline-flex items-center bg-indigo-500 text-white px-6 py-2.5 rounded-lg hover:bg-indigo-600 focus:ring-2 focus:ring-indigo-300 focus:ring-offset-2 text-sm font-medium shadow-md transition-colors group relative"
            >
              Login
              <span className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2">
                Sign in to your account
              </span>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.h1
          className="text-3xl font-bold mb-8 text-gray-900"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          My Account
        </motion.h1>
        
        {/* Tab Navigation */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="flex flex-wrap gap-4 sm:gap-8">
            {[
              { tab: 'profile', label: 'Profile', icon: FaUser },
              { tab: 'orders', label: 'Order History', icon: FaShoppingBag },
              { tab: 'wishlist', label: 'Wishlist', icon: FaHeart },
              { tab: 'settings', label: 'Settings', icon: FaCog }
            ].map(({ tab, label, icon: Icon }) => (
              <motion.button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 group relative ${
                  activeTab === tab
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-600 hover:text-indigo-600 hover:border-gray-300'
                }`}
                variants={tabVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                transition={{ duration: 0.2 }}
              >
                <Icon className="h-4 w-4" />
                {label}
                <span className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2">
                  View {label}
                </span>
              </motion.button>
            ))}
          </nav>
        </div>
        
        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={contentVariants}
            transition={{ duration: 0.4 }}
          >
            {activeTab === 'profile' && <ProfileCard />}
            {activeTab === 'orders' && <OrderHistory />}
            {activeTab === 'wishlist' && (
              <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
                <h2 className="text-xl font-bold mb-4 text-gray-900">Wishlist</h2>
                <p className="text-gray-600 text-sm">Your wishlist is empty.</p>
              </div>
            )}
            {activeTab === 'settings' && (
              <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
                <h2 className="text-xl font-bold mb-4 text-gray-900">Account Settings</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-2 text-gray-900">Notification Preferences</h3>
                    <div className="space-y-3">
                      {[
                        { label: 'Email notifications', defaultChecked: true },
                        { label: 'Order updates', defaultChecked: true },
                        { label: 'Marketing emails', defaultChecked: false }
                      ].map(({ label, defaultChecked }, index) => (
                        <label key={index} className="flex items-center group relative">
                          <motion.input
                            type="checkbox"
                            className="rounded border-gray-300 text-indigo-500 focus:ring-indigo-300 cursor-pointer"
                            defaultChecked={defaultChecked}
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.2 }}
                          />
                          <motion.span
                            className="ml-2 text-sm text-gray-600 group-hover:text-indigo-600 transition-colors"
                            whileHover={{ x: 2 }}
                            transition={{ duration: 0.2 }}
                          >
                            {label}
                            <span className="absolute left-full top-0 w-16 font-bold text-center ml-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2">
                            Change
                            </span>
                          </motion.span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2 text-gray-900">Privacy Settings</h3>
                    <div className="space-y-3">
                      {[
                        { label: 'Show my profile', defaultChecked: true },
                        { label: 'Allow data collection', defaultChecked: false }
                      ].map(({ label, defaultChecked }, index) => (
                        <label key={index} className="flex items-center group relative">
                          <motion.input
                            type="checkbox"
                            className="rounded border-gray-300 text-indigo-500 focus:ring-indigo-300 cursor-pointer"
                            defaultChecked={defaultChecked}
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.2 }}
                          />
                          <motion.span
                            className="ml-2 text-sm text-gray-600 group-hover:text-indigo-600 transition-colors"
                            whileHover={{ x: 2 }}
                            transition={{ duration: 0.2 }}
                          >
                            {label}
                            <span className="absolute top-0 left-full w-16  font-bold text-center  ml-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2">
                              Change
                            </span>
                          </motion.span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  <motion.button
                    className="bg-indigo-500 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-indigo-600 focus:ring-2 focus:ring-indigo-300 focus:ring-offset-2 shadow-md transition-colors group relative"
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    transition={{ duration: 0.2 }}
                  ><Link to={"/"}>
                    Save Settings</Link>
                    <span className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2">
                      Save your preferences
                    </span>
                  </motion.button>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default Account