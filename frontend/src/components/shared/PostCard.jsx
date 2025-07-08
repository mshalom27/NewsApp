import React from "react"
import { Link } from "react-router-dom"

const PostCard = ({ post }) => {
  return (
    

    <div className="bg-white hover:shadow-xl transition-shadow duration-300 overflow-hidden rounded-lg w-full sm:w-[330px] border border-amber-300">
  <Link
    to={`/post/${post.slug}`}
    className="block h-[250px] w-full overflow-hidden"
  >
    <img
      src={post.image}
      alt="post cover"
      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105 bg-gray-200"
    />
  </Link>

  <div className="p-4 flex flex-col gap-3">
    <p className="text-lg font-bold text-amber-800 line-clamp-1">
      {post.title}
    </p>

    <span className="italic text-sm text-gray-500">{post.category}</span>

    <Link
      to={`/post/${post.slug}`}
      className="mt-auto py-2 text-center text-sm font-medium text-amber-700 border border-amber-500 rounded-md hover:bg-amber-500 hover:text-white transition-colors"
    >
      Read Article
    </Link>
  </div>
</div>

  )
}

export default PostCard
