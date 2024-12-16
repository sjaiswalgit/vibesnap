import React from 'react'
import { Link} from 'react-router-dom'
const AddPost = () => {
  return (

    <Link to="/create-post" className="fixed bottom-6 right-6 bg-black text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:bg-gray-800">
        <span className="text-2xl">+</span>
    </Link>
  )
}

export default AddPost