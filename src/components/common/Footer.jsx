import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiFacebook, FiTwitter, FiInstagram, FiYoutube } from 'react-icons/fi'
import { FaCcVisa, FaCcMastercard, FaCcPaypal, FaCcAmex } from 'react-icons/fa'

const Footer = () => {
  // Motion variants for animations
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } }
  }

  const linkVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    hover: { x: 5, color: '#4f46e5' }
  }

  const iconVariants = {
    hover: { scale: 1.2, color: '#4f46e5', transition: { duration: 0.2 } }
  }

  return (
    <footer className="bg-gray-50 z-1 text-gray-900 mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Company Info */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={sectionVariants}
          >
            <h3 className="text-xl font-bold mb-4 text-gray-900">Apexium</h3>
            <p className="text-gray-600 mb-4 text-sm leading-relaxed">
              Your one-stop shop for all your needs. We offer quality products at affordable prices.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: FiFacebook, href: '#', label: 'Facebook' },
                { icon: FiTwitter, href: '#', label: 'Twitter' },
                { icon: FiInstagram, href: '#', label: 'Instagram' },
                { icon: FiYoutube, href: '#', label: 'YouTube' }
              ].map(({ icon: Icon, href, label }, index) => (
                <motion.a
                  key={index}
                  href={href}
                  className="text-gray-500 hover:text-indigo-600 transition-colors"
                  aria-label={label}
                  whileHover="hover"
                  variants={iconVariants}
                >
                  <Icon size={20} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={sectionVariants}
          >
            <h4 className="text-lg font-semibold mb-4 text-gray-900">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { to: '/', label: 'Home' },
                { to: '/shop', label: 'Shop' },
                { to: '/about', label: 'About Us' },
                { to: '/contact', label: 'Contact' }
              ].map(({ to, label }, index) => (
                <motion.li
                  key={index}
                  variants={linkVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                >
                  <Link to={to} className="text-gray-600 hover:text-indigo-600 text-sm font-medium transition-colors">
                    {label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Customer Service */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={sectionVariants}
          >
            <h4 className="text-lg font-semibold mb-4 text-gray-900">Customer Service</h4>
            <ul className="space-y-2">
              {[
                { href: '#', label: 'FAQ' },
                { href: '#', label: 'Returns & Refunds' },
                { href: '#', label: 'Shipping Info' },
                { href: '#', label: 'Privacy Policy' },
                { href: '#', label: 'Terms of Service' }
              ].map(({ href, label }, index) => (
                <motion.li
                  key={index}
                  variants={linkVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                >
                  <a href={href} className="text-gray-600 hover:text-indigo-600 text-sm font-medium transition-colors">
                    {label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter */}
          

        </div>

        <motion.div
          className="border-t border-gray-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <p className="text-gray-600 text-sm">
            © {new Date().getFullYear()} Apexium Perfume. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            {[
              { icon: FaCcVisa, alt: 'Visa' },
              { icon: FaCcMastercard, alt: 'Mastercard' },
              { icon: FaCcPaypal, alt: 'PayPal' },
              { icon: FaCcAmex, alt: 'American Express' }
            ].map(({ icon: Icon, alt }, index) => (
              <motion.div
                key={index}
                className="opacity-80 hover:opacity-100"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                <Icon size={24} className="text-gray-600" aria-label={alt} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer