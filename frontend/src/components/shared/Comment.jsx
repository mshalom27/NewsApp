import moment from "moment"
import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { AiFillLike } from "react-icons/ai"
import { Textarea } from "../ui/textarea"
import { Button } from "../ui/button"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog"

const Comment = ({ comment, onLike, onEdit, onDelete }) => {
  const [user, setUser] = useState({})

  const [isEditing, setIsEditing] = useState(false)
  const [editedContent, setEditedContent] = useState(comment.content)

  const { currentUser } = useSelector((state) => state.user)

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/user/${comment.userId}`)

        const data = await res.json()

        if (res.ok) {
          setUser(data)
        }
      } catch (error) {
        console.log(error.message)
      }
    }

    getUser()
  }, [comment])

  const handleEdit = () => {
    setIsEditing(true)
    setEditedContent(comment.content)
  }

  const handleSave = async () => {
    try {
      const res = await fetch(`/api/comment/editComment/${comment._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: editedContent,
        }),
      })

      if (res.ok) {
        setIsEditing(false)
        onEdit(comment, editedContent)
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  return (

    <div className="flex p-4 border-b border-amber-100 text-sm gap-3 bg-white">
  <div className="flex-shrink-0">
    <img
      src={user.profilePicture}
      alt={user.username}
      className="w-10 h-10 rounded-full bg-amber-100 object-cover"
    />
  </div>

  <div className="flex-1">
    <div className="flex items-center mb-1 justify-between">
      <span className="font-semibold text-slate-800 truncate">
        {user ? `@${user.username}` : "Unknown"}
      </span>
      <span className="text-gray-400 text-xs">
        {moment(comment.createdAt).fromNow()}
      </span>
    </div>

    {isEditing ? (
      <>
        <Textarea
          className="mb-2 border border-amber-300 focus:ring-amber-500"
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
        />
        <div className="flex justify-end gap-2">
          <Button
            type="button"
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded-md text-sm"
            onClick={handleSave}
          >
            Save
          </Button>
          <Button
            type="button"
            variant="outline"
            className="border-red-400 text-red-500 hover:bg-red-50 text-sm"
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </Button>
        </div>
      </>
    ) : (
      <>
\        <p className="text-slate-700 mb-3">{comment.content}</p>

        <div className="flex items-center gap-4 text-xs text-slate-500 border-t border-amber-100 pt-2">
          <button
            type="button"
            onClick={() => onLike(comment._id)}
            className={`hover:text-amber-600 transition ${
              currentUser &&
              comment.likes.includes(currentUser._id) &&
              "text-amber-700"
            }`}
          >
            <AiFillLike className="text-base" />
          </button>

          {comment.numberOfLikes > 0 && (
            <span className="text-gray-500">
              {comment.numberOfLikes}{" "}
              {comment.numberOfLikes === 1 ? "like" : "likes"}
            </span>
          )}

          {currentUser &&
            (currentUser._id === comment.userId || currentUser.isAdmin) && (
              <>
                <button
                  type="button"
                  onClick={handleEdit}
                  className="text-green-600 hover:underline"
                >
                  Edit
                </button>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <span className="text-red-500 hover:underline cursor-pointer">
                      Delete
                    </span>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. Your comment will be
                        permanently deleted.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        className="bg-red-600 text-white hover:bg-red-700"
                        onClick={() => onDelete(comment._id)}
                      >
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </>
            )}
        </div>
      </>
    )}
  </div>
</div>

  )
}

export default Comment
