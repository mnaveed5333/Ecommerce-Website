import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ProductCard from './ProductCard'

const ProductCarousel = ({ products, title, autoPlay = true, interval = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [slidesToShow, setSlidesToShow] = useState(4)
  const [isPaused, setIsPaused] = useState(false)
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)
  const [progress, setProgress] = useState(0)
  const timerRef = useRef(null)
  const progressRef = useRef(null)

  // Calculate total slides
  const totalSlides = Math.ceil(products.length / slidesToShow)

  // Responsive slidesToShow based on window width
  useEffect(() => {
    const handleResize = () => {
      setSlidesToShow(2)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Auto-play and progress bar
  useEffect(() => {
    if (autoPlay && !isPaused && products.length >= slidesToShow) {
      timerRef.current = setInterval(nextSlide, interval)
      progressRef.current = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 100 / (interval / 100)))
      }, 100)

      return () => {
        clearInterval(timerRef.current)
        clearInterval(progressRef.current)
      }
    }
  }, [autoPlay, isPaused, interval, currentIndex, slidesToShow, products.length])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + slidesToShow) % products.length)
    setProgress(0)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - slidesToShow + products.length) % products.length)
    setProgress(0)
  }

  const goToSlide = (index) => {
    setCurrentIndex(index * slidesToShow % products.length)
    setProgress(0)
  }

  // Touch swipe handling
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX)
    setIsPaused(true)
  }

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (touchStart && touchEnd) {
      const diff = touchStart - touchEnd
      if (diff > 50) nextSlide() // Swipe left
      if (diff < -50) prevSlide() // Swipe right
    }
    setTouchStart(null)
    setTouchEnd(null)
    setTimeout(() => setIsPaused(false), 2000) // Resume auto-play after 2s
  }

  // Get visible products with wrap-around for infinite loop
  let visibleProducts = products.slice(currentIndex, currentIndex + slidesToShow)
  if (visibleProducts.length < slidesToShow) {
    visibleProducts = [...visibleProducts, ...products.slice(0, slidesToShow - visibleProducts.length)]
  }

  // Framer Motion variants
  const slideVariants = {
    enter: { x: '100%', opacity: 0 },
    center: { x: 0, opacity: 1, transition: { duration: 0.5, ease: 'easeInOut' } },
    exit: { x: '-100%', opacity: 0 }
  }

  const dotVariants = {
    active: { scale: 1.3, backgroundColor: '#14B8A6', boxShadow: '0 0 8px rgba(20, 184, 166, 0.5)' },
    inactive: { scale: 1, backgroundColor: '#D1D5DB' }
  }

  return (
    <div 
      className="relative py-8 bg-gradient-to-b from-gray-50 to-white rounded-xl shadow-lg"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {title && (
        <motion.h2
          className="text-3xl font-bold text-gray-900 mb-8 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {title}
        </motion.h2>
      )}
      
      <div className="relative overflow-hidden px-4">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={currentIndex}
            className={`grid grid-cols-${slidesToShow} gap-6`}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
          >
            {visibleProducts.map((product, index) => (
              <motion.div
                key={`${product.id}-${index}-${currentIndex}`} // Unique key for re-renders
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1, type: 'spring', stiffness: 200 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Progress Bar for Auto-Play */}
      {autoPlay && products.length >= slidesToShow && (
        <div className="mt-4 px-4">
          <div className="bg-gray-200 rounded-full h-1 overflow-hidden">
            <motion.div
              className="bg-teal-500 h-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1, ease: 'linear' }}
            />
          </div>
        </div>
      )}
      
      {/* Indicators (hidden if not enough products) */}
      {products.length > slidesToShow && (
        <div className="flex justify-center space-x-3 mt-6">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <motion.button
              key={index}
              onClick={() => goToSlide(index)}
              className="w-3 h-3 rounded-full"
              variants={dotVariants}
              animate={Math.floor(currentIndex / slidesToShow) === index ? 'active' : 'inactive'}
              whileHover={{ scale: 1.5 }}
              transition={{ type: 'spring', stiffness: 300 }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default ProductCarousel