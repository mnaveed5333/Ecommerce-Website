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

  // Motion Variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  }

  const buttonVariants = {
    hover: {
      scale: 1.08,
      boxShadow: '0 6px 18px rgba(37, 99, 235, 0.25)',
      transition: { type: 'spring', stiffness: 300 }
    },
    tap: { scale: 0.95 }
  }

  return (
    <motion.div
      className={`group relative rounded-xl overflow-hidden shadow-md hover:shadow-xl
      transition-all duration-500 bg-white border border-slate-200
      ${viewMode === 'list' ? 'flex flex-row' : ''}`}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -4 }}
    >
      <Link to={`/product/${product.id}`} className="block w-full h-full">
        {/* Image Section */}
        <div
          className={`relative overflow-hidden
          ${viewMode === 'list' ? 'w-32 h-32 flex-shrink-0' : 'w-28 h-28 md:w-full md:h-56'}`}
        >
          {!imageLoaded && (
            <div className="absolute inset-0 bg-slate-200 animate-pulse" />
          )}

          <motion.img
            src={product.image}
            alt={product.title}
            className={`w-full h-full object-contain transition duration-700 ease-in-out 
            ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setImageLoaded(true)}
            whileHover={{ scale: 1.05 }}
          />

          {/* Discount Badge */}
          {product.discount > 0 && (
            <motion.div
              className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-bold 
              bg-gradient-to-r from-blue-600 to-blue-400 text-white shadow-md"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              -{product.discount}%
            </motion.div>
          )}

          {/* Floating Action Buttons */}
          <div className="absolute top-2 right-2 flex flex-col space-y-2 opacity-0 
          group-hover:opacity-100 transition-opacity duration-300 z-10">
            {/* Wishlist */}
            <motion.button
              onClick={handleWishlistToggle}
              className="p-1.5 rounded-full bg-white/80 backdrop-blur-md text-gray-700 
              shadow-sm hover:bg-blue-600 hover:text-white transition-all"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <FiHeart
                className={`${
                  isWishlisted ? 'text-blue-600 fill-blue-600' : ''
                }`}
                size={14}
              />
            </motion.button>

            {/* View Details */}
            <motion.button
              onClick={handleViewDetails}
              className="p-1.5 rounded-full bg-white/80 backdrop-blur-md text-gray-700 
              shadow-sm hover:bg-blue-600 hover:text-white transition-all"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <FiEye size={14} />
            </motion.button>
          </div>
        </div>

        {/* Product Info */}
        <div className={`p-3 ${viewMode === 'list' ? 'flex-1' : ''}`}>
          {/* Title */}
          <motion.h3
            className="text-sm font-semibold text-gray-900 mb-1 line-clamp-1 group-hover:text-blue-600 transition-colors"
          >
            {product.title}
          </motion.h3>

          {/* Short Description */}
          {product.description && (
            <p className="text-xs text-gray-600 mb-2 line-clamp-2">
              {product.description.length > 80
                ? `${product.description.substring(0, 80)}...`
                : product.description
              }
            </p>
          )}

          {/* Price & Rating */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold text-slate-900">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice &&
                product.originalPrice > product.price && (
                  <span className="text-xs text-gray-400 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
            </div>
            {product.rating && (
              <div className="flex items-center text-xs">
                <motion.span
                  className="text-yellow-400"
                  initial={{ scale: 0.85 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  ★
                </motion.span>
                <span className="text-gray-600 ml-0.5">
                  {product.rating.rate}
                </span>
              </div>
            )}
          </div>

          {/* CTA Add to Cart */}
          <motion.button
            onClick={handleAddToCart}
            className="w-full flex items-center justify-center space-x-1.5
            bg-gradient-to-r from-blue-600 to-indigo-500 text-white py-2.5 px-4
            rounded-lg text-sm font-medium shadow-md hover:shadow-lg
            transition-all duration-300"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <FiShoppingCart size={14} />
            <span>Add</span>
          </motion.button>
        </div>
      </Link>
    </motion.div>
  )
}

export default ProductCard
