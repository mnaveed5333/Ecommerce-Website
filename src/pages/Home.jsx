﻿import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiShoppingBag,
  FiStar,
  FiTruck,
  FiShield,
  FiRefreshCw,
  FiArrowRight,
  FiGrid,
  FiAward,
  FiHeadphones,
  FiList,
  FiFilter,
  FiSearch
} from 'react-icons/fi'
import Header from '../components/common/Header'
import Footer from '../components/common/Footer'
import ProductCard from '../components/product/ProductCard'
import ProductCarousel from '../components/product/ProductCarousel'
import ProductFilter from '../components/product/ProductFilter'
import { products, categories } from '../utils/constants'

// White Color Scheme Theme
const theme = {
  background: {
    main: '#ffffff',
    secondary: '#f8fafc',
    tertiary: '#e5e7eb',
    gradient: 'linear-gradient(152deg, #ffffff 0%, #f8fafc 50%, #e5e7eb 100%)',
    card: 'linear-gradient(135deg, rgba(229, 231, 235, 0.6) 0%, rgba(248, 250, 252, 0.8) 100%)',
    glass: 'rgba(255, 255, 255, 0.7)'
  },
  accent: {
    primary: '#0ea5e9',
    primaryGradient: 'linear-gradient(135deg, #0ea5e9 0%, #38bdf8 100%)',
    secondary: '#f59e0b',
    secondaryGradient: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
    highlight: '#6b7280'
  },
  text: {
    primary: '#111827',
    secondary: '#374151',
    muted: '#6b7280',
    accent: '#0ea5e9'
  },
  border: {
    primary: '#d1d5db',
    glow: 'rgba(14, 165, 233, 0.3)',
    secondary: 'rgba(245, 158, 11, 0.3)'
  }
}

const Home = () => {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [filteredProducts, setFilteredProducts] = useState(products)
  const [viewMode, setViewMode] = useState('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024)
  const [currentFilters, setCurrentFilters] = useState({
    category: '',
    minPrice: '',
    maxPrice: '',
    inStock: false,
    onSale: false
  })

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  // Auto-change hero image every 10 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % products.length)
    }, 10000)
    return () => clearInterval(timer)
  }, [])

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

  // derived product groups
  const featuredProducts = products.slice(0, 8)
  const bestSellers = products.filter(p => p.rating?.rate >= 4.5).slice(0, 6)
  const newArrivals = products.slice(-6)

  return (
    <div className="min-h-screen" style={{ background: theme.background.gradient }}>
      

      {/* ACURA NEW PRODUCT HERO */}
      <section className="relative w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src="/Acura-New-Products-Banner-Perfume-Hut-.jpg"
            alt="Acura New Products Banner"
            className="w-full h-auto object-cover"
            loading="lazy"
          />
        </motion.div>
      </section>

      {/* Featured Products */}
      <section className="py-16" style={{ background: theme.background.secondary }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: theme.text.primary }}>Featured Products</h2>
            <p className="text-lg" style={{ color: theme.text.secondary }}>Discover our handpicked selection</p>
          </div>
          <ProductCarousel products={featuredProducts} autoPlay={true} interval={4000} />
        </div>
      </section>


      

      {/* Best Sellers */}
      <section className="py-16" style={{ background: theme.background.secondary }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: theme.text.primary }}>Best Sellers</h2>
            <p className="text-lg" style={{ color: theme.text.secondary }}>Customer favorites</p>
          </div>
          <ProductCarousel products={bestSellers} autoPlay={false} />
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-16" style={{ background: theme.background.main }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: theme.text.primary }}>New Arrivals</h2>
            <p className="text-lg" style={{ color: theme.text.secondary }}>Fresh products just added</p>
          </div>
          <ProductCarousel products={newArrivals} autoPlay={true} interval={3000} />
        </div>
      </section>
      {/* Why Choose Us */}
      <section className="py-16" style={{ background: theme.background.secondary }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: theme.text.primary }}>Why Choose Apexium</h2>
            <p className="text-lg" style={{ color: theme.text.secondary }}>Experience luxury and quality in every bottle</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: FiAward, title: 'Premium Quality', desc: 'Authentic fragrances from renowned perfumers' },
              { icon: FiShield, title: 'Secure Shopping', desc: 'Safe and encrypted transactions' },
              { icon: FiTruck, title: 'Fast Delivery', desc: 'Free shipping on orders over $75' },
              { icon: FiHeadphones, title: 'Expert Support', desc: '24/7 customer care assistance' }
            ].map((feature, i) => (
              <motion.div
                key={i}
                className="text-center p-6 rounded-xl"
                style={{ background: theme.background.card, border: `1px solid ${theme.border.primary}` }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ scale: 1.05, boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
              >
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: theme.accent.primaryGradient }}>
                  <feature.icon className="w-8 h-8" style={{ color: theme.text.primary }} />
                </div>
                <h3 className="text-xl font-semibold mb-2" style={{ color: theme.text.primary }}>{feature.title}</h3>
                <p style={{ color: theme.text.secondary }}>{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home