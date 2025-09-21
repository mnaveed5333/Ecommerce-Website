import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-100 py-4 text-center">
      <p className="text-gray-600">© {new Date().getFullYear()} E-Shop. All rights reserved.</p>
    </footer>
  );
}

export default Footer;