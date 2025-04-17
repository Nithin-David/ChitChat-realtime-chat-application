import React from 'react'
import useMessageStore from '../store/useMessageStore';
import { X } from 'lucide-react';
import useAuthStore from '../store/useAuthStore';

const ChatHeader = () => {

    const { userActive, isUserActive } = useMessageStore();
    const {onlineUsers} = useAuthStore()

  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className='relative'>
          <img
            src={
              isUserActive?.profilePic
                ? isUserActive?.profilePic
                : "/avatar.jpg"
            }
            alt="profile picture"
            className="size-12 rounded-full object-cover"
          />
          <div
            className={`absolute top-0 right-0 w-2 h-2 rounded-full ${
              onlineUsers.includes(isUserActive._id) ? "bg-green-500" : ""
            }`}></div>
        </div>
        <div className="flex flex-col">
          <p>{isUserActive?.fullname}</p>
          <p className="text-xs opacity-50">{onlineUsers.includes(isUserActive._id) ? "Online" : "Offline"}</p>
        </div>
      </div>
      <button
        onClick={() => {
          userActive(null);
        }}>
        <X size={24} color="#ce7827" className="hover:bg-[#ce782713]" />
      </button>
    </header>
  );
}

export default ChatHeader