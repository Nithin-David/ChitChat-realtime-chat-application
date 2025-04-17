import React from 'react'
import useAuthStore from '../store/useAuthStore'
import { House, LogOut, MessagesSquare, Settings, UserPen } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {

  const {logout, authUser} = useAuthStore()

  return (
    <div className="flex w-full items-center justify-between px-6 py-2 drop-shadow-lg drop-shadow-gray-800 h-12">
      <div>
        <Link to={"/"} className="flex items-center gap-2">
          <MessagesSquare color="#e48653" />
          <span>ChitChat</span>
        </Link>
      </div>

      <div className="flex items-center gap-4">
        {authUser && (
          <>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center gap-2 p-2 rounded-lg text-sm ${
                  isActive ? "bg-[#151a20]" : "hover:bg-[#151a20]"
                }`
              }>
              <House size={20} color="#e48653" />
              <span className="hidden sm:inline opacity-60">Home</span>
            </NavLink>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `flex items-center gap-2 p-2 rounded-lg text-sm ${
                  isActive ? "bg-[#151a20]" : "hover:bg-[#151a20]"
                }`
              }>
              <UserPen size={20} color="#e48653" />
              <span className="hidden sm:inline opacity-60">Profile</span>
            </NavLink>

            <button
              onClick={logout}
              className="flex items-center gap-2 hover:bg-[#151a20] p-2 rounded-lg">
              <LogOut size={20} color="#e48653" />
              <span className="hidden sm:inline opacity-60 text-sm">
                Logout
              </span>
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar