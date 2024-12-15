import React from 'react';
import googleIcon from '../assests/googleIcon.svg'
import { signInWithPopup ,signInWithRedirect} from 'firebase/auth';
import { auth, provider } from '../firebase/config';
const LoginPage = () =>{
  
  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login Error:", error.message);
    }
  };
  
  
  
  
  return (
  <div className='h-[100vh] w-[100vw] relative'>
    <div className="flex flex-1 flex-row justify-between gap-2 h-full overflow-hidden">
      <div className='flex flex-1 flex-col gap-2 h-full'>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnz7lFtKvCUBQFGY1Z6Cwk3v8-xvXgKWz3dg&s" alt="" />
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnz7lFtKvCUBQFGY1Z6Cwk3v8-xvXgKWz3dg&s" alt="" />
      </div>
      <div className="flex flex-1 flex-col h-full gap-2 transform -translate-y-1/2 ">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnz7lFtKvCUBQFGY1Z6Cwk3v8-xvXgKWz3dg&s" alt="" />
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnz7lFtKvCUBQFGY1Z6Cwk3v8-xvXgKWz3dg&s" alt="" />
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnz7lFtKvCUBQFGY1Z6Cwk3v8-xvXgKWz3dg&s" alt="" />
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnz7lFtKvCUBQFGY1Z6Cwk3v8-xvXgKWz3dg&s" alt="" />
      </div>
      <div className='flex flex-1 flex-col gap-2 h-full '>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnz7lFtKvCUBQFGY1Z6Cwk3v8-xvXgKWz3dg&s" alt="" />
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnz7lFtKvCUBQFGY1Z6Cwk3v8-xvXgKWz3dg&s" alt="" />
      </div>
    </div>
    <div className="w-full bg-white h-[45%] shadow-lg rounded-t-[4rem] p-6 text-center absolute bottom-0 left-0" >
      <h1 className="text-[28px] font-bold text-gray-800 mb-2">Vibesnap</h1>
      <p className="text-gray-500 mb-6 text-[16px]">Moments That Matter, Shared Forever.</p>
      <button onClick={handleGoogleLogin} className="flex items-center justify-center mx-auto bg-black text-white font-[700]  text-[16px] rounded-full py-4 px-6">
        <img
          src={googleIcon}
          alt="Google Icon"
          className="h-6 w-6 mr-2"
        />
        
        Continue with Google
      </button>
    </div>
  </div>
);
}

export default LoginPage;
