import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiHome, FiArrowLeft } from 'react-icons/fi'

const NotFound = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  const buttonVariants = {
    hover: { 
      scale: 1.05,
      transition: {
        duration: 0.2,
        yoyo: Infinity
      }
    },
    tap: { scale: 0.95 }
  }

  const numberVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.1,
      rotate: [0, -5, 5, 0],
      transition: {
        duration: 0.5
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <motion.div
        className="text-center max-w-2xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* 404 Number with animation */}
        <motion.h1
          className="text-9xl font-bold bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent"
          variants={numberVariants}
          whileHover="hover"
        >
          404
        </motion.h1>

        {/* Error Message */}
        <motion.h2
          className="text-3xl font-bold mb-4 text-gray-800"
          variants={itemVariants}
        >
          Page Not Found
        </motion.h2>

        {/* Description */}
        <motion.p
          className="text-xl text-gray-600 mb-8"
          variants={itemVariants}
        >
          Oops! The page you're looking for seems to have wandered off.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          variants={itemVariants}
        >
          {/* Home Button */}
          <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
            <Link
              to="/"
              className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <FiHome className="text-xl" />
              <span className="text-lg font-medium">Go Home</span>
            </Link>
          </motion.div>

          {/* Back Button */}
          <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
            <button
              onClick={() => window.history.back()}
              className="flex items-center justify-center space-x-2 bg-white text-gray-700 px-8 py-4 rounded-lg hover:bg-gray-50 border-2 border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <FiArrowLeft className="text-xl" />
              <span className="text-lg font-medium">Go Back</span>
            </button>
          </motion.div>
        </motion.div>

        {/* Decorative Elements */}
        <motion.div
          className="mt-12 flex justify-center space-x-4"
          variants={itemVariants}
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-blue-500 rounded-full"
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}

export default NotFound
