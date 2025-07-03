import React from "react"
import { Button } from "../ui/button"
import { Link } from "react-router-dom"

const Advertise = () => {
  return (

    <div className="flex flex-col md:flex-row items-center justify-center p-6 md:p-10 bg-yellow-50 border border-amber-500 rounded-tl-3xl rounded-br-3xl shadow-sm">

  <div className="flex-1 w-full md:w-3/5 p-4 space-y-4 text-center md:text-left">
    <h2 className="text-3xl font-bold text-slate-800 leading-snug">
      Want to know today’s{" "}
      <span className="text-red-600">TOP 10</span> news?
    </h2>

    <p className="text-gray-600 text-base">
      Today's top headlines from around the world, all in one place. Stay
    </p>

    <Button className="bg-amber-500 hover:bg-amber-600 transition text-white text-base px-4 py-2 rounded-md w-fit mx-auto md:mx-0">
      <Link
        to="https://google.com"
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        Stay Updated with Daily News
      </Link>
    </Button>
  </div>

  <div className="w-full md:w-2/5 p-4">
    <img
      src="https://images.pexels.com/photos/723072/pexels-photo-723072.jpeg?auto=compress&cs=tinysrgb&w=600"
      alt="Top News"
      className="w-full h-auto rounded-md object-cover shadow-md"
    />
  </div>
</div>

  )
}

export default Advertise
