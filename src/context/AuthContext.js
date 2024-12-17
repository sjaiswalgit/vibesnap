import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../firebase/config';
import { doc, onSnapshot } from 'firebase/firestore';
import { useLoadingContext } from './LoaderContext';
export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
    const [userId, setUserId] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const {setLoading}=useLoadingContext()

    useEffect(() => {
        setLoading(true)
        const unsub = onAuthStateChanged(auth, async (user) => {
            if (user) {
                
                setUserId(user.uid)
            } else {
                setUserId(null)
                setCurrentUser(null); // Handle case when user is logged out
            }
            setLoading(false)
        });
       
        // Cleanup subscription
        return () => unsub();
    }, []);

    useEffect(() => {
        if (!userId) return; // Guard clause to avoid unnecessary execution when userId is falsy.
        
        const getChats = () => {
            setLoading(true)
            const unsub = onSnapshot(doc(db, "users", userId), (document) => {
                if (document?.exists()) { // Check if document exists.
                    setCurrentUser(document.data());
                } else {
                    setCurrentUser(null); // Handle the case where the document doesn't exist.
                }
                setLoading(false)
            });
           
            return unsub; // Return the unsubscribe function for cleanup.
        };
    
        const unsubscribe = getChats(); // Subscribe to the snapshot.
    
        return () => {
            unsubscribe(); // Cleanup the subscription when the component unmounts or `userId` changes.
        };
    }, [userId]);
    

    return (
        <AuthContext.Provider value={{ currentUser }}>
            {children}
        </AuthContext.Provider>
    );
};

// Create a custom hook to access the AuthContext
export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuthContext must be used within an AuthProvider');
    }
    return context;
};
