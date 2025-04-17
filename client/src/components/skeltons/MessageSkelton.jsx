import React from "react";

const MessageSkelton = ({ type = "start" }) => {
  return (
    <div className={`chat chat-${type} animate-pulse`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full bg-slate-700" />
      </div>

      <div className="chat-header mb-1">
        <div className="h-3 w-10 bg-slate-700 rounded-md" />
      </div>

      <div className="chat-bubble bg-slate-700 p-2 flex flex-col gap-2 max-w-2xl">
        {/* Optional image line */}
        <div className="h-4 w-30 bg-slate-600 rounded-md" />
        <div className="h-4 w-1/2 bg-slate-600 rounded-md" />
      </div>
    </div>
  );
};

export default MessageSkelton;
