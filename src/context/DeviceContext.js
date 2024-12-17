import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';


export const DeviceContext = createContext();


export const DeviceProvider = ({ children }) => {
    const [deviceType, setDeviceType] = useState("Unknown");

    useEffect(() => {
      // Check the user agent string
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  
      if (/Mobi|Android|iPhone|iPad|iPod|BlackBerry|Opera Mini/i.test(userAgent)) {
        setDeviceType("Mobile");
      } else {
        setDeviceType("Desktop");
      }
    }, []);
    

    return (
        <DeviceContext.Provider value={{ deviceType }}>
            {children}
        </DeviceContext.Provider>
    );
};

// Create a custom hook to access the AuthContext
export const useDeviceContext = () => {
    const context = useContext(DeviceContext);
    if (!context) {
        throw new Error('useDeviceContext must be used within an DeviceProvider');
    }
    return context;
};
