import React, { useState } from 'react'
import useAuthStore from '../store/useAuthStore'
import { Camera, Mail, User } from 'lucide-react';

const ProfilePage = () => {

  const { authUser, updateProfile, isUpdatingProfile } = useAuthStore();
  const [selecteImg, setSelectedImg] = useState();

  const dateYMD = new Date(authUser.createdAt)
    .toLocaleDateString("en-CA")
    .replace(/-/g, "/");


  const handleChange = (e) => {
    const file = e.target.files[0]; // corrected
   
    if(!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64String = reader.result; // corrected
      setSelectedImg(base64String);

      await updateProfile({profilePic: base64String});
    }

  };


  return (
    <div className="flex flex-col items-center justify-center  min-h-[calc(100vh-3rem)]  p-4">
      <div className="max-w-2xl w-full flex flex-col items-center justify-center gap-4 bg-gray-900 p-6 rounded-md">
        <div className="relative mb-2">
          <img
            src={authUser.profilePic || selecteImg || "avatar.jpg"}
            alt="profile image"
            className="size-24 rounded-full object-cover"
          />
          <label
            htmlFor="upload-avatar"
            className="absolute bottom-0 right-0 cursor-pointer">
            <Camera
              size={28}
              color="#f17641"
              strokeWidth={1.75}
              className="bg-gray-900 p-1 rounded-md"
            />
            <input
              type="file"
              id="upload-avatar"
              accept="image/*"
              className="hidden"
              onChange={handleChange}
            />
          </label>
        </div>
        <h1 className="text-sm opacity-50">
          {isUpdatingProfile
            ? "Updating..."
            : "Click on the camera icon to update your profile picture"}
        </h1>
        <div className="w-full flex flex-col gap-4 items-center justify-center mt-6">
          <div className="border-gray-600 border rounded-md p-2 max-w-md w-full flex items-center justify-center gap-4 opacity-70">
            <User size={20} color="#f17641" strokeWidth={1.75} />
            <h1 className="flex-1">{authUser.fullname}</h1>
          </div>
          <div className="border-gray-600 border rounded-md p-2 max-w-md w-full flex items-center justify-center gap-4 opacity-70">
            <Mail size={20} color="#f17641" strokeWidth={1.75} />{" "}
            <h1 className="flex-1">{authUser.email}</h1>
          </div>
        </div>

        <div className="p-2 mt-4 max-w-md w-full flex flex-col justify-center gap-4">
          <p>Account Informations</p>
          <div className="flex items-center justify-between text-sm opacity-70">
            <p>Member since</p>
            <p>{dateYMD}</p>
          </div>
          <hr />
          <div className="flex items-center justify-between text-sm">
            <p className=" opacity-70">Account status</p>
            <p className="text-green-500">Active</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage