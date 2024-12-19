import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';


export const AppContext = createContext();


export const AppProvider = ({ children }) => {
    const [selectedUser, setSelectedUser] = useState({});
    

    return (
        <AppContext.Provider value={{selectedUser, setSelectedUser }}>
            {children}
        </AppContext.Provider>
    );
};

// Create a custom hook to access the AuthContext
export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useDeviceContext must be used within an DeviceProvider');
    }
    return context;
};
