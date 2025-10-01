import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiGrid, FiList, FiRotateCw, FiFilter } from 'react-icons/fi'
import ProductCard from '../components/product/ProductCard'
import { products, categories } from '../utils/constants'

const Shop = () => {
  const [searchParams] = useSearchParams()
  const [viewMode, setViewMode] = useState('grid')
  const [filteredProducts, setFilteredProducts] = useState(products)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const [filters, setFilters] = useState({
    category: '',
    brand: '',
    minPrice: '',
    maxPrice: '',
    inStock: false,
    onSale: false
  })

  const searchQuery = searchParams.get('search') || ''
  const categoryParam = searchParams.get('category') || ''

  // Initialize filters with URL parameters
  useEffect(() => {
    if (categoryParam) {
      setFilters(prev => ({ ...prev, category: categoryParam }))
    }
  }, [categoryParam])

  // Filter and sort products with error handling
  useEffect(() => {
    setLoading(true)
    setError(null)
    try {
      let result = [...products]

      // Apply search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        result = result.filter(product =>
          product.title.toLowerCase().includes(query) ||
          (product.description && product.description.toLowerCase().includes(query)) ||
          product.category.toLowerCase().includes(query) ||
          (product.brand && product.brand.toLowerCase().includes(query))
        )
      }

      // Apply category filter
      if (filters.category) {
        result = result.filter(product => product.category === filters.category)
      }

      // Apply brand filter
      if (filters.brand) {
        result = result.filter(product => product.brand === filters.brand)
      }

      // Apply price range filter
      if (filters.minPrice) {
        result = result.filter(product => {
          const price = Number(product.price) || 0;
          return price >= Number(filters.minPrice)
        })
      }
      if (filters.maxPrice) {
        result = result.filter(product => {
          const price = Number(product.price) || 0;
          return price <= Number(filters.maxPrice)
        })
      }

      // Apply stock filter
      if (filters.inStock) {
        result = result.filter(product => product.inStock === true)
      }

      // Apply sale filter
      if (filters.onSale) {
        result = result.filter(product => {
          const discount = Number(product.discount) || 0;
          return discount > 0
        })
      }

      setFilteredProducts(result)
    } catch (err) {
      setError('An error occurred while filtering products. Please try again or clear filters.')
      console.error('Filter error:', err)
    } finally {
      setLoading(false)
    }
  }, [filters, searchQuery])

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
  }

  // Reset filters when search query changes
  useEffect(() => {
    if (searchQuery) {
      setFilters({
        category: '',
        brand: '',
        minPrice: '',
        maxPrice: '',
        inStock: false,
        onSale: false
      })
    }
  }, [searchQuery])

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

  if (loading) {
    return (
      <motion.div
        className="min-h-screen bg-gray-50 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="text-center">
          <FiRotateCw className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading products...</p>
        </div>
      </motion.div>
    )
  }

  if (error) {
    return (
      <motion.div
        className="min-h-screen bg-gray-50 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="text-center">
          <div className="text-red-600 text-6xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Error Loading Products</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <motion.button
            onClick={() => {
              setError(null)
              setFilters({
                category: '',
                brand: '',
                minPrice: '',
                maxPrice: '',
                inStock: false,
                onSale: false
              })
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 transition-colors"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            Try Again
          </motion.button>
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
        {/* Header */}
        <motion.div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between" variants={itemVariants}>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Shop Collection</h1>
            {searchQuery ? (
              <p className="text-gray-600">
                Search results for: <span className="text-blue-600 font-medium">"{searchQuery}"</span> - {filteredProducts.length} products found
              </p>
            ) : categoryParam ? (
              <p className="text-gray-600">
                Category: <span className="text-blue-600 font-medium capitalize">{categoryParam.replace("'", "")}</span> - {filteredProducts.length} products found
              </p>
            ) : (
              <p className="text-gray-600">
                Discover our collection of {products.length} premium products
              </p>
            )}
          </div>
        </motion.div>

        {/* Top Filters */}
        <motion.div
          className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-6 mb-8"
          variants={itemVariants}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                  <FiFilter className="text-white" size={16} />
                </div>
                <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Filters</h2>
              </div>

              {/* Category Quick Filters */}
              <div className="flex flex-wrap gap-2">
                {categories.slice(0, 6).map(category => (
                  <motion.button
                    key={category}
                    onClick={() => handleFilterChange({ ...filters, category: filters.category === category ? '' : category })}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                      filters.category === category
                        ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {category}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Price Range Slider */}
            <div className="flex items-center gap-4 w-full lg:w-auto">
              <span className="text-sm font-medium text-gray-700">Price:</span>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.minPrice}
                  onChange={(e) => handleFilterChange({ ...filters, minPrice: e.target.value })}
                  className="w-20 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <span className="text-gray-500">-</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.maxPrice}
                  onChange={(e) => handleFilterChange({ ...filters, maxPrice: e.target.value })}
                  className="w-20 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Clear Filters */}
            {Object.values(filters).some(value => value) && (
              <motion.button
                onClick={() => setFilters({
                  category: '',
                  brand: '',
                  minPrice: '',
                  maxPrice: '',
                  inStock: false,
                  onSale: false
                })}
                className="px-6 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl font-medium hover:from-red-600 hover:to-pink-600 transition-all duration-300 shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Clear All
              </motion.button>
            )}
          </div>
        </motion.div>

        {/* Toolbar */}
        <motion.div
          className="bg-white rounded-xl shadow-sm p-4 mb-6 flex flex-col sm:flex-row items-center justify-between border border-gray-100"
          variants={itemVariants}
        >
          <p className="text-sm text-gray-600 mb-4 sm:mb-0">
            Showing <span className="font-medium">{filteredProducts.length}</span> products
          </p>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1 bg-gray-100 p-1 rounded-lg">
              <motion.button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg ${
                  viewMode === 'grid'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-blue-600'
                } transition-colors`}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <FiGrid size={18} />
              </motion.button>
              <motion.button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg ${
                  viewMode === 'list'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-blue-600'
                } transition-colors`}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <FiList size={18} />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <motion.div
            className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100"
            variants={itemVariants}
          >
            <div className="text-gray-300 text-6xl mb-4">🔍</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No products found
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Try adjusting your search or filter criteria to find what you're looking for.
            </p>
            <motion.button
              onClick={() => setFilters({
                category: '',
                brand: '',
                minPrice: '',
                maxPrice: '',
                inStock: false,
                onSale: false
              })}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              Clear all filters
            </motion.button>
          </motion.div>
        ) : (
          <>
            <motion.div
              className={`
                grid gap-6 mb-8
                ${viewMode === 'grid'
                  ? 'grid-cols-2'
                  : 'grid-cols-1'
                }
              `}
              variants={containerVariants}
            >
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  variants={itemVariants}
                  custom={index}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: index * 0.05 }}
                >
                  <ProductCard product={product} viewMode={viewMode} />
                </motion.div>
              ))}
            </motion.div>

            {/* Pagination */}
            {filteredProducts.length > 12 && (
              <motion.div
                className="flex justify-center"
                variants={itemVariants}
              >
                <nav className="flex items-center space-x-2">
                  <motion.button
                    className="px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-colors"
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    Previous
                  </motion.button>
                  <motion.button
                    className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-colors"
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    1
                  </motion.button>
                  <motion.button
                    className="px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-colors"
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    2
                  </motion.button>
                  <motion.button
                    className="px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-colors"
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    3
                  </motion.button>
                  <motion.button
                    className="px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-colors"
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    Next
                  </motion.button>
                </nav>
              </motion.div>
            )}
          </>
        )}
      </div>
    </motion.div>
  )
}

export default Shop