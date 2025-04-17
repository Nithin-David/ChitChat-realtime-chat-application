import React, { useEffect } from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'
import Navbar from './components/Navbar';
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import useAuthStore from './store/useAuthStore.js';
import {Loader} from 'lucide-react';
import { Toaster } from 'react-hot-toast';

const App = () => {

  const { authCheck, authUser, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    authCheck();
  },[authCheck]);

  if(isCheckingAuth && !authUser){
   return (
     <div className="flex justify-center items-center h-screen">
       <Loader className="size-10 animate-spin" />
     </div>
   );
  }

  return (
    <div>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignupPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/profile"
          element={authUser ? <ProfilePage /> : <Navigate to={"/login"} />}
        />
      </Routes>

      <Toaster position="top-center" reverseOrder={true} />
    </div>
  );
}

export default App