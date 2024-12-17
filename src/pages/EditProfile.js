import React, { useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";
import { useAuthContext } from "../context/AuthContext";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebase/config";
import { setDoc, doc } from "firebase/firestore";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
function EditProfile() {
    const [name, setName] = useState("");
    const [bio, setBio] = useState("");
    const [photoPreview, setPhotoPreview] = useState(""); // For preview only
    const [photoFile, setPhotoFile] = useState(null); // Actual file for upload
    const [coverPreview, setCoverPreview] = useState(""); // For preview only
    const [coverFile, setCoverFile] = useState(null); // Actual file for upload
    const { currentUser } = useAuthContext();
      const navigate = useNavigate();
    useEffect(() => {
        if (currentUser.displayName) {
            setName(currentUser.displayName);
        }
        if (currentUser.photoURL) {
            setPhotoPreview(currentUser.photoURL);
        }
        if (currentUser.coverURL) {
            setCoverPreview(currentUser.coverURL);
        }
        if (currentUser.bio) {
            setBio(currentUser.bio);
        }
    }, [currentUser]);

    const uploadFile = async (file, path) => {
        const storageRef = ref(storage, path);
        const uploadTask = await uploadBytesResumable(storageRef, file);
        return getDownloadURL(uploadTask.ref); // Return the download URL after upload
    };

    const onSave = async () => {
        try {
            const userDocRef = doc(db, "users", currentUser.uid);
            const updatedData = {
                uid: currentUser.uid,
                displayName: name,
                bio: bio,
            };

            // Upload profile photo if a new file is selected
            if (photoFile) {
                const photoURL = await uploadFile(photoFile, `${currentUser.uid}_profile`);
                updatedData.photoURL = photoURL;
            }

            // Upload cover photo if a new file is selected
            if (coverFile) {
                const coverURL = await uploadFile(coverFile, `${currentUser.uid}_cover`);
                updatedData.coverURL = coverURL;
            }

            await setDoc(userDocRef, updatedData, { merge: true });
            console.log("Profile updated successfully!");
        } catch (err) {
            console.error("Error updating profile: ", err);
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            {/* Header Section */}
            <div className="relative">
                <div className="absolute top-1 left-1 flex items-center p-4 text-white">
                    <button onClick={() => { navigate(-1) }}>
                        <FaArrowLeft className="text-lg" />
                    </button>
                    <h1 className="text-lg font-bold ml-4 text-white">Edit Profile</h1>
                </div>
                {/* Background Image */}
                <img
                    src={coverPreview || "https://via.placeholder.com/600x300?text=Cover+Image"}
                    alt="Cover"
                    className="w-full h-40 object-cover rounded-b-[1rem]"
                />
                {/* Profile Picture */}
                <div className="absolute -bottom-12 left-4">
                    <img
                        src={photoPreview || "https://via.placeholder.com/100"}
                        alt="Profile"
                        className="w-28 h-28 rounded-full object-contain shadow-md"
                    />
                    <div className="absolute bottom-2 right-0">
                        <label
                            className="bg-white text-gray-800 font-medium px-2 py-2 rounded-full border border-gray-300"
                            htmlFor="profilePhoto"
                        >
                            <MdEdit className="inline-block text-gray-600" />
                        </label>
                        <input
                            type="file"
                            id="profilePhoto"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                                if (e.target.files[0]) {
                                    setPhotoPreview(URL.createObjectURL(e.target.files[0]));
                                    setPhotoFile(e.target.files[0]); // Store file for upload
                                }
                            }}
                        />
                    </div>
                </div>
                <div className="absolute bottom-4 right-4">
                    <label
                        className="bg-white text-gray-800 font-medium px-2 py-2 rounded-full border border-gray-300"
                        htmlFor="coverPhoto"
                    >
                        <MdEdit className="inline-block text-gray-600" />
                    </label>
                    <input
                        type="file"
                        id="coverPhoto"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                            if (e.target.files[0]) {
                                setCoverPreview(URL.createObjectURL(e.target.files[0]));
                                setCoverFile(e.target.files[0]); // Store file for upload
                            }
                        }}
                    />
                </div>
            </div>

            {/* User Bio */}
            <div className="mt-16 px-4 w-full">
                <label className="text-xl font-karla" htmlFor="name">
                    Name
                </label>
                <br />
                <input
                    type="text"
                    id="name"
                    placeholder="e.g Raj..."
                    className="bg-transparent border-b-[1px] font-semibold text-xl border-gray-500 w-full outline-none capitalize"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <br />
                <br />
                <label className="text-xl font-karla" htmlFor="bio">
                    Bio
                </label>
                <br />
                <textarea
                    id="bio"
                    className="bg-transparent font-semibold border-b-[1px] text-xl border-gray-500 w-full outline-none resize-none max-h-[120px]"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                ></textarea>
            </div>

            <div className="fixed bottom-2 left-0 w-full px-4">
                <button
                    className="bg-black h-16 w-full rounded-3xl text-white font-semibold text-2xl"
                    onClick={onSave}
                >
                    Save
                </button>
            </div>
        </div>
    );
}

export default EditProfile;
