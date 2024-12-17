import React, { useState } from "react";
import { createContext,useContext } from "react";

 const LoadingContext = createContext();


export const LoaderPovider = ({ children }) => {
    const [loading,setLoading]=useState(false)
 

  return (
    <LoadingContext.Provider  value={setLoading}>
    <div className="relative">
      {/* Content that will be wrapped */}
      {children}

      {/* Loader Modal */}
      {loading && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-10 h-10 border-4 border-t-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
            <span className="text-white font-semibold text-xl">Loading...</span>
          </div>
        </div>
      )}
    </div>
    </LoadingContext.Provider>
  );
};

export const useLoadingContext = () => {
    const context = useContext(LoadingContext);
    if (!context) {
        throw new Error('useLoadingContext must be used within an LoadingProvider');
    }
    return context;
};


