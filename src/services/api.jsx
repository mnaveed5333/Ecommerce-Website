const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api'

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    }

    if (config.body && typeof config.body === 'object') {
      config.body = JSON.stringify(config.body)
    }

    try {
      const response = await fetch(url, config)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'API request failed')
      }

      return data
    } catch (error) {
      console.error('API request error:', error)
      throw error
    }
  }

  // Auth endpoints
  async login(credentials) {
    return this.request('/auth/login', {
      method: 'POST',
      body: credentials,
    })
  }

  async register(userData) {
    return this.request('/auth/register', {
      method: 'POST',
      body: userData,
    })
  }

  async getProfile() {
    return this.request('/auth/profile', {
      method: 'GET',
    })
  }

  // Product endpoints
  async getProducts(params = {}) {
    const queryString = new URLSearchParams(params).toString()
    return this.request(`/products?${queryString}`)
  }

  async getProduct(id) {
    return this.request(`/products/${id}`)
  }

  async getCategories() {
    return this.request('/categories')
  }

  // Order endpoints
  async getOrders() {
    return this.request('/orders')
  }

  async createOrder(orderData) {
    return this.request('/orders', {
      method: 'POST',
      body: orderData,
    })
  }

  // Cart endpoints
  async getCart() {
    return this.request('/cart')
  }

  async addToCart(item) {
    return this.request('/cart/items', {
      method: 'POST',
      body: item,
    })
  }

  async updateCartItem(itemId, quantity) {
    return this.request(`/cart/items/${itemId}`, {
      method: 'PUT',
      body: { quantity },
    })
  }

  async removeCartItem(itemId) {
    return this.request(`/cart/items/${itemId}`, {
      method: 'DELETE',
    })
  }
}

export const apiService = new ApiService()