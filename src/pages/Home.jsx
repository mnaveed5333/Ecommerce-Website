﻿import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import men from "/8896469042.png"
import women from "/image (2).png"
import jewelary from "/76237953771.png"
import electronics from "/image2.png"
import img1 from "/OIP.webp"
import img2 from "/1-12536_girls-landscape-watercolor-smiling-smooth-tee-t-shirt.png"
import img3 from "/j_23212772_1718919475751_bg_processed.webp"
import img4 from "/ai-generated-a-beautiful-headphone-free-png.png"
import {
  FiShoppingBag,
  FiStar,
  FiTruck,
  FiShield,
  FiRefreshCw,
  FiArrowRight,
  FiGrid,
  FiList,
  FiFilter,
  FiChevronLeft,
  FiChevronRight,
  FiPlay,
  FiPause
} from 'react-icons/fi'
import Header from '../components/common/Header'
import Footer from '../components/common/Footer'
import ProductCard from '../components/product/ProductCard'
import ProductCarousel from '../components/product/ProductCarousel'
import ProductFilter from '../components/product/ProductFilter'
import { products, categories } from '../utils/constants'

/* ----------------------------
  heroSlides & textStyles — fixed keys for gradient styling
----------------------------- */
const heroSlides = [
  {
    id: 4,
    title: "Smart Living Starts Here",
    subtitle: "Electronics & Gadgets",
    description: "Explore the latest smartphones, laptops, and gadgets designed for modern life.",
    cta: "Shop Electronics",
    ctaLink: "/shop?category=electronics",
    image: "https://cdni.iconscout.com/illustration/premium/thumb/gadgets-3395110-2862652.png",
    stats: { sold: "20K+", rating: "4.9", reviews: "5.5K" },
    style: {
      accentFrom: "#7C3AED",
      accentTo: "#0EA5E9",
      textColor: "#ffffff",
      descColor: "#E6F6FF",
      buttonFrom: "#4338CA",
      buttonTo: "#06B6D4",
      buttonText: "#fff"
    }
  },
  {
    id: 1,
    title: "Style That Defines You",
    subtitle: "Men's Exclusive Collection",
    description: "Upgrade your wardrobe with premium outfits designed for comfort.",
    cta: "Shop Men's",
    ctaLink: "/shop?category=men's clothing",
    image: men,
    stats: { sold: "12K+", rating: "4.7", reviews: "3.2K" },
    style: {
      accentFrom: "#2563EB",
      accentTo: "#06B6D4",
      textColor: "#ffffff",
      descColor: "#EAF8FF",
      buttonFrom: "#1E40AF",
      buttonTo: "#0EA5E9",
      buttonText: "#fff"
    }
  },
  {
    id: 2,
    title: "Elegance Redefined",
    subtitle: "Women's Fashion Trends",
    description: "Discover chic styles, modern outfits, and timeless classics made for every occasion.",
    cta: "Shop Women's",
    ctaLink: "/shop?category=women's clothing",
    image: women,
    stats: { sold: "15K+", rating: "4.9", reviews: "4.1K" },
    style: {
      accentFrom: "#DB2777",
      accentTo: "#A21CAF",
      textColor: "#ffffff",
      descColor: "#FFF0F6",
      buttonFrom: "#BE185D",
      buttonTo: "#8B5CF6",
      buttonText: "#fff"
    }
  },
  {
    id: 3,
    title: "Luxury That Shines",
    subtitle: "Jewelry & Accessories",
    description: "Adorn yourself with our stunning collection of jewelry crafted to perfection.",
    cta: "Shop Jewelry",
    ctaLink: "/shop?category=jewelery",
    image: jewelary,
    stats: { sold: "7K+", rating: "4.8", reviews: "2.3K" },
    style: {
      accentFrom: "#F59E0B",
      accentTo: "#EF4444",
      textColor: "#111827",
      descColor: "#FFF7ED",
      buttonFrom: "#D97706",
      buttonTo: "#DC2626",
      buttonText: "#fff"
    }
  }
]

// slide animation variants
const slideVariants = {
  enter: { x: 200, opacity: 0 },
  center: { zIndex: 1, x: 0, opacity: 1 },
  exit: { zIndex: 0, x: -200, opacity: 0 }
}

// section / card motion variants
const heroVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, staggerChildren: 0.15 } } }
const heroItemVariants = { hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: { duration: 0.45 } } }
const sectionVariants = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: 0.08 } } }
const cardVariants = { hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: { duration: 0.45 } } }
const statsVariants = { hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.45, type: 'spring', stiffness: 200 } } }

