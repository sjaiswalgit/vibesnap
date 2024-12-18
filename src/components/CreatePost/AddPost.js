import React from 'react'
import { Link} from 'react-router-dom'
import { IoMdAdd } from "react-icons/io";
const AddPost = () => {
  return (

    <Link to="/create-post" style={{zIndex:"1000000000"}} className="fixed bottom-6 right-6 bg-black text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:bg-gray-800">
        <span className="text-2xl"><IoMdAdd /></span>
    </Link>
  )
}

export default AddPost