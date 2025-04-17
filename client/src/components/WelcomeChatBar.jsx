import { MessagesSquare } from 'lucide-react';
import React from 'react'

const WelcomeChatBar = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <MessagesSquare size={32} color="#ce7827" />
      <h1 className="text-2xl font-bold text-[#ef8834]">Welcome to ChitChat App</h1>
      <p className="text-sm text-center opacity-50">
        Chat with your friends and family
      </p>
      <p className='pt-4 text-xs opacity-50'>Select a person from contact and chat..</p>
    </div>
  );
}

export default WelcomeChatBar