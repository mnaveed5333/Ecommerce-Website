import { apiService } from './api'

class AuthService {
  // Store token in localStorage
  setToken(token) {
    if (token) {
      localStorage.setItem('auth_token', token)
    } else {
      localStorage.removeItem('auth_token')
    }
  }

  // Get token from localStorage
  getToken() {
    return localStorage.getItem('auth_token')
  }

  // Check if user is authenticated
  isAuthenticated() {
    return !!this.getToken()
  }

  // Login user
  async login(email, password) {
    try {
      const response = await apiService.login({ email, password })
      this.setToken(response.token)
      return response.user
    } catch (error) {
      this.setToken(null)
      throw error
    }
  }

  // Register user
  async register(userData) {
    try {
      const response = await apiService.register(userData)
      this.setToken(response.token)
      return response.user
    } catch (error) {
      this.setToken(null)
      throw error
    }
  }

  // Logout user
  logout() {
    this.setToken(null)
  }

  // Get user profile
  async getProfile() {
    if (!this.isAuthenticated()) {
      throw new Error('Not authenticated')
    }

    try {
      return await apiService.getProfile()
    } catch (error) {
      this.logout()
      throw error
    }
  }

  // Update user profile
  async updateProfile(profileData) {
    if (!this.isAuthenticated()) {
      throw new Error('Not authenticated')
    }

    try {
      return await apiService.request('/auth/profile', {
        method: 'PUT',
        body: profileData,
      })
    } catch (error) {
      throw error
    }
  }
}

export const authService = new AuthService()