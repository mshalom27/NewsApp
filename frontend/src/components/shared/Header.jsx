import React, { useEffect, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { FaSearch } from "react-icons/fa"
import { Button } from "../ui/button"
import { useDispatch, useSelector } from "react-redux"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { signOutSuccess } from "@/redux/user/userSlice"

const Header = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()

  const { currentUser } = useSelector((state) => state.user)

  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)

    const searchTermFromUrl = urlParams.get("searchTerm")

    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl)
    }
  }, [location.search])

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

  const handleSubmit = (e) => {
    e.preventDefault()

    const urlParams = new URLSearchParams(location.search)
    urlParams.set("searchTerm", searchTerm)

    const searchQuery = urlParams.toString()

    navigate(`/search?${searchQuery}`)
  }

  return (

  <header className="shadow-md sticky top-0 bg-gray-800 z-50 text-white">
  <div className="flex justify-between items-center max-w-6xl lg:max-w-7xl mx-auto p-4">
    <Link to={"/"} aria-label="Go to homepage">
      <h1 className="font-bold text-xl sm:text-2xl flex flex-wrap cursor-pointer select-none">
        <span className="text-amber-400">News</span>
        <span className="text-white">World</span>
      </h1>
    </Link>

    <form
      className="p-2 bg-gray-700 rounded-lg flex items-center"
      onSubmit={handleSubmit}
      role="search"
      aria-label="Site search"
    >
      <input
        type="search"
        placeholder="Search..."
        className="focus:outline-none bg-transparent w-24 sm:w-64 text-white placeholder-gray-300"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        aria-label="Search articles"
      />

      <button
        type="submit"
        aria-label="Search"
        className="ml-2 text-amber-400 hover:text-amber-500 transition-colors"
      >
        <FaSearch size={18} />
      </button>
    </form>

    <nav>
      <ul className="flex gap-4">
        {["Home", "About", "News Articles"].map((item) => {
          const path = item === "Home" ? "/" : `/${item.toLowerCase().replace(" ", "")}`;
          return (
            <Link key={item} to={path}>
              <li className="hidden lg:inline text-gray-300 hover:text-amber-400 cursor-pointer select-none transition-colors">
                {item}
              </li>
            </Link>
          );
        })}
      </ul>
    </nav>

    {currentUser ? (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            aria-label="Open user menu"
            className="focus:outline-none rounded-full overflow-hidden"
          >
            <img
              src={currentUser.profilePicture}
              alt={`${currentUser.username} profile`}
              className="w-10 h-10 rounded-full border-2 border-amber-400"
              loading="lazy"
            />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-60 bg-white text-gray-800">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-gray-200" />
          <DropdownMenuItem className="block font-semibold text-sm">
            <div className="flex flex-col gap-1">
              <span>@{currentUser.username}</span>
              <span className="text-xs text-gray-500 truncate">{currentUser.email}</span>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem className="font-semibold mt-2">
            <Link to="/dashboard?tab=profile">Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="font-semibold mt-2 text-red-600" onClick={handleSignout}>
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ) : (
      <Link to={"/sign-in"}>
        <Button className="bg-amber-500 hover:bg-amber-600 text-white">Sign In</Button>
      </Link>
    )}
  </div>
</header>


  )
}

export default Header
