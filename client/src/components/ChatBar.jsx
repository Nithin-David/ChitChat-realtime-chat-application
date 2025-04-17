import React, { useEffect, useRef } from "react";
import useMessageStore from "../store/useMessageStore";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import useAuthStore from "../store/useAuthStore";
import formatSmartTime from "../lib/utils";
import MessageSkelton from "./skeltons/MessageSkelton";

const ChatBar = () => {
  const {
    isMessageLoading,
    getMessages,
    isUserActive,
    messages,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useMessageStore();
  const { authUser } = useAuthStore();

  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessages(isUserActive._id);

    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [isUserActive._id, getMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessageLoading) {
    return (
      <div className="w-full h-full p-2 rounded-md overflow-y-auto">
        {[...Array(5)].map((_, i) => (
          <MessageSkelton key={i} type={i % 2 === 0 ? "start" : "end"} />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full  max-md:h-[calc(100vh-75px)] p-2">
      {/* chat header */}
      <ChatHeader />

      {/* chat box */}
      <div className="w-full h-full max-h-screen p-2 rounded-md overflow-y-auto">
        {messages && messages.length > 0 ? (
          messages.map((message) => (
            <div
              ref={messageEndRef}
              key={message._id}
              className={
                message.senderId === authUser._id
                  ? "chat chat-end"
                  : "chat chat-start"
              }>
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Profile"
                    src={
                      message.senderId === authUser._id
                        ? authUser.profilePic || "/avatar.jpg"
                        : isUserActive.profilePic || "/avatar.jpg"
                    }
                  />
                </div>
              </div>

              <div className="chat-header">
                <time className="text-xs opacity-50">
                  {formatSmartTime(message.createdAt)}
                </time>
              </div>

              <div className="chat-bubble flex flex-col">
                {message.image && (
                  <img
                    src={message.image}
                    alt="sent media"
                    className="max-w-xl sm:max-w-xl max-h-[400px] rounded-md"
                  />
                )}
                {message.text}
              </div>
            </div>
          ))
        ) : (
          <div className="text-sm w-full h-full flex flex-col items-center justify-center opacity-50 text-center py-4">
            <p> No messages yet.</p>
            <p>send Hi.. to {isUserActive.fullname}</p>
          </div>
        )}
      </div>

      {/* input box */}
      <ChatInput />
    </div>
  );
};

export default ChatBar;
