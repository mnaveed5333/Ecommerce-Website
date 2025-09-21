import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiHeart, FiShoppingCart, FiArrowLeft } from 'react-icons/fi'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import ProductCard from '../components/product/ProductCard'

const Wishlist = () => {
  const { addItem } = useCart()
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist()

  const handleAddToCart = (product) => {
    addItem(product)
    removeFromWishlist(product.id)
  }

  const handleMoveAllToCart = () => {
    wishlistItems.forEach(product => {
      addItem(product)
    })
    clearWishlist()
  }

  // Framer Motion variants
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
    hover: { scale: 1.05, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' },
    tap: { scale: 0.95 }
  }

  if (wishlistItems.length === 0) {
    return (
      <motion.div
        className="min-h-screen bg-gray-50"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <motion.div
            className="max-w-2xl mx-auto text-center bg-white rounded-xl shadow-lg p-8"
            variants={itemVariants}
          >
            <motion.div
              className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <FiHeart className="w-12 h-12 text-gray-500" />
            </motion.div>
            
            <motion.h1
              className="text-2xl font-bold text-gray-900 mb-4"
              variants={itemVariants}
            >
              Your Wishlist is Empty
            </motion.h1>
            <motion.p
              className="text-gray-600 mb-8"
              variants={itemVariants}
            >
              Save your favorite items here to easily find them later.
            </motion.p>
            
            <motion.div variants={itemVariants}>
              <Link
                to="/shop"
                className="inline-flex items-center space-x-2 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-teal-300 focus:ring-offset-2 transition-colors group relative"
              >
                <FiArrowLeft />
                <span>Continue Shopping</span>
                <span className="absolute bottom-full mb-2 left-16 text-center hidden group-hover:block bg-gray-900 text-white text-xs rounded py-1 px-2">
                  Back to Shop
                </span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      className="min-h-screen bg-gray-50"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <motion.div
          className="flex justify-between items-center mb-8"
          variants={itemVariants}
        >
          <h1 className="text-3xl font-bold text-gray-900">
            My Wishlist <motion.span
              className="ml-2 text-teal-500 text-sm font-medium"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
            >
              ({wishlistItems.length})
            </motion.span>
          </h1>
          <div className="flex space-x-4">
            <motion.button
              onClick={handleMoveAllToCart}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-teal-300 focus:ring-offset-2 transition-colors group relative"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              Move All to Cart
              <span className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-900 text-white text-xs rounded py-1 px-2">
                Add All to Cart
              </span>
            </motion.button>
            <motion.button
              onClick={clearWishlist}
              className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 transition-colors group relative"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              Clear Wishlist
              <span className="absolute bottom-full mb-2 w-28 left-0 hidden group-hover:block bg-gray-900 text-white text-xs rounded py-1 px-2">
                Remove All Items
              </span>
            </motion.button>
          </div>
        </motion.div>
        
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          variants={containerVariants}
        >
          <AnimatePresence>
            {wishlistItems.map((product, index) => (
              <motion.div
                key={product.id}
                className="relative"
                variants={itemVariants}
                custom={index}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: index * 0.1 }}
              >
                <ProductCard product={product} />
                <motion.button
                  onClick={() => removeFromWishlist(product.id)}
                  className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-red-100 text-red-500 focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-offset-2 transition-colors group relative"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <FiHeart className="fill-current" size={16} />
                  <span className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-900 text-white text-xs rounded py-1 px-2">
                    Remove from Wishlist
                  </span>
                </motion.button>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        
        <motion.div className="mt-8" variants={itemVariants}>
          <Link
            to="/shop"
            className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 group relative"
          >
            <FiArrowLeft />
            <span>Continue Shopping</span>
            <span className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-900 text-white text-xs rounded py-1 px-2">
              Back to Shop
            </span>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default Wishlist