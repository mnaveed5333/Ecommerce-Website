import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiTruck, FiShield, FiHeadphones, FiAward } from 'react-icons/fi'

const About = () => {
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
    hover: { scale: 1.05, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' },
    tap: { scale: 0.95 }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 py-12">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About Our Store</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're committed to providing you with the best products and shopping experience.
          </p>
        </motion.div>

        {/* Story Section */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16"
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
        >
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Founded in 2020, our e-commerce store started with a simple mission: to make online shopping
                accessible, enjoyable, and trustworthy for everyone. What began as a small team of passionate
                individuals has grown into a thriving community of customers who value quality and service.
              </p>
              <p>
                We carefully curate our product selection to ensure that every item meets our high standards
                for quality, sustainability, and value. Our team works directly with manufacturers and artisans
                to bring you unique products that you won't find anywhere else.
              </p>
              <p>
                Today, we serve customers across the country with fast shipping, easy returns, and exceptional
                customer service. We're constantly evolving and improving to meet your needs and exceed your
                expectations.
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
              src="https://img.freepik.com/premium-photo/computer-with-boxes-top-box-boxes-table_655090-98653.jpg"
              alt="Our Store"
              className="w-full h-96 object-cover rounded-xl shadow-lg"
            />
          </motion.div>
        </motion.div>

        
        {/* Team Section */}
        <motion.div
          className="mb-16"
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
        >
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                className="text-center group relative"
                custom={index}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover shadow-md"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                />
                <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
                <span className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-900 text-white text-xs rounded py-1 px-2">
                  {member.role}
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
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Join Our Community</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Become part of our growing family of satisfied customers who trust us for their shopping needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              transition={{ duration: 0.2 }}
              className="group relative"
            >
              <Link
                to="/shop"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 shadow-md transition-colors inline-block"
              >
                Start Shopping
                <span className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-900 text-white text-xs rounded py-1 px-2 left-1/2 transform -translate-x-1/2">
                  Browse our products
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
                className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 transition-colors inline-block"
              >
                Contact Us
                <span className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-900 text-white text-xs rounded py-1 px-2 left-1/2 transform -translate-x-1/2">
                  Get in touch
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
