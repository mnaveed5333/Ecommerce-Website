import React from 'react';

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white rounded-lg p-8">
        {children}
        <button onClick={onClose} className="mt-4 bg-gray-200 hover:bg-gray-300 py-2 px-4 rounded-md">Close</button>
      </div>
    </div>
  );
}

export default Modal;