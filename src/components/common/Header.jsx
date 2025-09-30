import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiShoppingCart,
  FiUser,
  FiHeart,
  FiSearch,
  FiHome,
  FiShoppingBag,
  FiInfo,
  FiMail,
  FiLogOut,
  FiPhone,
  FiMapPin,
  FiChevronDown,
  FiX
} from 'react-icons/fi'
import { HiOutlineShoppingBag } from 'react-icons/hi'
import { useAuth } from '../../context/AuthContext'
import { useCart } from '../../context/CartContext'
import { useHeader } from '../../context/HeaderContext'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const [isAccountOpen, setIsAccountOpen] = useState(false)
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200)
  const searchInputRef = useRef(null)
  const accountBtnRef = useRef(null)
  const accountDropdownRef = useRef(null)

  const { user, logout } = useAuth()
  const { getCartItemsCount } = useCart()
  const { headerConfig } = useHeader()
  const navigate = useNavigate()
  const location = useLocation()

  const cartCount = typeof getCartItemsCount === 'function' ? getCartItemsCount() : 0

  // Track window width for responsive behavior
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current.focus(), 80)
    }
  }, [isSearchOpen])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        isAccountOpen &&
        accountDropdownRef.current &&
        !accountDropdownRef.current.contains(e.target) &&
        accountBtnRef.current &&
        !accountBtnRef.current.contains(e.target)
      ) {
        setIsAccountOpen(false)
      }
    }

    const handleEscape = (e) => {
      if (e.key === 'Escape') setIsAccountOpen(false)
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('touchstart', handleClickOutside)
    document.addEventListener('keyup', handleEscape)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
      document.removeEventListener('keyup', handleEscape)
    }
  }, [isAccountOpen])

  const handleSearch = (e) => {
    e?.preventDefault?.()
    const q = searchQuery.trim()
    if (q) {
      navigate(`/shop?search=${encodeURIComponent(q)}`)
      setSearchQuery('')
      setIsMenuOpen(false)
      setIsSearchOpen(false)
    } else {
      navigate('/shop')
      setIsMenuOpen(false)
      setIsSearchOpen(false)
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/')
    setIsMenuOpen(false)
    setIsAccountOpen(false)
  }

  // Determine which elements to show based on screen width
  const showFullNav = windowWidth >= 1024 // lg breakpoint
  const showIconsOnly = windowWidth >= 475 && windowWidth < 1024 // xs to lg
  const showMinimalUI = windowWidth < 475 // xs

  // Motion variants
  const navItem = {
    hidden: { opacity: 0, y: -8 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2, type: 'spring', stiffness: 200 } }
  }
  const navList = {
    visible: { transition: { staggerChildren: 0.05 } }
  }
  const mobileMenuVariants = {
    hidden: { x: '-100%', opacity: 0 },
    visible: { x: '0%', opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 28 } },
    exit: { x: '-100%', opacity: 0, transition: { duration: 0.2 } }
  }
  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.15, type: 'spring', stiffness: 200 } },
    exit: { opacity: 0, y: -10, scale: 0.95, transition: { duration: 0.1 } }
  }
  const searchOverlayVariants = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.2, type: 'spring', stiffness: 200 } },
    exit: { opacity: 0, scale: 0.98, transition: { duration: 0.15 } }
  }

  // Custom 3-line hamburger icon for menu (all longer)
  const HamburgerIcon = ({ size = 24, className }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  )

  // Custom close icon
  const CloseIcon = ({ size = 24, className }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )

  return (
    <>

      {/* Main Header */}
      <header
        className={`sticky top-0 z-50 w-full bg-gradient-to-b from-white to-gray-50 transition-all duration-300 ${scrolled ? 'shadow-sm' : ''}`}
        aria-label="Main header"
      >
        <div className="max-w-7xl mx-auto px-2 xs:px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12 xs:h-14 sm:h-16">
            {/* Left: logo + mobile hamburger */}
            <div className="flex items-center gap-1 xs:gap-2 sm:gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMenuOpen((s) => !s)}
                className="p-1.5 xs:p-2 rounded-full border border-transparent hover:border-blue-500 transition-all duration-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black"
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen ? (
                  <CloseIcon size={showMinimalUI ? 18 : 20} className="text-black" />
                ) : (
                  <HamburgerIcon size={showMinimalUI ? 18 : 20} className="text-black" />
                )}
              </motion.button>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Link to="/" className="flex items-center gap-1 xs:gap-2" aria-label="Go to homepage">
                  <div className="w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 rounded-full bg-black flex items-center justify-center shadow-md">
                    <HiOutlineShoppingBag className="text-white" size={showMinimalUI ? 16 : 18} />
                  </div>
                  {windowWidth >= 350 && (
                    <span className="text-base xs:text-lg sm:text-xl font-bold text-black tracking-tight">Apexium Perfume</span>
                  )}
                </Link>
              </motion.div>
            </div>

            {/* Center: Desktop search */}
            {showFullNav && (
              <div className="flex items-center justify-center flex-1 px-4">
                {/* Search (desktop) */}
                <motion.form
                  onSubmit={handleSearch}
                  className="flex items-center bg-white border border-gray-200 rounded-lg px-3 py-2 shadow-sm hover:shadow-md transition-shadow max-w-md w-full"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <FiSearch className="text-gray-400 mr-2" size={18} />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400"
                  />
                  <motion.button
                    type="submit"
                    className="ml-2 p-1 rounded-md bg-black text-white hover:bg-gray-800 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Search"
                  >
                    <FiSearch size={14} />
                  </motion.button>
                </motion.form>
              </div>
            )}

            {/* Right actions */}
            <div className="flex items-center gap-1 xs:gap-2 sm:gap-3">

              {/* Search button (mobile) */}
              {!showFullNav && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsSearchOpen(true)}
                  className="p-1.5 xs:p-2 rounded-full border border-transparent hover:border-blue-500 transition-all duration-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black"
                  aria-label="Search"
                >
                  <FiSearch size={showMinimalUI ? 18 : 20} className="text-black hover:text-gray-900" />
                </motion.button>
              )}

              {/* Wishlist */}
              <Link
                to="/wishlist"
                className="p-1.5 xs:p-2 rounded-full border border-transparent hover:border-blue-500 transition-all duration-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black"
                aria-label="Wishlist"
              >
                <FiHeart size={showMinimalUI ? 18 : 20} className="text-black hover:text-gray-900" />
              </Link>

              {/* Cart with badge */}
              <Link
                to="/cart"
                className="relative p-1.5 xs:p-2 rounded-full border border-transparent hover:border-blue-500 transition-all duration-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black"
                aria-label="Cart"
              >
                <FiShoppingCart size={showMinimalUI ? 18 : 20} className="text-black hover:text-gray-900" />
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 600, damping: 15 }}
                    className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full h-4 w-4 xs:h-5 xs:w-5 flex items-center justify-center shadow-sm"
                    aria-live="polite"
                    aria-label={`${cartCount} items in cart`}
                  >
                    {cartCount > 9 ? '9+' : cartCount}
                  </motion.span>
                )}
              </Link>

              {/* User dropdown / auth links */}
              {user ? (
                windowWidth >= 475 && (
                  <div className="relative">
                    <motion.button
                      ref={accountBtnRef}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsAccountOpen((s) => !s)}
                      className="hidden sm:flex items-center gap-1.5 xs:gap-2 px-2 xs:px-3 py-1.5 rounded-lg border border-transparent hover:border-blue-500 transition-all duration-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black"
                      aria-label="User menu"
                      aria-haspopup="true"
                      aria-expanded={isAccountOpen}
                    >
                      <FiUser size={showMinimalUI ? 16 : 18} className="text-black hover:text-gray-900" />
                      {windowWidth >= 768 && (
                        <>
                          <span className="text-sm font-medium text-black">{user.name || 'Account'}</span>
                          <FiChevronDown size={14} className="text-gray-500" />
                        </>
                      )}
                    </motion.button>

                    <AnimatePresence>
                      {isAccountOpen && (
                        <motion.div
                          ref={accountDropdownRef}
                          className="absolute right-0 mt-2 w-48 bg-white rounded-lg border border-gray-200 shadow-lg py-1.5 z-50"
                          initial="hidden"
                          animate="visible"
                          exit="hidden"
                          variants={dropdownVariants}
                          role="menu"
                          aria-label="Account menu"
                        >
                          {[
                            { to: '/account', label: 'My Account' },
                            { to: '/orders', label: 'Orders' }
                          ].map(({ to, label }) => (
                            <Link
                              key={to}
                              to={to}
                              onClick={() => setIsAccountOpen(false)}
                              className="block px-4 py-2 text-sm text-black hover:bg-gray-50 hover:text-gray-900 transition-all duration-300"
                              role="menuitem"
                            >
                              {label}
                            </Link>
                          ))}
                          <button
                            onClick={handleLogout}
                            className="w-full text-left px-4 py-2 text-sm text-black hover:bg-gray-50 hover:text-gray-900 transition-all duration-300"
                            role="menuitem"
                          >
                            Logout
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              ) : windowWidth >= 475 ? (
                <div className="hidden sm:flex items-center gap-2 xs:gap-3">
                  <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      to="/login"
                      className="text-sm text-black hover:text-gray-900 font-medium border border-transparent hover:border-blue-500 transition-all duration-300 px-2 py-1 rounded-md"
                    >
                      Login
                    </Link>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      to="/register"
                      className="px-3 xs:px-4 py-1.5 bg-black text-white rounded-lg text-sm font-medium shadow-md hover:bg-gray-800 border border-transparent hover:border-blue-500 transition-all duration-300"
                    >
                      Register
                    </Link>
                  </motion.div>
                </div>
              ) : null}
            </div>
          </div>
        </div>

        {/* Mobile slide-out menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.aside
              className="fixed inset-y-0 left-0 z-50 w-[240px] xs:w-[260px] bg-gradient-to-b from-white to-gray-50 border-r border-gray-200 shadow-lg"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={mobileMenuVariants}
            >
              <div className="h-12 xs:h-14 sm:h-16 flex items-center justify-between px-4 border-b border-gray-200">
                <Link to="/" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2">
                  <div className="w-8 h-8 xs:w-9 xs:h-9 rounded-full bg-black flex items-center justify-center">
                    <HiOutlineShoppingBag className="text-white" size={18} />
                  </div>
                  <span className="font-bold text-black">Apexium Perfume</span>
                </Link>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 rounded-full border border-transparent hover:border-blue-500 transition-all duration-300 hover:bg-gray-50"
                >
                  <CloseIcon size={20} className="text-black" />
                </motion.button>
              </div>

              <motion.nav
                className="p-4 space-y-1 overflow-y-auto h-[calc(100%-3rem)] xs:h-[calc(100%-3.5rem)] sm:h-[calc(100%-4rem)]"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={{ visible: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } } }}
              >
                {[
                  { to: '/', icon: FiHome, label: 'Home' },
                  { to: '/shop', icon: FiShoppingBag, label: 'Shop' },
                  { to: '/about', icon: FiInfo, label: 'About' },
                  { to: '/contact', icon: FiMail, label: 'Contact' }
                ].map(({ to, icon: Icon, label }) => (
                  <motion.div key={to} variants={navItem}>
                    <Link
                      to={to}
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-black hover:text-gray-900 hover:bg-gray-50 border border-transparent hover:border-blue-500 transition-all duration-300"
                    >
                      <Icon size={20} /> <span className="font-medium">{label}</span>
                    </Link>
                  </motion.div>
                ))}

                <div className="border-t border-gray-200 mt-4 pt-4 space-y-1">
                  {user ? (
                    <>
                      {[
                        { to: '/account', icon: FiUser, label: 'Account' },
                        { to: '/orders', icon: FiShoppingBag, label: 'Orders' }
                      ].map(({ to, icon: Icon, label }) => (
                        <motion.div key={to} variants={navItem}>
                          <Link
                            to={to}
                            onClick={() => setIsMenuOpen(false)}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-black hover:text-gray-900 hover:bg-gray-50 border border-transparent hover:border-blue-500 transition-all duration-300"
                          >
                            <Icon size={20} /> <span className="font-medium">{label}</span>
                          </Link>
                        </motion.div>
                      ))}
                      <motion.div variants={navItem}>
                        <button
                          onClick={() => { handleLogout(); setIsMenuOpen(false) }}
                          className="w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-lg text-black hover:text-gray-900 hover:bg-gray-50 border border-transparent hover:border-blue-500 transition-all duration-300"
                        >
                          <FiLogOut size={20} /> <span className="font-medium">Logout</span>
                        </button>
                      </motion.div>
                    </>
                  ) : (
                    <>
                      <motion.div variants={navItem}>
                        <Link
                          to="/login"
                          onClick={() => setIsMenuOpen(false)}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-black hover:text-gray-900 hover:bg-gray-50 border border-transparent hover:border-blue-500 transition-all duration-300"
                        >
                          <FiUser size={20} /> <span className="font-medium">Login</span>
                        </Link>
                      </motion.div>
                      <motion.div variants={navItem}>
                        <Link
                          to="/register"
                          onClick={() => setIsMenuOpen(false)}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-black text-white hover:bg-gray-800 border border-transparent hover:border-blue-500 transition-all duration-300"
                        >
                          <FiUser size={20} /> <span className="font-medium">Register</span>
                        </Link>
                      </motion.div>
                    </>
                  )}
                </div>
              </motion.nav>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Mobile Search overlay */}
        <AnimatePresence>
          {isSearchOpen && !showFullNav && (
            <motion.div
              className="fixed inset-0 z-50 bg-white flex items-center justify-center px-4"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={searchOverlayVariants}
            >
              <div className="w-full max-w-md">
                <div className="relative">
                  <div className="flex items-center bg-gray-100 border border-gray-200 rounded-lg px-4 py-3 shadow-sm">
                    <FiSearch className="text-gray-400 mr-3" size={20} />
                    <input
                      ref={searchInputRef}
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="flex-1 bg-transparent outline-none text-base text-gray-700 placeholder-gray-400"
                      autoFocus
                    />
                    <motion.button
                      type="button"
                      onClick={() => {
                        setIsSearchOpen(false)
                        setSearchQuery('')
                      }}
                      className="ml-3 p-1 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      aria-label="Close search"
                    >
                      <FiX size={16} />
                    </motion.button>
                  </div>
                  <motion.button
                    onClick={handleSearch}
                    className="w-full mt-4 bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Search
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </header>
    </>
  )
}

export default Header