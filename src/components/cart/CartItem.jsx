import { useState } from 'react'
import { FiPlus, FiMinus, FiTrash2 } from 'react-icons/fi'
import { useCart } from '../../context/CartContext'
import { motion } from 'framer-motion'

const PLACEHOLDER_SVG = encodeURI(
  `data:image/svg+xml;utf8,
  <svg xmlns='http://www.w3.org/2000/svg' width='400' height='400'>
    <rect width='100%' height='100%' fill='%23f8fafc'/>
    <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%23cbd5e1' font-size='20' font-family='Arial, Helvetica, sans-serif'>No image</text>
  </svg>`
)

const CartItem = ({ item }) => {
  const { updateQuantity, removeItem } = useCart()
  const [isUpdating, setIsUpdating] = useState(false)

  const formatCurrency = (v) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(v)

  const safeUpdate = async (newQty) => {
    if (newQty < 1 || isUpdating) return
    try {
      setIsUpdating(true)
      await updateQuantity(item.id, newQty)
    } finally {
      setIsUpdating(false)
    }
  }

  const safeRemove = async () => {
    if (isUpdating) return
    try {
      setIsUpdating(true)
      await removeItem(item.id)
    } finally {
      setIsUpdating(false)
    }
  }

  const btnVariants = { hover: { scale: 1.06 }, tap: { scale: 0.96 } }

  return (
    <motion.article
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      whileHover={{ y: -2, boxShadow: '0 10px 30px rgba(2,6,23,0.08)' }}
      transition={{ duration: 0.18 }}
      className="w-full bg-white rounded-xl border border-gray-100 overflow-hidden"
      aria-live="polite"
    >
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 p-4 items-start">
        {/* Image */}
        <div className="sm:col-span-2 flex items-start">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden border border-gray-200 bg-white flex items-center justify-center">
            <img
              src={item.image || PLACEHOLDER_SVG}
              alt={item.name}
              loading="lazy"
              onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = PLACEHOLDER_SVG }}
              className="w-full h-full object-contain p-1"
            />
          </div>
        </div>

        {/* Info (name + full-width description inside this column) */}
        <div className="sm:col-span-7 min-w-0">
          <div className="flex items-start gap-3">
            {/* vertical accent */}
            <div className="w-1 rounded-full bg-gradient-to-b from-indigo-500 to-cyan-400 mt-1 shrink-0" />
            <div className="flex-1">
              <h3 className="text-sm sm:text-base font-semibold text-gray-900 leading-tight truncate">
                {item.name}
              </h3>

              {/* DESCRIPTION: full width within this column */}
              {item.description && (
                <p className="mt-2 text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              )}

              {/* meta row */}
              <div className="mt-3 flex items-center gap-3 flex-wrap">
                <div className="inline-flex items-center bg-slate-50 text-slate-700 text-xs px-2 py-0.5 rounded-md border border-slate-100">
                  Qty: <span className="ml-2 font-medium">{item.quantity}</span>
                </div>
                <div className="inline-flex items-center bg-amber-50 text-amber-700 text-xs px-2 py-0.5 rounded-md border border-amber-100">
                  {item.sku ? `SKU: ${item.sku}` : '—'}
                </div>
                <div className="ml-auto sm:ml-0 text-sm font-semibold text-gray-900">
                  {formatCurrency(item.price)}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions (quantity + total + remove) */}
        <div className="sm:col-span-3 flex flex-col items-end gap-3">
          {/* Quantity controls */}
          <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-2 py-1">
            <motion.button
              aria-label={`Decrease quantity of ${item.name}`}
              title="Decrease"
              onClick={() => safeUpdate(item.quantity - 1)}
              disabled={isUpdating || item.quantity <= 1}
              className="p-1 rounded-md text-gray-600 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-indigo-200"
              variants={btnVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <FiMinus size={16} />
            </motion.button>

            <div className="w-10 text-center font-medium text-gray-800">
              {isUpdating ? (
                <svg className="animate-spin h-5 w-5 text-gray-600 mx-auto" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
              ) : (
                item.quantity
              )}
            </div>

            <motion.button
              aria-label={`Increase quantity of ${item.name}`}
              title="Increase"
              onClick={() => safeUpdate(item.quantity + 1)}
              disabled={isUpdating}
              className="p-1 rounded-md text-gray-600 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-indigo-200"
              variants={btnVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <FiPlus size={16} />
            </motion.button>
          </div>

          {/* total price */}
          <div className="text-lg font-bold text-indigo-600">
            {formatCurrency(item.price * item.quantity)}
          </div>

          {/* remove */}
          <motion.button
            onClick={safeRemove}
            disabled={isUpdating}
            aria-label={`Remove ${item.name} from cart`}
            title="Remove"
            className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-red-200"
            variants={btnVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <FiTrash2 size={16} />
            <span className="hidden sm:inline">Remove</span>
          </motion.button>
        </div>
      </div>
    </motion.article>
  )
}

export default CartItem
