import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { Textarea } from "../ui/textarea"
import { Button } from "../ui/button"
import { useToast } from "@/hooks/use-toast"
import Comment from "./Comment"

const CommentSection = ({ postId }) => {
  const { toast } = useToast()
  const navigate = useNavigate()

  const { currentUser } = useSelector((state) => state.user)
  const [comment, setComment] = useState("")
  const [allComments, setAllComments] = useState([])


  const handleSubmit = async (e) => {
    e.preventDefault()

    if (comment.length > 200) {
      toast({
        title: "Comment length must be lower than or equal to 200 characters",
      })

      return
    }

    try {
      const res = await fetch("https://newsapp-mwio.onrender.com/api/comment/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: comment,
          postId,
          userId: currentUser._id,
        }),
      })

      const data = await res.json()

      if (res.ok) {
        toast({ title: "Comment successfully!" })
        setComment("")
        setAllComments([data, ...allComments])
      }
    } catch (error) {
      console.log(error)
      toast({ title: "Something went wrong! Please try again." })
    }
  }

  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await fetch(`https://newsapp-mwio.onrender.com/api/comment/getPostComments/${postId}`)

        if (res.ok) {
          const data = await res.json()
          setAllComments(data)
        }
      } catch (error) {
        console.log(error)
      }
    }

    getComments()
  }, [postId])

  const handleLike = async (commentId) => {
    try {
      if (!currentUser) {
        navigate("/sign-in")
        return
      }

      const res = await fetch(`https://newsapp-mwio.onrender.com/api/comment/likeComment/${commentId}`, {
        method: "PUT",
      })

      if (res.ok) {
        const data = await res.json()

        setAllComments(
          allComments.map((comment) =>
            comment._id === commentId
              ? {
                  ...comment,
                  likes: data.likes,
                  numberOfLikes: data.likes.length,
                }
              : comment
          )
        )
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  const handleEdit = async (comment, editedContent) => {
    setAllComments(
      allComments.map((c) =>
        c._id === comment._id ? { ...c, content: editedContent } : c
      )
    )
  }

  const handleDelete = async (commentId) => {
    try {

      if (!currentUser) {
        navigate("/sign-in")

        return
      }

      const res = await fetch(`https://newsapp-mwio.onrender.com/api/comment/deleteComment/${commentId}`, {
        method: "DELETE",
      })

      if (res.ok) {
        const data = await res.json()

        setAllComments(
          allComments.filter((comment) => comment._id !== commentId)
        )
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    
    <div className="max-w-3xl mx-auto w-full p-4">
  {currentUser ? (
    <div className="flex items-center gap-2 my-5 text-slate-600 text-sm">
      <p>Signed in as:</p>
      <img
        src={currentUser.profilePicture}
        alt="Profile Pic"
        className="h-5 w-5 object-cover rounded-full"
      />
      <Link
        to={"/dashboard?tab=profile"}
        className="text-amber-600 hover:underline"
      >
        @{currentUser.username}
      </Link>
    </div>
  ) : (
    <div className="text-sm text-slate-700 my-5 flex flex-wrap items-center gap-1">
      You must be signed in to comment.
      <Link to={"/sign-in"} className="text-amber-600 hover:underline">
        Sign In
      </Link>
    </div>
  )}

  {currentUser && (
    <form
      className="border-2 border-amber-200 bg-white rounded-lg p-4 shadow-sm"
      onSubmit={handleSubmit}
    >
      <Textarea
        placeholder="Add a comment..."
        rows="3"
        maxLength="200"
        className="border border-amber-200 focus:ring-amber-500 focus:outline-none rounded-md"
        onChange={(e) => setComment(e.target.value)}
        value={comment}
      />

      <div className="flex justify-between items-center mt-4">
        <p className="text-gray-500 text-xs">
          {200 - comment.length} characters remaining
        </p>
        <Button
          type="submit"
          className="bg-amber-500 hover:bg-amber-600 text-white text-sm px-4 py-2"
        >
          Submit
        </Button>
      </div>
    </form>
  )}

  {allComments.length === 0 ? (
    <p className="text-sm text-gray-500 mt-6">No comments yet!</p>
  ) : (
    <>
      <div className="text-sm mt-8 mb-5 flex items-center gap-2 font-semibold text-slate-700">
        <p>Comments</p>
        <div className="border border-amber-300 py-0.5 px-2 rounded-full bg-amber-50 text-amber-600 text-xs font-bold">
          {allComments.length}
        </div>
      </div>

      {allComments.map((comment) => (
        <Comment
          key={comment._id}
          comment={comment}
          onLike={handleLike}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ))}
    </>
  )}
</div>

  )
}

export default CommentSection
