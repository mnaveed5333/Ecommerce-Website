import { motion } from 'framer-motion'
import RegisterForm from '../components/auth/RegisterForm'

const Register = () => {
  // Animation variants - matching the login page
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.3,
        when: "beforeChildren"
      }
    }
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-gray-100 py-8 sm:py-12"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-md">
        <RegisterForm />
      </div>
    </motion.div>
  )
}

export default Register