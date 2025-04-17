import React from 'react'

const ContactSkelton = () => {

  return (
    <div className="flex flex-col max-w-1/3 w-full">
      <div className="flex flex-col gap-2 p-2">
        <div className="flex items-center gap-2 opacity-70">
          <div className="bg-gray-700 animate-pulse h-5 w-5 rounded" />
          <div className="bg-gray-700 animate-pulse h-4 w-20 rounded" />
        </div>
        <div className="flex gap-2 opacity-50">
          <div className="bg-gray-700 animate-pulse h-3 w-24 rounded" />
          <div className="bg-gray-700 animate-pulse h-3 w-12 rounded" />
        </div>
      </div>

      {/* skeleton contact list */}
      <div className="flex flex-col gap-2 p-2 overflow-y-auto border-r h-full border-gray-700">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-4 p-2 rounded-lg animate-pulse">
            <div className="bg-gray-700 size-12 rounded-full" />
            <div className="bg-gray-700 h-4 w-32 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ContactSkelton