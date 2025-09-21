import { useState } from 'react'
import { FiFilter, FiChevronDown, FiChevronUp } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'

const ProductFilter = ({ 
  categories, 
  priceRange,
  onFilterChange,
  currentFilters,
  className = ''
}) => {
  const [openSection, setOpenSection] = useState(null)

  const handleFilterChange = (key, value) => {
    onFilterChange({ ...currentFilters, [key]: value })
  }

  const clearFilters = () => {
    const resetFilters = {
      category: '',
      minPrice: '',
      maxPrice: '',
      inStock: false,
      onSale: false
    }
    onFilterChange(resetFilters)
  }

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section)
  }

  // Count active filters
  const activeFilterCount = Object.entries(currentFilters).reduce((count, [key, value]) => {
    if (key === 'minPrice' || key === 'maxPrice') return value ? count + 1 : count
    return value ? count + 1 : count
  }, 0)

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.98 },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.4,
        when: "beforeChildren",
        staggerChildren: 0.04
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  }

  const sectionVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { 
      opacity: 1, 
      height: 'auto', 
      transition: { type: 'spring', stiffness: 120, damping: 15 }
    },
    exit: { opacity: 0, height: 0, transition: { duration: 0.2 } }
  }

  return (
    <motion.div 
      className={`bg-gradient-to-b from-gray-50 to-gray-100 rounded-xl shadow-md p-3 sm:p-5 border border-gray-100 ${className} max-w-full sm:max-w-sm md:max-w-md`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div 
        className="flex items-center justify-center mb-3 sm:mb-4"
        variants={itemVariants}
      >
        <div className="flex items-center space-x-2 sm:space-x-3">
          <FiFilter className="text-indigo-600" size={16} />
          <h2 className="text-base sm:text-lg font-semibold text-indigo-700">Filters</h2>
        </div>
      </motion.div>

      {/* Active Filter Count & Clear Button */}
      {activeFilterCount > 0 && (
        <motion.div 
          className="mb-3 sm:mb-4 flex justify-center"
          variants={itemVariants}
        >
          <div className="flex flex-col items-center justify-center space-y-2 sm:space-y-3 bg-gradient-to-b from-gray-100/80 to-gray-200/80 py-2 sm:py-3 px-3 sm:px-4 rounded-lg shadow-sm max-w-full sm:max-w-xs">
            <motion.button 
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:bg-gradient-to-r hover:from-green-600 hover:to-emerald-700 text-white font-semibold text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-sm hover:shadow-md"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.15 }}
            >
              {activeFilterCount} Active
            </motion.button>
            <motion.button
              onClick={clearFilters}
              className="bg-transparent border-2 border-indigo-500 text-indigo-500 hover:bg-indigo-500/10 hover:text-indigo-600 hover:shadow-md font-semibold text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.15 }}
            >
              Clear All
            </motion.button>
          </div>
        </motion.div>
      )}

      <div className="flex flex-col space-y-3 sm:space-y-4">
        {/* Category Filter */}
        <div className="border-b border-gray-200 pb-3 sm:pb-4 bg-gradient-to-b from-gray-50/80 to-gray-100/80 rounded-md shadow-sm">
          <motion.button
            onClick={() => toggleSection('category')}
            className="flex items-center justify-between w-full text-left py-2 px-3 sm:px-4 hover:bg-indigo-50 rounded-md"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          >
            <h3 className="text-base sm:text-lg font-semibold text-indigo-700">Category</h3>
            {openSection === 'category' ? (
              <FiChevronUp className="text-indigo-600" size={16} />
            ) : (
              <FiChevronDown className="text-indigo-600" size={16} />
            )}
          </motion.button>
          
          <AnimatePresence>
            {openSection === 'category' && (
              <motion.div
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="mt-2 sm:mt-3 space-y-2 sm:space-y-3 px-3 sm:px-4"
              >
                {categories.map(category => (
                  <motion.label 
                    key={category} 
                    className="flex items-center space-x-2 sm:space-x-3"
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                  >
                    <input
                      type="radio"
                      name="category"
                      checked={currentFilters.category === category}
                      onChange={() => handleFilterChange('category', category)}
                      className="h-4 sm:h-5 w-4 sm:w-5 text-indigo-600 focus:ring-indigo-500 accent-indigo-600"
                    />
                    <span className="text-xs sm:text-sm text-gray-700">{category}</span>
                  </motion.label>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Price Range Filter */}
        <div className="border-b border-gray-200 pb-3 sm:pb-4 bg-gradient-to-b from-gray-50/80 to-gray-100/80 rounded-md shadow-sm">
          <motion.button
            onClick={() => toggleSection('price')}
            className="flex items-center justify-between w-full text-left py-2 px-3 sm:px-4 hover:bg-indigo-50 rounded-md"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          >
            <h3 className="text-base sm:text-lg font-semibold text-indigo-700">Price Range</h3>
            {openSection === 'price' ? (
              <FiChevronUp className="text-indigo-600" size={16} />
            ) : (
              <FiChevronDown className="text-indigo-600" size={16} />
            )}
          </motion.button>
          
          <AnimatePresence>
            {openSection === 'price' && (
              <motion.div
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="mt-2 sm:mt-3 space-y-3 sm:space-y-4 px-3 sm:px-4 max-w-full sm:max-w-sm"
              >
                <div className="flex flex-col gap-3 sm:gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Min Price</label>
                    <motion.input
                      type="number"
                      placeholder="0"
                      value={currentFilters.minPrice}
                      onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                      className="pl-2 sm:pl-3 pr-3 sm:pr-4 py-1.5 sm:py-2 border border-indigo-300 rounded-md text-xs sm:text-sm w-full focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Max Price</label>
                    <motion.input
                      type="number"
                      placeholder="1000"
                      value={currentFilters.maxPrice}
                      onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                      className="pl-2 sm:pl-3 pr-3 sm:pr-4 py-1.5 sm:py-2 border border-indigo-300 rounded-md text-xs sm:text-sm w-full focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                    />
                  </div>
                </div>
                
                <div className="pt-2 sm:pt-3">
                  <motion.input
                    type="range"
                    min={priceRange.min}
                    max={priceRange.max}
                    value={currentFilters.minPrice || priceRange.min}
                    onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                    className="w-full h-2 sm:h-3 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    style={{
                      '--thumb-size': '16px',
                      '--webkit-slider-thumb': {
                        height: 'var(--thumb-size)',
                        width: 'var(--thumb-size)',
                        background: '#fff',
                        border: '2px solid #4f46e5',
                        borderRadius: '50%',
                        cursor: 'pointer'
                      }
                    }}
                  />
                  <style>
                    {`
                      input[type="range"]::-webkit-slider-thumb {
                        -webkit-appearance: none;
                        appearance: none;
                        height: var(--thumb-size);
                        width: var(--thumb-size);
                        background: #fff;
                        border: 2px solid #4f46e5;
                        border-radius: 50%;
                        cursor: pointer;
                      }
                      input[type="range"]::-moz-range-thumb {
                        height: var(--thumb-size);
                        width: var(--thumb-size);
                        background: #fff;
                        border: 2px solid #4f46e5;
                        border-radius: 50%;
                        cursor: pointer;
                      }
                    `}
                  </style>
                  <div className="flex justify-between mt-1 sm:mt-2 text-xs sm:text-sm text-gray-600">
                    <span>${priceRange.min}</span>
                    <span>${priceRange.max}</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

       

        
      </div>
    </motion.div>
  )
}

export default ProductFilter