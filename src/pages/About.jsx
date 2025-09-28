import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiTruck, FiShield, FiHeadphones, FiAward } from 'react-icons/fi'
import { products } from '../utils/constants'

// White Theme Palette (same as Home.jsx)
const theme = {
  background: {
    main: '#ffffff',        // pure white
    secondary: '#f8fafc',   // off-white
    tertiary: '#e5e7eb',    // light gray
    gradient: 'linear-gradient(152deg, #ffffff 0%, #f8fafc 50%, #e5e7eb 100%)',
    card: 'linear-gradient(135deg, rgba(229, 231, 235, 0.6) 0%, rgba(248, 250, 252, 0.8) 100%)',
    glass: 'rgba(255, 255, 255, 0.7)'
  },
  accent: {
    primary: '#0ea5e9',     // teal
    primaryGradient: 'linear-gradient(135deg, #0ea5e9 0%, #38bdf8 100%)',
    secondary: '#f59e0b',   // amber
    secondaryGradient: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
    highlight: '#6b7280'    // gray for contrast
  },
  text: {
    primary: '#111827',     // dark gray
    secondary: '#374151',   // medium gray
    muted: '#6b7280',       // light gray
    accent: '#0ea5e9'       // teal
  },
  border: {
    primary: '#d1d5db',
    glow: 'rgba(14, 165, 233, 0.3)',
    secondary: 'rgba(245, 158, 11, 0.3)'
  }
}

// Framer Motion variants for animations
const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } }
}

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, delay: i * 0.1 }
  })
}

const buttonVariants = {
  hover: { scale: 1.05, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)' },
  tap: { scale: 0.95 }
}

