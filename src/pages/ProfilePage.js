import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Profile from '../components/Profile/Profile';

const ProfilePage = () => {
  const { currentUser } = useContext(AuthContext);

  if (!currentUser) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Profile user={currentUser} />
    </div>
  );
};

export default ProfilePage;
