import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import { OrderProvider } from './context/OrderContext'
import { ThemeProvider } from './context/ThemeContext'
import { WishlistProvider } from './context/WishlistContext'
import { ColorProvider } from './context/ColorContext'
import { HeaderProvider } from './context/HeaderContext'
import Header from './components/common/Header'
import Footer from './components/common/Footer'
import routes from './routes'
import { FiMessageCircle } from 'react-icons/fi'

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <OrderProvider>
            <WishlistProvider>
              <ColorProvider>
                <HeaderProvider>
            <Router>
              <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-grow">
                  <Routes>
                    {routes.map((route, index) => (
                      <Route
                        key={index}
                        path={route.path}
                        element={route.element}
                      />
                    ))}
                  </Routes>
                </main>
                <Footer />

                {/* WhatsApp Floating Button */}
                <a
                  href="https://wa.me/923405542097"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-50"
                  aria-label="Contact us on WhatsApp"
                >
                  <FiMessageCircle size={24} />
                </a>
              </div>
            </Router>
                </HeaderProvider>
              </ColorProvider>
            </WishlistProvider>
          </OrderProvider>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
