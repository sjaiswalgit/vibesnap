import React from "react";
import { FaTwitter,FaFacebook,FaRedditAlien,FaDiscord,FaFacebookMessenger} from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { RiTelegram2Fill } from "react-icons/ri";
import { PiCopySimpleFill } from "react-icons/pi"
import InstagramIcon from "../../assests/instagramIcon.svg"
const SharePost = ({setShowShare}) => {
    const socialLinks = [
        { name: "Twitter", icon: <FaTwitter className="text-blue-400" />, color: "bg-blue-100", link: "https://twitter.com" },
        { name: "Facebook", icon: <FaFacebook className="text-blue-600"/>, color: "bg-blue-100", link: "https://facebook.com" },
        { name: "Reddit", icon: <FaRedditAlien className="text-orange-600" />, color: "bg-red-100", link: "https://reddit.com" },
        { name: "Discord", icon: <FaDiscord className="text-violet-700" />, color: "bg-blue-100", link: "https://discord.com" },
        { name: "WhatsApp", icon: <IoLogoWhatsapp className="text-green-500 text-3xl" />, color: "bg-green-100", link: "https://whatsapp.com" },
        { name: "Messenger", icon: <FaFacebookMessenger className="text-blue-600" />, color: "bg-blue-100", link: "https://messenger.com" },
        { name: "Telegram", icon: <RiTelegram2Fill className="text-blue-500 text-3xl" />, color: "bg-blue-100", link: "https://telegram.org" },
        { name: "Instagram", icon: <img className="p-3" src={InstagramIcon} />, color: "bg-pink-100", link: "https://instagram.com" },
    ];

    const pageLink = "https://www.arnav/feed";

    return (

        <div onClick={(e)=>{e.stopPropagation()}} className="bg-white rounded-lg p-6 shadow-lg w-90">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold">Share post</h3>
                <button onClick={()=>{setShowShare(false)}} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>

            {/* Social Media Icons */}
            <div className="grid grid-cols-4 gap-4 mb-6">
                {socialLinks.map((social, index) => (
                    <div key={index} className="flex flex-col  items-center justify-center">
                        <a
                            
                            href={social.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex justify-center items-center ${social.color}   rounded-full w-14 h-14 transition-transform transform hover:scale-110`}
                            title={social.name}
                        >
                            <span className="text-2xl">{social.icon}</span>
                        </a>
                        <p className="text-center font-kumbh text-xs text-gray-500 mt-2" >{social.name}</p>
                    </div>
                ))}
            </div>

            {/* Page Link */}
            <div>
                <p className=" text-md font-semibold mb-2">Page Link</p>
                <div className="flex items-center justify-between bg-gray-100 p-2 rounded-md">
                    <span className="text-gray-700 text-sm truncate">{pageLink}</span>
                    <button
                        onClick={() => navigator.clipboard.writeText(pageLink)}
                        className="text-gray-500 hover:text-gray-700 text-sm"
                    >
                        <PiCopySimpleFill className="text-xl" />
                    </button>
                </div>
            </div>
        </div>

    );
};

export default SharePost;
