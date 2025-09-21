import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiHeart, FiShoppingCart, FiEye } from 'react-icons/fi'
import { useCart } from '../../context/CartContext'
import { useAuth } from '../../context/AuthContext'
import { useWishlist } from '../../context/WishlistContext'

const ProductCard = ({ product, viewMode = 'grid' }) => {
  const [imageLoaded, setImageLoaded] = useState(false)

  const { addItem } = useCart()
  const { isAuthenticated } = useAuth()
  const { wishlistItems, addToWishlist, removeFromWishlist } = useWishlist()
  const navigate = useNavigate()

  const isWishlisted = wishlistItems.some(item => item.id === product.id)

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product)
  }

  const handleWishlistToggle = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (!isAuthenticated) {
      alert('Please login to add items to your wishlist')
      return
    }
    isWishlisted ? removeFromWishlist(product.id) : addToWishlist(product)
  }

  const handleViewDetails = (e) => {
    e.preventDefault()
    e.stopPropagation()
    navigate(`/product/${product.id}`)
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, when: 'beforeChildren', staggerChildren: 0.1 } }
  }

  const buttonVariants = {
    hover: { scale: 1.15, boxShadow: '0 6px 20px rgba(37, 99, 235, 0.25)', transition: { type: 'spring', stiffness: 300 } },
    tap: { scale: 0.9 }
  }

  const actionsVariants = {
    hidden: { opacity: 0, x: 15 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeOut' } }
  }

  const textVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  }

  return (
    <motion.div
      className={`group relative bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-lg ${viewMode === 'list' ? 'flex flex-row' : ''}`}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
    >
      <Link to={`/product/${product.id}`} className="block">
        {/* Image container with fixed dimensions */}
        <div className={`relative overflow-hidden ${viewMode === 'list' ? 'w-48 h-48 flex-shrink-0' : 'w-full h-80'}`}>
          {/* Loading skeleton */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-100 animate-pulse"></div>
          )}

          {/* Image without hover effect */}
          <div className="w-full h-full flex items-center justify-center">
            <img
              src={product.image}
              alt={product.title}
              className={`w-full h-full object-contain transition-opacity duration-300 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
            />
          </div>

          {/* Discount badge */}
          {product.discount > 0 && (
            <motion.div
              className="absolute top-3 left-3 bg-blue-700 text-white px-3 py-1 text-xs font-bold rounded-full z-10"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, type: 'spring', stiffness: 400 }}
            >
              -{product.discount}%
            </motion.div>
          )}

          {/* Action buttons */}
          <motion.div
            className="absolute top-3 right-3 flex flex-col space-y-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
            variants={actionsVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.button
              onClick={handleWishlistToggle}
              className="p-2 rounded-full bg-white/90 backdrop-blur text-gray-700 shadow-md hover:bg-blue-700 hover:text-white transition-colors duration-200 relative"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <FiHeart className={isWishlisted ? 'text-blue-700' : ''} size={18} />
              {isWishlisted && (
                <motion.span
                  className="absolute -top-2 -right-2 bg-blue-700 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                >
                  1
                </motion.span>
              )}
            </motion.button>

            <motion.button
              onClick={handleViewDetails}
              className="p-2 rounded-full bg-white/90 backdrop-blur text-gray-700 shadow-md hover:bg-blue-700 hover:text-white transition-colors duration-200"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <FiEye size={18} />
            </motion.button>
          </motion.div>
        </div>

        {/* Product info */}
        <div className={`p-5 ${viewMode === 'list' ? 'flex-1' : ''}`}>
          <motion.h3 className="text-base font-bold text-gray-900 mb-2 line-clamp-1" variants={textVariants}>
            {product.title}
          </motion.h3>
          <motion.p className="text-sm text-gray-600 mb-3 line-clamp-2" variants={textVariants}>
            {product.description}
          </motion.p>

          <motion.div className="flex items-center justify-between mb-4" variants={textVariants}>
            <div className="flex items-center space-x-3">
              <span className="text-xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-sm text-gray-500 line-through">${product.originalPrice.toFixed(2)}</span>
              )}
            </div>
            {product.rating && (
              <div className="flex items-center">
                <motion.span className="text-yellow-400" initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 300 }}>★</motion.span>
                <span className="text-sm text-gray-600 ml-1">{product.rating.rate}</span>
                <span className="text-xs text-gray-400 ml-1">({product.rating.count})</span>
              </div>
            )}
          </motion.div>

          <motion.button
            onClick={handleAddToCart}
            className="w-full flex items-center justify-center space-x-2 bg-blue-700 text-white py-3 px-5 rounded-lg text-base font-semibold hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 shadow-md transition-all duration-200"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <FiShoppingCart size={18} />
            <span>Add to Cart</span>
          </motion.button>
        </div>
      </Link>
    </motion.div>
  )
}

export default ProductCard
