import Advertise from "@/components/shared/Advertise"
import CommentSection from "@/components/shared/CommentSection"
import PostCard from "@/components/shared/PostCard"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import React, { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

const PostDetails = () => {
  const { postSlug } = useParams()

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [post, setPost] = useState(null)
  const [recentArticles, setRecentArticles] = useState(null)

  console.log(recentArticles)

  // console.log(post)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true)

        const res = await fetch(`https://newsapp-mwio.onrender.com/api/post/getposts?slug=${postSlug}`)

        const data = await res.json()

        if (!res.ok) {
          setError(true)
          setLoading(false)

          return
        }

        if (res.ok) {
          setPost(data.posts[0])
          setLoading(false)
          setError(true)
        }
      } catch (error) {
        setError(true)
        setLoading(false)
      }
    }

    fetchPost()
  }, [postSlug])

  useEffect(() => {
    try {
      const fetchRecentPosts = async () => {
        const res = await fetch(`https://newsapp-mwio.onrender.com/api/post/getposts?limit=3`)

        const data = await res.json()

        if (res.ok) {
          setRecentArticles(data.posts)
        }
      }

      fetchRecentPosts()
    } catch (error) {
      console.log(error.message)
    }
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <img
          src="https://cdn-icons-png.flaticon.com/128/39/39979.png"
          alt="loading"
          className="w-20 animate-spin"
        />
      </div>
    )
  }

  return (
    // <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
    //   <h1 className="text-3xl mt-10 p-3 text-center font-bold max-w-3xl mx-auto lg:text-4xl text-slate-700 underline">
    //     {post && post.title}
    //   </h1>

    //   <Link
    //     to={`/search?category=${post && post.category}`}
    //     className="self-center mt-5"
    //   >
    //     <Button variant="outline" className="border border-slate-500">
    //       {post && post.category}
    //     </Button>
    //   </Link>

    //   <img
    //     src={post && post.image}
    //     alt={post && post.title}
    //     className="mt-10 p-3 max-h-[500px] w-full object-cover"
    //   />

    //   <div className="flex justify-between p-3 mx-auto w-full max-w-2xl text-xs">
    //     <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>

    //     <span className="italic">
    //       {post && (post.content.length / 100).toFixed(0)} mins read
    //     </span>
    //   </div>

    //   <Separator className="bg-slate-500" />

    //   <div
    //     className="p-3 max-w-3xl mx-auto w-full post-content"
    //     dangerouslySetInnerHTML={{ __html: post && post.content }}
    //   ></div>

    //   <div className="max-w-4xl mx-auto w-full">
    //     <Advertise />
    //   </div>

    //   <CommentSection postId={post._id} />

    //   <div className="flex flex-col justify-center items-center mb-5">
    //     <h1 className="text-xl font-semibold mt-5 text-slate-700">
    //       Recently published articles
    //     </h1>

    //     <div className="flex flex-wrap gap-5 my-5 justify-center">
    //       {recentArticles &&
    //         recentArticles.map((post) => (
    //           <PostCard key={post._id} post={post} />
    //         ))}
    //     </div>
    //   </div>
    // </main>

    <main className="px-4 py-6 flex flex-col max-w-6xl mx-auto min-h-screen bg-yellow-50">
  {/* Post Title */}
  <h1 className="text-3xl lg:text-4xl mt-10 mb-2 p-3 text-center font-bold max-w-3xl mx-auto text-slate-800">
    {post && post.title}
  </h1>

  {/* Category Button */}
  <Link to={`/search?category=${post?.category}`} className="self-center mt-2">
    <Button
      variant="outline"
      className="border border-amber-500 text-amber-600 font-medium hover:bg-amber-100 transition"
    >
      {post?.category}
    </Button>
  </Link>

  {/* Post Image */}
  <img
    src={post?.image}
    alt={post?.title}
    className="mt-8 max-h-[500px] w-full object-cover rounded-md shadow-sm"
  />

  {/* Meta Info */}
  <div className="flex justify-between items-center text-sm text-gray-600 px-2 py-4 max-w-2xl mx-auto">
    <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
    <span className="italic">
      {post && (post.content.length / 100).toFixed(0)} mins read
    </span>
  </div>

  {/* Separator */}
  <Separator className="bg-amber-500 h-[2px] my-4 max-w-2xl mx-auto" />

  {/* Content */}
  <div
    className="prose prose-slate lg:prose-lg px-4 py-6 max-w-3xl mx-auto w-full bg-white rounded-md shadow-sm"
    dangerouslySetInnerHTML={{ __html: post?.content }}
  ></div>

  {/* Advertisement */}
  <div className="max-w-4xl mx-auto my-10 px-4">
    <Advertise />
  </div>

  {/* Comments */}
  <CommentSection postId={post._id} />

  {/* Recently Published */}
  <div className="flex flex-col justify-center items-center mt-16 mb-10 px-4">
    <h2 className="text-xl font-semibold text-slate-800 mb-4">
      Recently Published Articles
    </h2>

    <div className="flex flex-wrap gap-6 justify-center">
      {recentArticles?.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  </div>
</main>

  )
}

export default PostDetails
