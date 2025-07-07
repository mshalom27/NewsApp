import { signOutSuccess } from "@/redux/user/userSlice"
import React from "react"
import { FaComments, FaSignOutAlt, FaUserAlt, FaUsers } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { IoIosCreate, IoIosDocument } from "react-icons/io"
import { MdDashboardCustomize } from "react-icons/md"

const DashboardSidebar = () => {
  const dispatch = useDispatch()

  const { currentUser } = useSelector((state) => state.user)

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/user/signout", {
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
    // <aside className="h-screen w-64 bg-slate-200 text-slate-800 flex flex-col">
    //   {/* Logo/ Header */}
    //   <div className="p-4 flex items-center justify-center bg-slate-200">
    //     <h1 className="text-2xl font-bold">Dashboard</h1>
    //   </div>

    //   {/* Navigation Links */}
    //   <nav className="flex-1 p-4">
    //     <ul className="space-y-2">
    //       {currentUser && currentUser.isAdmin && (
    //         <li>
    //           <Link
    //             to={"/dashboard?tab=dashboard"}
    //             className="flex items-center p-2 hover:bg-slate-300 rounded"
    //           >
    //             <MdDashboardCustomize className="mr-3" />
    //             <span>Dashboard</span>
    //           </Link>
    //         </li>
    //       )}

    //       <li>
    //         <Link
    //           to={"/dashboard?tab=profile"}
    //           className="flex items-center p-2 hover:bg-slate-300 rounded"
    //         >
    //           <FaUserAlt className="mr-3" />
    //           <span>Profile</span>
    //         </Link>
    //       </li>

    //       {currentUser && currentUser.isAdmin && (
    //         <li>
    //           <Link
    //             to={"/create-post"}
    //             className="flex items-center p-2 hover:bg-slate-300 rounded"
    //           >
    //             <IoIosCreate className="mr-3" />
    //             <span>Create Post</span>
    //           </Link>
    //         </li>
    //       )}

    //       {currentUser && currentUser.isAdmin && (
    //         <li>
    //           <Link
    //             to={"/dashboard?tab=posts"}
    //             className="flex items-center p-2 hover:bg-slate-300 rounded"
    //           >
    //             <IoIosDocument className="mr-3" />
    //             <span>Your articles</span>
    //           </Link>
    //         </li>
    //       )}

    //       {currentUser && currentUser.isAdmin && (
    //         <li>
    //           <Link
    //             to={"/dashboard?tab=users"}
    //             className="flex items-center p-2 hover:bg-slate-300 rounded"
    //           >
    //             <FaUsers className="mr-3" />
    //             <span>All Users</span>
    //           </Link>
    //         </li>
    //       )}

    //       {currentUser && currentUser.isAdmin && (
    //         <li>
    //           <Link
    //             to={"/dashboard?tab=comments"}
    //             className="flex items-center p-2 hover:bg-slate-300 rounded"
    //           >
    //             <FaComments className="mr-3" />
    //             <span>All Comments</span>
    //           </Link>
    //         </li>
    //       )}
    //     </ul>

    //     <div className="p-4 border-t border-gray-700">
    //       <button
    //         className="flex items-center w-full p-2 hover:bg-slate-300 rounded"
    //         onClick={handleSignout}
    //       >
    //         <FaSignOutAlt className="mr-3" />
    //         <span>Logout</span>
    //       </button>
    //     </div>
    //   </nav>
    // </aside>

    <aside className="h-screen w-64 bg-amber-50 text-slate-800 border-r border-amber-200 flex flex-col shadow-md">
  {/* Logo / Header */}
  <div className="p-5 bg-amber-100 flex items-center justify-center border-b border-amber-200">
    <h1 className="text-2xl font-bold text-amber-700 tracking-wide">NewsWorld</h1>
  </div>

  {/* Navigation Links */}
  <nav className="flex-1 p-4">
    <ul className="space-y-2 font-medium">
      {currentUser?.isAdmin && (
        <li>
          <Link
            to="/dashboard?tab=dashboard"
            className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-amber-100 transition"
          >
            <MdDashboardCustomize className="text-amber-700" />
            <span>Dashboard</span>
          </Link>
        </li>
      )}

      <li>
        <Link
          to="/dashboard?tab=profile"
          className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-amber-100 transition"
        >
          <FaUserAlt className="text-amber-700" />
          <span>Profile</span>
        </Link>
      </li>

      {currentUser?.isAdmin && (
        <>
          <li>
            <Link
              to="/create-post"
              className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-amber-100 transition"
            >
              <IoIosCreate className="text-amber-700" />
              <span>Create Post</span>
            </Link>
          </li>

          <li>
            <Link
              to="/dashboard?tab=posts"
              className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-amber-100 transition"
            >
              <IoIosDocument className="text-amber-700" />
              <span>Your Articles</span>
            </Link>
          </li>

          <li>
            <Link
              to="/dashboard?tab=users"
              className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-amber-100 transition"
            >
              <FaUsers className="text-amber-700" />
              <span>All Users</span>
            </Link>
          </li>

          <li>
            <Link
              to="/dashboard?tab=comments"
              className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-amber-100 transition"
            >
              <FaComments className="text-amber-700" />
              <span>All Comments</span>
            </Link>
          </li>
        </>
      )}
    </ul>
  </nav>

  {/* Sign Out */}
  <div className="p-4 border-t border-amber-200">
    <button
      className="flex items-center w-full gap-3 px-3 py-2 rounded-md hover:bg-red-100 text-red-700 transition"
      onClick={handleSignout}
    >
      <FaSignOutAlt />
      <span>Logout</span>
    </button>
  </div>
</aside>

  )
}

export default DashboardSidebar
