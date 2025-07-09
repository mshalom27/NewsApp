import { signOutSuccess } from "@/redux/user/userSlice"
import React from "react"
import { FaHome, FaSignOutAlt, FaUserAlt } from "react-icons/fa"
import { IoIosCreate, IoIosDocument } from "react-icons/io"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"

const BottomNavBar = () => {
  const dispatch = useDispatch()

  const { currentUser } = useSelector((state) => state.user)

  const handleSignout = async () => {
    try {
      const res = await fetch("https://newsapp-mwio.onrender.com/api/user/signout", {
        method: "POST",
      })

      const data = await res.json()

      if (!res.ok) {
        console.log(data.message)
      } else {
        dispatch(signOutSuccess())
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-yellow-50 border-t border-amber-300 px-4 py-2 flex justify-around shadow-inner z-50">
  {/* Profile */}
  <Link
    to="/dashboard?tab=profile"
    className="flex flex-col items-center text-slate-700 hover:text-amber-600 transition"
  >
    <FaUserAlt size={20} />
    <span className="text-xs mt-1">Profile</span>
  </Link>

  {/* Create Post (Admin only) */}
  {currentUser?.isAdmin && (
    <Link
      to="/create-post"
      className="flex flex-col items-center text-slate-700 hover:text-amber-600 transition"
    >
      <IoIosCreate size={22} />
      <span className="text-xs mt-1">Create</span>
    </Link>
  )}

  {/* Posts (Admin only) */}
  {currentUser?.isAdmin && (
    <Link
      to="/dashboard?tab=posts"
      className="flex flex-col items-center text-slate-700 hover:text-amber-600 transition"
    >
      <IoIosDocument size={20} />
      <span className="text-xs mt-1">Posts</span>
    </Link>
  )}

  {/* Logout */}
  <button
    onClick={handleSignout}
    className="flex flex-col items-center text-slate-700 hover:text-red-500 transition"
  >
    <FaSignOutAlt size={20} />
    <span className="text-xs mt-1">Logout</span>
  </button>
</nav>

  )
}

export default BottomNavBar
