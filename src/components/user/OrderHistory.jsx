import { useState } from 'react';
import { FiEye, FiPackage, FiTruck, FiCheckCircle } from 'react-icons/fi';
import { useOrder } from '../../context/OrderContext';
import { motion } from 'framer-motion';
import Modal from '../common/Modal';
import { useNavigate } from 'react-router-dom';

const OrderHistory = () => {
  const { orders, loading } = useOrder();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const getStatusIcon = (status) => {
    switch (status) {
      case 'processing':
        return <FiPackage className="text-amber-500" />;
      case 'shipped':
        return <FiTruck className="text-blue-500" />;
      case 'delivered':
        return <FiCheckCircle className="text-green-500" />;
      default:
        return <FiPackage className="text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'processing':
        return 'bg-amber-100 text-amber-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleViewOrder = (order) => {
    // Navigate to order confirmation page with order data
    navigate('/order-confirmation', { state: { order } });
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3, when: 'beforeChildren', staggerChildren: 0.1 } },
  };
  const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };
  const buttonVariants = { hover: { scale: 1.1, transition: { duration: 0.2 } }, tap: { scale: 0.95 } };

  if (loading) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-xl shadow-sm p-6 sm:p-8 max-w-4xl mx-auto">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6">Order History</h2>
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg">
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/3"></div>
              </div>
              <div className="h-8 bg-gray-200 rounded w-20"></div>
            </div>
          ))}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="bg-white rounded-xl shadow-sm p-6 sm:p-8 max-w-4xl mx-auto">
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6">Order History</h2>

      {orders.length === 0 ? (
        <motion.div variants={itemVariants} className="text-center py-8">
          <FiPackage className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-800">No orders yet</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by placing your first order.</p>
        </motion.div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <motion.div key={order.id} variants={itemVariants} className="border border-gray-100 rounded-lg p-4 hover:bg-gray-50 transition-colors duration-200">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-sm text-gray-500">Order #{order.id}</p>
                  <p className="text-lg font-semibold text-gray-800">${order.total?.toFixed(2) || '0.00'}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                  <motion.button onClick={() => handleViewOrder(order)} className="relative p-2 text-gray-500 hover:text-gray-700 group" variants={buttonVariants} whileHover="hover" whileTap="tap">
                    <FiEye size={16} />
                    <span className="absolute hidden -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded-md group-hover:block">
                      View Details
                    </span>
                  </motion.button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  {getStatusIcon(order.status)}
                  <span className="text-gray-600">{new Date(order.date).toLocaleDateString()}</span>
                </div>
                <span className="text-gray-600">{order.items?.length || 0} items</span>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Modal - keeping for backward compatibility but not used */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={`Order #${selectedOrder?.id}`} size="large">
        {selectedOrder && (
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
            {/* Order & Shipping Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <motion.div variants={itemVariants}>
                <h3 className="font-semibold text-gray-800 mb-2">Order Details</h3>
                <p className="text-sm text-gray-600">
                  Date: {new Date(selectedOrder.date).toLocaleDateString()} <br />
                  Status:{' '}
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(selectedOrder.status)}`}>
                    {selectedOrder.status}
                  </span>{' '}
                  <br />
                  Total: ${selectedOrder.total?.toFixed(2) || '0.00'}
                </p>
              </motion.div>

              <motion.div variants={itemVariants}>
                <h3 className="font-semibold text-gray-800 mb-2">Shipping Address</h3>
                <p className="text-sm text-gray-600">
                  {selectedOrder.shippingAddress?.firstName} {selectedOrder.shippingAddress?.lastName} <br />
                  {selectedOrder.shippingAddress?.address} <br />
                  {selectedOrder.shippingAddress?.city}, {selectedOrder.shippingAddress?.state} {selectedOrder.shippingAddress?.zipCode} <br />
                  {selectedOrder.shippingAddress?.country}
                </p>
              </motion.div>
            </div>

            {/* Items */}
            <motion.div variants={itemVariants}>
              <h3 className="font-semibold text-gray-800 mb-2">Items</h3>
              <div className="space-y-4">
                {selectedOrder.items?.map((item) => (
                  <motion.div key={item.id} variants={itemVariants} className="flex items-center space-x-3 hover:bg-gray-50 p-2 rounded-lg transition-colors duration-200">
                    <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-lg" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800">{item.name}</p>
                      <p className="text-sm text-gray-600">
                        Qty: {item.quantity} × ${item.price.toFixed(2)}
                      </p>
                    </div>
                    <p className="text-sm font-medium text-gray-800">${(item.price * item.quantity).toFixed(2)}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </Modal>
    </motion.div>
  );
};

export default OrderHistory;
