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
