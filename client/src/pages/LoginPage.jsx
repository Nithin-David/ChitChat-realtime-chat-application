import React, { useState } from 'react'
import AuthImagePattern from '../components/AuthImagePattern';
import useAuthStore from '../store/useAuthStore';
import { Eye, EyeClosed, LoaderCircle, LockKeyhole, Mail, MessagesSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

const LoginPage = () => {

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(false);
  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault()
    
      login(formData);
    
  }

  return (
    <div>
      <div className="min-h-screen grid lg:grid-cols-2">
        {/* Left side image */}
        <div className="flex flex-col items-center justify-center p-6 md:p-12 w-full mx-auto min-h-screen">
          <div className="flex flex-col items-center">
            <MessagesSquare
              size={44}
              color="#d18c15"
              strokeWidth={2.25}
              className="mb-2"
            />
            <h1 className="text-2xl">Create Account</h1>
            <h4 className="text-sm text-gray-400">Connect with World!</h4>
          </div>
          <form
            onSubmit={handleSubmit}
            className="space-y-4 w-full mx-auto flex flex-col items-center justify-center mt-6 mb-2">
            <div className="form-control w-full max-w-md">
              <label className="label">
                <span className="text-sm">Email</span>
              </label>

              <div className="group flex items-center gap-2 border border-gray-500 rounded-md px-3 py-2 focus-within:border-amber-600 transition-colors duration-200">
                <Mail
                  size={22}
                  color="#d18c15"
                  strokeWidth={1.75}
                  opacity={0.5}
                />
                <input
                  type="email"
                  value={formData.email}
                  placeholder="sample@sample.com"
                  className="bg-transparent outline-none flex-1 text-sm"
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="form-control w-full max-w-md">
              <label className="label">
                <span className="text-sm">Password</span>
              </label>

              <div className="group flex items-center gap-2 border border-gray-500 rounded-md px-3 py-2 focus-within:border-amber-600 transition-colors duration-200">
                <LockKeyhole
                  size={22}
                  color="#d18c15"
                  strokeWidth={1.75}
                  opacity={0.5}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  placeholder="•••••••••"
                  className="bg-transparent outline-none flex-1 text-sm"
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                {showPassword ? (
                  <EyeClosed
                    color="#d18c15"
                    strokeWidth={1.75}
                    className="cursor-pointer"
                    opacity={0.5}
                    onClick={() => setShowPassword(!showPassword)}
                  />
                ) : (
                  <Eye
                    color="#d18c15"
                    strokeWidth={1.75}
                    className="cursor-pointer"
                    opacity={0.5}
                    onClick={() => setShowPassword(!showPassword)}
                  />
                )}
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-outline btn-warning w-full max-w-md mt-4 bg-[#d08e17] text-white text-shadow-2xs text-shadow-gray-400 text-lg"
              disabled={isLoggingIn}>
              {isLoggingIn ? (
                <>
                  <LoaderCircle
                    color="#e8e4de"
                    strokeWidth={1.75}
                    className="animate-spin"
                  />
                  Loading...
                </>
              ) : (
                "Login"
              )}
            </button>
          </form>

          <div>
            <p className="text-sm text-gray-400">
              Don't have an account?
              <Link to="/signup" className="text-amber-600 font-semibold">
                SignUp
              </Link>
            </p>
          </div>
        </div>

        {/* Right side image */}
        <div className="flex items-center justify-center w-full bg-gray-900 min-h-screen">
          <div className="flex flex-col items-center justify-center w-full">
            <AuthImagePattern />
            <div className="flex flex-col items-center justify-center max-w-80 flex-wrap text-center mt-5">
              <p className="text-xl font-semibold pb-2">Join our community</p>
              <p className="text-xs opacity-50">
                Connect with friend, share moments and stay in touched with your
                loved ones.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage