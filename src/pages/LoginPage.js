import React from 'react';
import googleIcon from '../assests/googleIcon.svg'
import vibsnapLogo from '../assests/vibesnapLogo.png'
import { signInWithPopup, signInWithRedirect } from 'firebase/auth';
import { auth, provider, db } from '../firebase/config';
import { Link } from 'react-router-dom';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useAuthContext } from '../context/AuthContext';
import Images1 from '../assests/loginImages/1.png'
import Images2 from '../assests/loginImages/2.png'
import Images3 from '../assests/loginImages/3.png'
import Images4 from '../assests/loginImages/4.png'
import Images5 from '../assests/loginImages/5.png'
import Images6 from '../assests/loginImages/6.png'
import Images7 from '../assests/loginImages/7.png'
import Images8 from '../assests/loginImages/8.png'
import Images9 from '../assests/loginImages/9.png'


const LoginPage = () => {
  const { loading, setLoading } = useAuthContext()
  const handleGoogleLogin = async () => {
    try {
      setLoading(true)
      const res = await signInWithPopup(auth, provider);

      // Create a document reference using doc() function
      const userDocRef = doc(db, 'users', res.user.uid);

      // Check if the document exists
      const docSnapshot = await getDoc(userDocRef);

      if (!docSnapshot.exists()) {
        // If the document doesn't exist, create it
        await setDoc(userDocRef, {
          uid: res.user.uid,
          displayName: res.user.displayName,
          photoURL: res.user.photoURL,
        });
      }

      console.log("User logged in successfully");

    } catch (error) {
      console.error("Login Error:", error.message);
    }
    finally {
      setLoading(false)
    }
  }






  return (
    <div className='h-[100vh] w-[100vw] relative'>
      <div className="flex flex-1 flex-row justify-between gap-2 h-full overflow-hidden">
        <div className='w-full gap-2' style={{ columns: "3" }} >
          <img src={Images9} alt="" className="w-full mb-2 aspect-[0.625] object-cover" />
          <img src={Images8} alt="" className="w-full mb-2 aspect-[0.625] object-cover" />
          <img src={Images7} alt="" className="w-full mb-2 aspect-[0.625] object-cover" />
          <img src={Images1} alt="" className="w-full mb-2 aspect-[1.3] object-cover" />
          <img src={Images6} alt="" className="w-full mb-2 aspect-[0.625] object-cover" />
          <img src={Images5} alt="" className="w-full mb-2 aspect-[0.625] object-cover" />
          <img src={Images4} alt="" className="w-full mb-2 aspect-[0.625] object-cover" />
          <img src={Images3} alt="" className="w-full mb-2 aspect-[0.625] object-cover" />
          <img src={Images2} alt="" className="w-full mb-2 aspect-[0.625] object-cover" />
        </div>
      </div>
      <div className="w-full bg-white h-[45%] shadow-lg rounded-t-[4rem] p-6 text-center absolute bottom-0 left-0">
        <h1 className="text-[28px] font-bold text-gray-800 mb-2">
          <img src={vibsnapLogo} className="inline-block h-10" /> Vibesnap
        </h1>
        <p className="text-gray-500 mb-6 text-[16px]">
          Moments That Matter, Shared Forever.
        </p>
        <button
          onClick={handleGoogleLogin}
          className="flex items-center justify-center mx-auto bg-black text-white font-[700] text-[16px] rounded-full py-4 px-6 mb-1 w-full max-w-sm hover:bg-gray-800 transition-colors duration-300"
        >
          <img src={googleIcon} alt="Google Icon" className="h-6 w-6 mr-2" />
          Continue with Google
        </button>
        <p className="text-gray-400 mb-1 text-[14px]">or</p>
        <Link
          to="/otherlogin"
          className="flex items-center justify-center mx-auto bg-white text-black border-2 border-black font-[700] text-[16px] rounded-full py-4 px-6 w-full max-w-sm hover:bg-gray-50 transition-colors duration-300"
        >
          Other Login Options
        </Link>
      </div>
      {loading && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-10 h-10 border-4 border-t-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
            <span className="text-white font-semibold text-xl">Loading...</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default LoginPage;
