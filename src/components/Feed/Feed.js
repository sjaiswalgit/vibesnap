import React from 'react'

const Feed = () => {
  return (
    <div className="space-y-6">
    <div className="bg-purple-100 p-4 rounded-2xl shadow-md">
          {/* User Info */}
          <div className="flex items-center space-x-3 mb-2">
            <img
              src="https://via.placeholder.com/40" // Replace with Aarav's profile picture
              alt="Aarav"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <h3 className="font-bold">Aarav</h3>
              <p className="text-sm text-gray-400">2 hours ago</p>
            </div>
          </div>

          {/* Post Text */}
          <p className="text-gray-700 mb-3">
            Just arrived in New York City! Excited to explore the sights, sounds,
            and energy of this amazing place. 🗽<br />
            <span className="text-blue-500 font-medium">#NYC #Travel</span>
          </p>

          {/* Post Images */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            <img
              src="https://via.placeholder.com/150x200?text=Statue+of+Liberty"
              alt="Statue of Liberty"
              className="rounded-lg object-cover w-full h-40"
            />
            <img
              src="https://via.placeholder.com/150x200?text=NYC+Street"
              alt="NYC Street"
              className="rounded-lg object-cover w-full h-40"
            />
          </div>

          {/* Like and Share */}
          <div className="flex items-center justify-between text-gray-600">
            <div className="flex items-center space-x-1 text-red-500">
              <span className="text-xl">❤️</span>
              <span className="text-sm font-medium">67</span>
            </div>
            <button className="flex items-center space-x-1 text-gray-600 font-medium">
              <span className="text-lg">🚀</span>
              <span>Share</span>
            </button>
          </div>
        </div>

        {/* Post 2 */}
        <div className="bg-yellow-50 p-4 rounded-2xl shadow-md">
          {/* User Info */}
          <div className="flex items-center space-x-3 mb-2">
            <img
              src="https://via.placeholder.com/40" // Replace with Sneha's profile picture
              alt="Sneha"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <h3 className="font-bold">Sneha</h3>
              <p className="text-sm text-gray-400">1 day ago</p>
            </div>
          </div>

          {/* Post Text */}
          <p className="text-gray-700 mb-3">
            Taking a moment to slow down, breathe, and focus on myself. 🌿✨
            Self-care isn’t selfish – it’s necessary. 💕<br />
            <span className="text-blue-500 font-medium">
              #SelfCare #MeTime #Wellness
            </span>
          </p>

          {/* Post Image */}
          <div className="relative">
            <img
              src="https://via.placeholder.com/300x200?text=Self-Care"
              alt="Self-care"
              className="rounded-lg w-full object-cover h-48"
            />
            {/* Play Button */}
            <button className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center shadow-md">
                <span className="text-gray-700 text-2xl">▶</span>
              </div>
            </button>
          </div>
        </div>
        </div>
  )
}

export default Feed