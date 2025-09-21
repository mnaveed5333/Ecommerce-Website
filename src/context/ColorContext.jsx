// context/ColorContext.js
import React, { createContext, useContext, useState } from 'react';

const ColorContext = createContext();

export const useColor = () => {
  const context = useContext(ColorContext);
  if (!context) {
    throw new Error('useColor must be used within a ColorProvider');
  }
  return context;
};

export const ColorProvider = ({ children }) => {
  const [headerColors, setHeaderColors] = useState({
    bgGradient: "from-indigo-900 to-purple-800",
    textColor: "text-white",
    iconColor: "text-indigo-200"
  });

  const updateHeaderColors = (bgGradient) => {
    // Map hero slide gradients to header color schemes
    const colorMap = {
      "from-blue-600 via-sky-600 to-indigo-700": {
        bgGradient: "from-blue-800 to-indigo-900",
        textColor: "text-blue-100",
        iconColor: "text-blue-300"
      },
      "from-pink-600 via-rose-500 to-fuchsia-600": {
        bgGradient: "from-pink-800 to-fuchsia-900",
        textColor: "text-pink-100",
        iconColor: "text-pink-300"
      },
      "from-amber-500 via-yellow-500 to-orange-600": {
        bgGradient: "from-amber-800 to-orange-900",
        textColor: "text-amber-100",
        iconColor: "text-amber-300"
      },
      "from-purple-600 via-indigo-600 to-blue-600": {
        bgGradient: "from-purple-800 to-blue-900",
        textColor: "text-purple-100",
        iconColor: "text-purple-300"
      }
    };
    
    setHeaderColors(colorMap[bgGradient] || {
      bgGradient: "from-indigo-900 to-purple-800",
      textColor: "text-white",
      iconColor: "text-indigo-200"
    });
  };

  return (
    <ColorContext.Provider value={{ headerColors, updateHeaderColors }}>
      {children}
    </ColorContext.Provider>
  );
};