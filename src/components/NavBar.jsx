import React, { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext.jsx"
import {
  Calendar, Home, MapPin, User, CreditCard, History, LogOut
} from "lucide-react"
import logo from "../../public/logo/logo.png";


const NavBar = () => {
  const { user, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/sessions", label: "Sessions", icon: Calendar },
    { path: "/locations", label: "Location", icon: MapPin }
  ]

  const userMenuItems = [
    { path: "/profile", label: "Profile" },
    { path: "/my-sessions", label: "My Sessions" },
    { path: "/payments", label: "Payments" },
    { path: "/history", label: "History" }
  ]

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  return (
    <nav className="bg-[#00c2a8] text-white px-6 py-3 shadow flex justify-around items-center relative z-50">
      {/* Left: Logo */}
      <div className="flex items-center space-x-2">
        <div className="text-white font-bold text-xl tracking-wide">
          <img src={logo} alt="" className="h-10 object-contain" />
        </div>
      </div>

      {/* Center: Navigation */}
      <div className="hidden md:flex space-x-8">
        {navItems.map(({ path, label, icon: Icon }) => (
          <Link
            key={path}
            to={path}
            className={`flex items-center gap-1 text-sm font-medium transition-opacity ${
              location.pathname === path ? "opacity-100" : "opacity-70 hover:opacity-100"
            }`}
          >
            <Icon size={16} />
            {label}
          </Link>
        ))}
      </div>

      {/* Right: User dropdown */}
      <div className="relative">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="focus:outline-none"
        >
          <User className="w-6 h-6 text-white" />
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-44 bg-white text-gray-800 rounded-lg shadow-lg py-2 z-50">
            {userMenuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setDropdownOpen(false)}
                className="block px-4 py-2 text-sm hover:bg-gray-100"
              >
                {item.label}
              </Link>
            ))}
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}

export default NavBar