const About = () => {
  const values = [
    {
      icon: FiAward,
      title: 'Authenticity',
      description: '100% genuine fragrances from world-renowned perfumers.'
    },
    {
      icon: FiShield,
      title: 'Sustainability',
      description: 'Eco-conscious sourcing and packaging for a greener future.'
    },
    {
      icon: FiTruck,
      title: 'Fast Shipping',
      description: 'Complimentary delivery on orders over $75.'
    },
    {
      icon: FiHeadphones,
      title: 'Customer Care',
      description: 'Dedicated support to ensure a seamless experience.'
    }
  ]

  return (
    <div className="min-h-screen" style={{ background: theme.background.gradient }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-12 relative"
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
        >
          <motion.div
            className="absolute inset-0"
            animate={{ opacity: [0.2, 0.3, 0.2] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="w-64 h-64 bg-gradient-to-br from-teal-100 to-amber-100 rounded-full opacity-20 blur-3xl mx-auto" />
          </motion.div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3" style={{ color: theme.text.primary }}>
            About Apexium
          </h1>
          <p className="text-lg max-w-xl mx-auto" style={{ color: theme.text.secondary }}>
            Crafting unforgettable scent experiences with passion and precision.
          </p>
        </motion.div>

        {/* Story Section */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-12"
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
        >
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4" style={{ color: theme.text.primary }}>
              Our Heritage
            </h2>
            <div className="space-y-3" style={{ color: theme.text.secondary }}>
              <p>
                Established in 2020, Apexium emerged from a deep love for the art of perfumery. Our founders, inspired by the timeless elegance of fine fragrances, set out to create a platform that celebrates scent as an expression of individuality.
              </p>
              <p>
                We collaborate with master perfumers and iconic fragrance houses worldwide, curating a collection that blends tradition with innovation. Each perfume in our catalog is chosen for its craftsmanship, authenticity, and ability to evoke emotion.
              </p>
              <p>
                From our headquarters to your doorstep, Apexium is dedicated to delivering luxury with integrity, offering fast shipping, a 30-day satisfaction guarantee, and personalized customer service to scent enthusiasts everywhere.
              </p>
            </div>
          </div>
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            custom={0}
          >
            <img
              src="https://tse1.mm.bing.net/th/id/OIP.Mhqab88amJQlPgg8Wt6nLAHaE8?w=735&h=490&rs=1&pid=ImgDetMain&o=7&rm=3"
              alt="Apexium Heritage"
              className="w-full h-96 object-cover rounded-lg shadow-md"
              style={{ border: `1px solid ${theme.border.glow}` }}
            />
          </motion.div>
        </motion.div>

        {/* Craftsmanship Section */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-12"
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
        >
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            custom={0}
          >
            <img
              src="https://tse2.mm.bing.net/th/id/OIP.7LsGcHzEVrrLfIPnpYGozgHaE5?rs=1&pid=ImgDetMain&o=7&rm=3"
              alt="Perfume Craftsmanship"
              className="w-full h-96 object-cover rounded-lg shadow-md"
              style={{ border: `1px solid ${theme.border.glow}` }}
            />
          </motion.div>
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4" style={{ color: theme.text.primary }}>
              Our Craftsmanship
            </h2>
            <div className="space-y-3" style={{ color: theme.text.secondary }}>
              <p>
                At Apexium, every fragrance tells a story. Our perfumes are crafted by artisans who blend rare ingredients with meticulous care, creating scents that capture moments and memories.
              </p>
              <p>
                From the delicate extraction of floral essences to the aging of woody notes, our partners employ centuries-old techniques alongside modern innovation to ensure unparalleled quality.
              </p>
              <p>
                We believe a fragrance is more than a scent—it’s an experience. Explore our collection to find a perfume that resonates with your unique essence.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Values Section */}
        <motion.div
          className="mb-12"
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8" style={{ color: theme.text.primary }}>
            Our Values
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="text-center p-4 rounded-lg"
                style={{ background: theme.background.card, border: `1px solid ${theme.border.primary}` }}
                custom={index}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ scale: 1.03 }}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3"
                  style={{ background: theme.accent.primaryGradient }}
                >
                  <value.icon className="w-6 h-6" style={{ color: theme.text.primary }} />
                </div>
                <h3 className="text-base font-semibold" style={{ color: theme.text.primary }}>
                  {value.title}
                </h3>
                <p className="text-sm" style={{ color: theme.text.muted }}>
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div
          className="mb-12"
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8" style={{ color: theme.text.primary }}>
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { "name": "Ayesha Khan", "role": "Founder & CEO", "image": "https://tse4.mm.bing.net/th/id/OIP.rQyNNq4U8VRT1GxFSFOo1gHaIV?rs=1&pid=ImgDetMain&o=7&rm=3" },
  { "name": "Ali Raza", "role": "Head of Operations", "image": "https://tse2.mm.bing.net/th/id/OIP.VLPCc2pDcElZL8NoTkX29QHaLH?pid=ImgDet&w=191&h=286&c=7&o=7&rm=3" },
  { "name": "Fatima Iqbal", "role": "Customer Experience", "image": "https://tse4.mm.bing.net/th/id/OIP.TauDG2cBIBLQLIpbDcyw2gHaJs?pid=ImgDet&w=191&h=249&c=7&o=7&rm=3" },
  { "name": "Hamza Siddiqui", "role": "Product Curator", "image": "https://tse2.mm.bing.net/th/id/OIP.3Hamzh7tzJMIMkDrHXNkoAHaLG?pid=ImgDet&w=191&h=286&c=7&o=7&rm=3" },
  { "name": "Sara Malik", "role": "Marketing Director", "image": "https://tse2.mm.bing.net/th/id/OIP.uUt-wA2fTEMJOQDyTfYOdAHaJQ?pid=ImgDet&w=191&h=238&c=7&o=7&rm=3" },
  { "name": "Usman Ahmed", "role": "Tech Lead", "image": "https://tse2.mm.bing.net/th/id/OIP.QUbZk9g0uZQLb-eS-A9HUgAAAA?pid=ImgDet&w=191&h=254&c=7&o=7&rm=3" }
            ].map((member, index) => (
              <motion.div
                key={index}
                className="text-center group relative p-4 rounded-lg"
                style={{ background: theme.background.card, border: `1px solid ${theme.border.primary}` }}
                custom={index}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ scale: 1.03 }}
              >
                <motion.img
                  src={member.image}
                  alt={member.name}
                  className="w-20 h-20 rounded-full mx-auto mb-3 object-cover shadow-sm"
                  style={{ border: `2px solid ${theme.border.glow}` }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                />
                <h3 className="text-base font-semibold" style={{ color: theme.text.primary }}>
                  {member.name}
                </h3>
                <p className="text-sm" style={{ color: theme.text.muted }}>
                  {member.role}
                </p>
                <p className="text-xs mt-1" style={{ color: theme.text.secondary }}>
                  {member.bio}
                </p>
                <span
                  className="absolute bottom-full mb-2 hidden group-hover:block text-xs rounded py-1 px-2"
                  style={{ background: theme.background.glass, color: theme.text.primary, boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}
                >
                  {member.bio}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center"
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-4" style={{ color: theme.text.primary }}>
            Join Our Fragrance Journey
          </h2>
          <p className="text-base mb-6 max-w-md mx-auto" style={{ color: theme.text.secondary }}>
            Become part of Apexium’s community and discover scents that define you.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <motion.div
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              transition={{ duration: 0.2 }}
              className="group relative"
            >
              <Link
                to="/shop"
                className="inline-flex items-center justify-center px-6 py-2 rounded-lg font-medium shadow-sm"
                style={{ background: theme.accent.primaryGradient, color: theme.text.primary }}
                aria-label="Browse our perfume collection"
              >
                Explore Perfumes
                <span
                  className="absolute bottom-full mb-2 hidden group-hover:block text-xs rounded py-1 px-2 left-1/2 transform -translate-x-1/2"
                  style={{ background: theme.background.glass, color: theme.text.primary }}
                >
                  Find Your Scent
                </span>
              </Link>
            </motion.div>
            <motion.div
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              transition={{ duration: 0.2 }}
              className="group relative"
            >
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-6 py-2 rounded-lg font-medium border"
                style={{ borderColor: theme.accent.primary, color: theme.text.accent, background: 'transparent' }}
                aria-label="Contact Apexium"
              >
                Get in Touch
                <span
                  className="absolute bottom-full mb-2 hidden group-hover:block text-xs rounded py-1 px-2 left-1/2 transform -translate-x-1/2"
                  style={{ background: theme.background.glass, color: theme.text.primary }}
                >
                  Reach Out
                </span>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default About