const Home = () => {
  const [filteredProducts, setFilteredProducts] = useState(products)
  const [viewMode, setViewMode] = useState('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024)
  const [currentFilters, setCurrentFilters] = useState({
    category: '',
    minPrice: '',
    maxPrice: '',
    inStock: false,
    onSale: false
  })

  // price range
  const priceRange = { min: Math.floor(Math.min(...products.map(p => p.price))), max: Math.ceil(Math.max(...products.map(p => p.price))) }

  useEffect(() => {
    let filtered = products.slice()
    if (currentFilters.category && currentFilters.category !== 'All') filtered = filtered.filter(p => p.category === currentFilters.category)
    if (currentFilters.minPrice) filtered = filtered.filter(p => p.price >= parseFloat(currentFilters.minPrice))
    if (currentFilters.maxPrice) filtered = filtered.filter(p => p.price <= parseFloat(currentFilters.maxPrice))
    if (currentFilters.inStock) filtered = filtered.filter(p => (p.stock ?? 0) > 0)
    if (currentFilters.onSale) filtered = filtered.filter(p => (p.discount ?? 0) > 0)
    setFilteredProducts(filtered)
  }, [currentFilters])

  const handleFilterChange = (newFilters) => setCurrentFilters(newFilters)

  // responsive width handler
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // autoplay carousel
  useEffect(() => {
    if (!isPlaying) return
    const interval = setInterval(() => setCurrentSlide(prev => (prev + 1) % heroSlides.length), 5000)
    return () => clearInterval(interval)
  }, [isPlaying])

  const nextSlide = () => setCurrentSlide(prev => (prev + 1) % heroSlides.length)
  const prevSlide = () => setCurrentSlide(prev => (prev - 1 + heroSlides.length) % heroSlides.length)
  const toggleAutoplay = () => setIsPlaying(p => !p)

  // derived product groups
  const featuredProducts = products.slice(0, 8)
  const bestSellers = products.filter(p => p.rating?.rate >= 4.5).slice(0, 6)
  const newArrivals = products.slice(-6)

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">

      {/* HERO SLIDER (compact and responsive) */}
      <section className="relative w-full bg-transparent overflow-hidden">
        {/* Decorative bubbles — hide on xs to reduce clutter */}
        <div className="hidden sm:block">
          <div className="absolute top-8 left-6 w-14 h-14 bg-blue-100 rounded-full opacity-60 animate-float" />
          <div className="absolute top-20 left-12 w-10 h-10 bg-indigo-100 rounded-full opacity-50 animate-float delay-700" />
          <div className="absolute top-12 right-8 w-16 h-16 bg-purple-100 rounded-full opacity-50 animate-float delay-1000" />
          <div className="absolute bottom-16 left-10 w-12 h-12 bg-amber-100 rounded-full opacity-60 animate-float delay-1600" />
          <div className="absolute bottom-10 right-24 w-9 h-9 bg-teal-100 rounded-full opacity-60 animate-float delay-2500" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* left card (text) */}
            <motion.div
              className="order-2 lg:order-1 w-full max-w-xl mx-auto"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div
                className="rounded-2xl p-6 md:p-8 shadow-2xl border"
                style={{
                  background: `linear-gradient(135deg, ${heroSlides[currentSlide].style.accentFrom}, ${heroSlides[currentSlide].style.accentTo})`,
                  color: heroSlides[currentSlide].style.textColor
                }}
              >
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight mb-3">
                  {heroSlides[currentSlide].title}
                </h1>

                <p className="text-sm sm:text-base md:text-lg leading-relaxed mb-5" style={{ color: heroSlides[currentSlide].style.descColor }}>
                  {heroSlides[currentSlide].description}
                </p>

                <div className="flex flex-wrap gap-3">
                  <Link
                    to={heroSlides[currentSlide].ctaLink}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold shadow hover:shadow-lg transition"
                    style={{
                      background: `linear-gradient(90deg, ${heroSlides[currentSlide].style.buttonFrom}, ${heroSlides[currentSlide].style.buttonTo})`,
                      color: heroSlides[currentSlide].style.buttonText
                    }}
                  >
                    {heroSlides[currentSlide].cta}
                    <FiArrowRight />
                  </Link>

                  <button
                    onClick={() => setIsPlaying(p => !p)}
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white hover:bg-white/20 transition"
                    aria-pressed={!isPlaying}
                  >
                    {isPlaying ? <FiPause /> : <FiPlay />} {isPlaying ? 'Pause' : 'Play'}
                  </button>
                </div>
              </div>

              
            </motion.div>

            {/* right image (responsive) */}
            <motion.div
              className="order-1 lg:order-2 flex items-center justify-center"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-full max-w-md">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentSlide}
                    src={heroSlides[currentSlide].image}
                    alt={heroSlides[currentSlide].title}
                    className="w-full h-56 sm:h-72 md:h-80 lg:h-[28rem] object-contain mx-auto"
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    loading="lazy"
                  />
                </AnimatePresence>

                {/* controls & indicators — responsive placement */}
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button onClick={prevSlide} className="p-2 bg-white rounded-full shadow hover:scale-105 transition" aria-label="Previous slide"><FiChevronLeft /></button>
                    <button onClick={toggleAutoplay} className="p-2 bg-white rounded-full shadow hover:scale-105 transition" aria-label="Toggle play">{isPlaying ? <FiPause /> : <FiPlay />}</button>
                    <button onClick={nextSlide} className="p-2 bg-white rounded-full shadow hover:scale-105 transition" aria-label="Next slide"><FiChevronRight /></button>
                  </div>

                  <div className="flex items-center gap-2">
                    {heroSlides.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentSlide(idx)}
                        className={`w-2 h-2 rounded-full ${currentSlide === idx ? 'bg-white' : 'bg-white/40'} transition-transform`}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* large hero (retained your previous section but responsive) */}
      

      {/* Featured Products carousel */}
      <motion.section className="py-12 bg-white" initial="hidden" whileInView="visible" variants={sectionVariants}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Featured Products</h2>
            <p className="text-sm sm:text-base text-gray-600">Discover our handpicked selection</p>
          </div>
          <ProductCarousel products={featuredProducts} title="" autoPlay={true} interval={4000} />
        </div>
      </motion.section>

      {/* Categories grid (responsive, fixed image box) */}
<motion.section
  className="py-12 bg-gray-50"
  initial="hidden"
  whileInView="visible"
  variants={sectionVariants}
>
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-8">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Shop by Category</h2>
      <p className="text-sm sm:text-base text-gray-600">Find exactly what you're looking for</p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {categories.map((category, i) => {
        const imgs = [img1, img2, img3, img4]
        const src = imgs[i % imgs.length]
        return (
          <Link
            key={category}
            to={`/shop?category=${encodeURIComponent(category)}`}
            className="group block bg-white rounded-2xl overflow-hidden shadow hover:shadow-lg transition"
            aria-label={`Shop ${category}`}
          >
            {/* Image wrapper — uses aspect-ratio so all cards have identical image boxes */}
            <div className="w-full bg-gray-100">
              {/* 
                Preferred: aspect-ratio utility (Tailwind 3+ with aspect-ratio plugin enabled)
                - aspect-[4/3] on mobile -> slightly taller
                - sm:aspect-[16/9] for wider screens
                - lg:aspect-[4/3] to keep a nice square-ish card on large screens
              */}
              <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] lg:aspect-[4/3] overflow-hidden">
                <img
                  src={src}
                  alt={category}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              {/*
                Fallback (if you don't have the aspect-ratio utility):
                Replace the above div with:
                <div className="w-full h-44 sm:h-52 md:h-56 lg:h-44 overflow-hidden relative">
                  <img className="w-full h-full object-cover ..." />
                </div>
              */}
            </div>

            <div className="p-4 text-center">
              <h3 className="text-base font-semibold text-gray-900 capitalize">
                {category.replace("'", "")}
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                {products.filter(p => p.category === category).length} products
              </p>
            </div>
          </Link>
        )
      })}
    </div>
  </div>
</motion.section>


      {/* Best Sellers */}
      <motion.section className="py-12 bg-white" initial="hidden" whileInView="visible" variants={sectionVariants}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Best Sellers</h2>
            <p className="text-sm sm:text-base text-gray-600">Customer favorites</p>
          </div>
          <ProductCarousel products={bestSellers} title="" autoPlay={false} />
        </div>
      </motion.section>

      

      {/* New arrivals */}
      <motion.section className="py-12 bg-white" initial="hidden" whileInView="visible" variants={sectionVariants}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">New Arrivals</h2>
            <p className="text-sm sm:text-base text-gray-600">Fresh products just added</p>
          </div>
          <ProductCarousel products={newArrivals} title="" autoPlay={true} interval={3000} />
        </div>
      </motion.section>
      <motion.section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white overflow-hidden py-12 md:py-20" initial="hidden" whileInView="visible" variants={heroVariants}>
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <motion.div variants={heroItemVariants} className="text-center lg:text-left">
              <motion.h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                Discover Amazing <span className="block text-yellow-300">Products</span>
              </motion.h1>
              <motion.p className="text-lg sm:text-xl text-blue-100 mb-6" variants={heroItemVariants}>Shop the latest trends with unbeatable prices and premium quality</motion.p>

              <div className="flex justify-center lg:justify-start gap-4 flex-wrap">
                <Link to="/shop" className="inline-flex items-center px-6 py-3 bg-white text-blue-600 font-bold rounded-full shadow hover:shadow-xl transition">
                  <FiShoppingBag className="mr-2" /> Shop Now <FiArrowRight className="ml-2" />
                </Link>
                <Link to="/about" className="inline-flex items-center px-6 py-3 border-2 border-white text-white rounded-full hover:bg-white hover:text-blue-600 transition">
                  Learn More
                </Link>
              </div>
            </motion.div>

            <motion.div className="grid grid-cols-2 gap-4" variants={heroItemVariants}>
              {[{ icon: FiShoppingBag, number: '10K+', label: 'Products' }, { icon: FiStar, number: '50K+', label: 'Happy Customers' }, { icon: FiTruck, number: '24/7', label: 'Fast Delivery' }, { icon: FiShield, number: '100%', label: 'Secure' }].map((stat, i) => (
                <motion.div key={i} className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center" variants={statsVariants}>
                  <stat.icon className="mx-auto mb-2 text-yellow-300" size={26} />
                  <div className="text-lg font-bold">{stat.number}</div>
                  <div className="text-blue-100 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.section>
      
    </div>
  )
}

export default Home
