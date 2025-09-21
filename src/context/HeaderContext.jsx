import { createContext, useContext, useState } from 'react'

const HeaderContext = createContext()

export const useHeader = () => {
  const context = useContext(HeaderContext)
  if (!context) {
    throw new Error('useHeader must be used within a HeaderProvider')
  }
  return context
}

export const HeaderProvider = ({ children }) => {
  const [headerConfig, setHeaderConfig] = useState({
    // Header styling - matching hero section gradients
    backgroundColor: 'white',
    textColor: 'gray-900',
    topBarGradient: 'from-indigo-900 to-purple-800',
    showTopBar: true,
    transparent: false,

    // Logo styling
    logoBackground: 'bg-gradient-to-br from-indigo-500 to-purple-500',
    logoTextColor: 'text-gray-900',
    logoText: 'StyleHub',

    // Header background states - matching hero section
    headerBackground: 'bg-gradient-to-r from-blue-600 via-sky-600 to-indigo-700',
    headerBackgroundScrolled: 'bg-white',

    // Contact information for top bar
    contactInfo: {
      phone: '+1 (555) 123-4567',
      email: 'support@stylehub.com',
      address: '123 Fashion St, New York, NY'
    }
  })

  const updateHeaderConfig = (config) => {
    setHeaderConfig(prev => ({ ...prev, ...config }))
  }

  const resetHeaderConfig = () => {
    setHeaderConfig({
      // Header styling - matching hero section gradients
      backgroundColor: 'white',
      textColor: 'gray-900',
      topBarGradient: 'from-indigo-900 to-purple-800',
      showTopBar: true,
      transparent: false,

      // Logo styling
      logoBackground: 'bg-gradient-to-br from-indigo-500 to-purple-500',
      logoTextColor: 'text-gray-900',
      logoText: 'StyleHub',

      // Header background states - matching hero section
      headerBackground: 'bg-gradient-to-r from-blue-600 via-sky-600 to-indigo-700',
      headerBackgroundScrolled: 'bg-white',

      // Contact information for top bar
      contactInfo: {
        phone: '+1 (555) 123-4567',
        email: 'support@stylehub.com',
        address: '123 Fashion St, New York, NY'
      }
    })
  }

  const value = {
    headerConfig,
    updateHeaderConfig,
    resetHeaderConfig
  }

  return (
    <HeaderContext.Provider value={value}>
      {children}
    </HeaderContext.Provider>
  )
}

export default HeaderContext
