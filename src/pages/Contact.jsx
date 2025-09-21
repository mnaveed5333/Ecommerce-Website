import { useState } from 'react'
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi'
import { motion } from 'framer-motion'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    alert('Thank you for your message! We\'ll get back to you soon.')
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  // Animation variants
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
    hover: { 
      scale: 1.05,
      boxShadow: "0 4px 15px rgba(37, 99, 235, 0.3)",
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.95 }
  }

  const inputVariants = {
    focus: { 
      scale: 1.02,
      boxShadow: "0 0 0 3px rgba(37, 99, 235, 0.1)"
    }
  }

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-gray-100"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <motion.div 
          variants={itemVariants}
          className="text-center mb-12"
        >
          <h1 className="text-3xl sm:text-4xl font-semibold text-gray-800 mb-4">
            Contact Us
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Have questions or need assistance? We're here to help. Get in touch with our team.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Contact Information */}
          <motion.div 
            variants={itemVariants}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6">
                Get in Touch
              </h2>
              
              <div className="space-y-6">
                <motion.div 
                  variants={itemVariants}
                  className="flex items-start space-x-4"
                >
                  <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
                    <FiMail className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Email</h3>
                    <p className="text-gray-600 text-sm">
                      support@ecomstore.com
                    </p>
                    <p className="text-gray-600 text-sm">
                      sales@ecomstore.com
                    </p>
                  </div>
                </motion.div>

                <motion.div 
                  variants={itemVariants}
                  className="flex items-start space-x-4"
                >
                  <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center flex-shrink-0">
                    <FiPhone className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Phone</h3>
                    <p className="text-gray-600 text-sm">
                      +1 (555) 123-4567
                    </p>
                    <p className="text-gray-600 text-sm">
                      Mon-Fri: 8AM-8PM EST
                    </p>
                  </div>
                </motion.div>

                <motion.div 
                  variants={itemVariants}
                  className="flex items-start space-x-4"
                >
                  <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center flex-shrink-0">
                    <FiMapPin className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Address</h3>
                    <p className="text-gray-600 text-sm">
                      123 Commerce Street<br />
                      Suite 456<br />
                      New York, NY 10001
                    </p>
                  </div>
                </motion.div>
              </div>

              <motion.div 
                variants={itemVariants}
                className="mt-8 pt-6 border-t border-gray-200"
              >
                <h3 className="font-semibold text-gray-800 mb-3">Business Hours</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monday - Friday</span>
                    <span className="font-medium text-gray-800">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Saturday</span>
                    <span className="font-medium text-gray-800">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sunday</span>
                    <span className="font-medium text-gray-800">Closed</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            variants={itemVariants}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6">
                Send us a Message
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <motion.div variants={itemVariants} className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Your Name *
                    </label>
                    <motion.input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder-gray-400 transition-all duration-200"
                      variants={inputVariants}
                      whileFocus="focus"
                    />
                  </motion.div>
                  
                  <motion.div variants={itemVariants} className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email Address *
                    </label>
                    <motion.input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder-gray-400 transition-all duration-200"
                      variants={inputVariants}
                      whileFocus="focus"
                    />
                  </motion.div>
                </div>
                
                <motion.div variants={itemVariants} className="space-y-2">
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                    Subject *
                  </label>
                  <motion.input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder-gray-400 transition-all duration-200"
                    variants={inputVariants}
                    whileFocus="focus"
                  />
                </motion.div>
                
                <motion.div variants={itemVariants} className="space-y-2">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                    Message *
                  </label>
                  <motion.textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder-gray-400 transition-all duration-200"
                    variants={inputVariants}
                    whileFocus="focus"
                  />
                </motion.div>
                
                <motion.button
                  type="submit"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="relative w-full flex items-center justify-center space-x-2 bg-blue-600 text-white py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-200 group"
                >
                  <FiSend size={18} />
                  <span>Send Message</span>
                  <span className="absolute hidden -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded-md group-hover:block">
                    Submit
                  </span>
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <motion.div 
          variants={itemVariants}
          className="mt-12 sm:mt-16"
        >
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {[
              {
                question: "How long does shipping take?",
                answer: "Standard shipping takes 3-5 business days. Express shipping is available for 1-2 business days."
              },
              {
                question: "What is your return policy?",
                answer: "We offer a 30-day return policy for unused items in original packaging. Some restrictions apply."
              },
              {
                question: "Do you ship internationally?",
                answer: "Yes, we ship to over 50 countries worldwide. Shipping costs and times vary by location."
              },
              {
                question: "How can I track my order?",
                answer: "You'll receive a tracking number via email once your order ships. You can also track it from your account."
              }
            ].map((faq, index) => (
              <motion.div 
                key={index} 
                variants={itemVariants}
                className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-200"
              >
                <h3 className="font-semibold text-gray-800 mb-2">{faq.question}</h3>
                <p className="text-gray-600 text-sm">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default Contact