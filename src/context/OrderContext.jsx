import { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from './AuthContext'

const OrderContext = createContext()

export const useOrder = () => {
  const context = useContext(OrderContext)
  if (!context) {
    throw new Error('useOrder must be used within an OrderProvider')
  }
  return context
}

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      loadOrders()
    }
  }, [user])

  const loadOrders = async () => {
    setLoading(true)
    try {
      // In a real app, this would be an API call
      const savedOrders = localStorage.getItem(`orders_${user.id}`)
      if (savedOrders) {
        setOrders(JSON.parse(savedOrders))
      }
    } catch (error) {
      console.error('Failed to load orders:', error)
    } finally {
      setLoading(false)
    }
  }

  const createOrder = (orderData) => {
    const newOrder = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      status: 'processing',
      ...orderData
    }
    
    const updatedOrders = [newOrder, ...orders]
    setOrders(updatedOrders)
    
    if (user) {
      localStorage.setItem(`orders_${user.id}`, JSON.stringify(updatedOrders))
    }
    
    return newOrder
  }

  const getOrder = (orderId) => {
    return orders.find(order => order.id === orderId)
  }

  const value = {
    orders,
    loading,
    createOrder,
    getOrder,
    loadOrders
  }

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  )
}

export default OrderContext