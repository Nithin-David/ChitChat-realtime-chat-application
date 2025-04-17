import { Users } from "lucide-react";
import React, { useEffect, useState } from "react";
import useMessageStore from "../store/useMessageStore";
import ContactSkelton from "./skeltons/ContactSkelton";
import useAuthStore from "../store/useAuthStore";

const ContactBar = () => {
  const { users, isUsersLoading, getUsers, userActive, isUserActive } =
    useMessageStore();
  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);


  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredOnlineUsers = showOnlineOnly ? users.filter((user) => onlineUsers.includes(user._id)) : users;

  if (isUsersLoading) return <ContactSkelton />;

  return (
    <div className="flex flex-col max-w-1/3 w-full">
      <div className="flex flex-col gap-2 p-2">
        <div className="flex items-center  gap-2 opacity-70">
          <Users color="#e27228" />
          <p className="text-sm">Contacts</p>
        </div>
        <div className="text-xs flex gap-2 opacity-50">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              className="cursor-pointer checkbox checkbox-sm"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
            />
            <p>Show online only</p>
            <p>({onlineUsers.length - 1} online)</p>
          </label>
        </div>
      </div>

      {/* contacts list */}
      <div className="flex flex-col gap-2 p-2 overflow-y-auto border-r h-full border-gray-700">
        {filteredOnlineUsers.map((user) => (
          <div
            key={user._id}
            className={`flex items-center gap-4 p-2 hover:bg-[#1c232b] rounded-lg transition-shadow ${
              isUserActive?._id === user._id ? "bg-[#1c232b]" : ""
            }`}
            onClick={() => userActive(user)}>
            <div className="relative">
              <img
                src={user.profilePic ? user.profilePic : "/avatar.jpg"}
                alt="profile picture"
                className="size-12 rounded-full object-cover"
              />

              <div
                className={`absolute top-0 right-0 w-2 h-2 rounded-full ${
                  onlineUsers.includes(user._id) ? "bg-green-500" : ""
                }`}></div>
            </div>
            <p>{user.fullname}</p>
          </div>
        ))}

        {filteredOnlineUsers.length === 0 && (
          <div className="flex items-center justify-center h-full opacity-50">
            <p>No online users!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactBar;
