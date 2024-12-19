import React from 'react';
import LoginPage from '../../pages/LoginPage';
import { useAuthContext } from '../../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuthContext();
  // console.log(currentUser)
  if (!currentUser) {
    // Redirect to login if not authenticated
    return <LoginPage />;
  }

  // Render children if authenticated
  return children;
};

export default ProtectedRoute;
