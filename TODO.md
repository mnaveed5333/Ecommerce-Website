# TODO: Refactor to Tailwind CSS, Add Icons and Animations

## 1. List and Delete CSS Files (except index.css)
- [ ] Identify all CSS files except index.css
- [ ] Delete the following CSS files:
  - src/assets/styles/global.css
  - src/assets/styles/variables.css
  - src/assets/styles/App.css
  - src/components/common/Button.css
  - src/components/common/Modal.css
  - src/components/common/Header.css
  - src/components/common/Footer.css
  - src/pages/Cart.css
  - src/pages/Account.css
  - src/pages/OrderConfirmation.css
  - src/pages/Home.css
  - src/pages/Login.css
  - src/pages/AuthPages.css
  - src/pages/Checkout.css
  - src/pages/ProductDetail.css
  - src/pages/AuthForms.css
  - src/pages/OrderHistory.css
  - src/pages/CartSummary.css
  - src/pages/ProductCarousel.css
  - src/pages/Shop.css
  - src/pages/Wishlist.css
  - src/components/cart/CartItem.css
  - src/pages/NotFound.css
  - src/components/checkout/OrderSummary.css
  - src/components/auth/AuthForms.css
  - src/components/product/ProductCard.css
  - src/components/cart/CartSummary.css
  - src/components/product/ProductCarousel.css
  - src/components/user/ProfileCard.css
  - src/components/product/ProductFilter.css
  - src/components/checkout/ShippingForm.css
  - src/components/checkout/PaymentForm.css
  - src/components/user/OrderHistory.css

## 2. Remove CSS Imports from JSX Files
- [ ] Remove import statements for CSS files from all JSX components
- [ ] Affected files: All JSX files that import .css

## 3. Refactor JSX Files to Use Tailwind Classes
- [ ] Replace custom CSS classes with Tailwind utility classes
- [ ] Add dark: prefixes for dark mode support
- [ ] Update the following components:
  - [ ] src/components/common/Header.jsx
  - [ ] src/components/common/Footer.jsx
  - [ ] src/components/common/Button.jsx
  - [ ] src/components/common/Modal.jsx
  - [ ] src/pages/Home.jsx
  - [ ] src/pages/Shop.jsx
  - [ ] src/pages/ProductDetail.jsx
  - [ ] src/pages/Cart.jsx
  - [ ] src/pages/Checkout.jsx
  - [ ] src/pages/Account.jsx
  - [ ] src/pages/Login.jsx
  - [ ] src/pages/Register.jsx
  - [ ] src/pages/Wishlist.jsx
  - [ ] src/pages/About.jsx
  - [ ] src/pages/Contact.jsx
  - [ ] src/pages/OrderConfirmation.jsx
  - [ ] src/pages/Orders.jsx
  - [ ] src/pages/NotFound.jsx
  - [ ] src/components/product/ProductCard.jsx
  - [ ] src/components/product/ProductFilter.jsx
  - [ ] src/components/product/ProductCarousel.jsx
  - [ ] src/components/cart/CartItem.jsx
  - [ ] src/components/cart/CartSummary.jsx
  - [ ] src/components/checkout/ShippingForm.jsx
  - [ ] src/components/checkout/PaymentForm.jsx
  - [ ] src/components/checkout/OrderSummary.jsx
  - [ ] src/components/auth/LoginForm.jsx
  - [ ] src/components/auth/RegisterForm.jsx
  - [ ] src/components/user/ProfileCard.jsx
  - [ ] src/components/user/OrderHistory.jsx

## 4. Integrate React Icons
- [ ] Identify current icon usages (emojis, etc.)
- [ ] Replace with React Icons components
- [ ] Import necessary icons from react-icons

## 5. Add Framer Motion Animations
- [ ] Add page transition animations
- [ ] Add hover effects
- [ ] Add modal animations
- [ ] Add carousel animations
- [ ] Import and use motion components

## 6. Preserve Light/Dark Mode Support
- [ ] Ensure Tailwind dark mode classes work with existing ThemeContext
- [ ] Test theme switching

## 7. Test UI Responsiveness and Consistency
- [ ] Run the development server
- [ ] Test all pages for responsiveness
- [ ] Check dark/light mode
- [ ] Verify animations work
- [ ] Ensure icons display correctly
