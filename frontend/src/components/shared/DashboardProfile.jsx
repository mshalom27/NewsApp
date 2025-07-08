import React, { useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import {
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutSuccess,
  updateFailure,
  updateStart,
  updateSuccess,
} from "@/redux/user/userSlice"
import { getFilePreview, uploadFile } from "@/lib/appwrite/uploadImage"
import { useToast } from "@/hooks/use-toast"
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

const DashboardProfile = () => {
  const { currentUser, error, loading } = useSelector((state) => state.user)

  const profilePicRef = useRef()
  const dispatch = useDispatch()
  const { toast } = useToast()

  const [imageFile, setImageFile] = useState(null)
  const [imageFileUrl, setImageFileUrl] = useState(null)
  const [formData, setFormData] = useState({})


  const handleImageChange = (e) => {
    const file = e.target.files[0]

    if (file) {
      setImageFile(file)
      setImageFileUrl(URL.createObjectURL(file))
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const uploadImage = async () => {
    if (!imageFile) return currentUser.profilePicture

    try {
      const uploadedFile = await uploadFile(imageFile)
      const profilePictureUrl = getFilePreview(uploadedFile.$id)

      return profilePictureUrl
    } catch (error) {
      toast({ title: "Update user failed. Please try again!" })
      console.log("Image upload failed: ", error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      dispatch(updateStart())

      const profilePicture = await uploadImage()

      const updateProfile = {
        ...formData,
        profilePicture,
      }

      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateProfile),
      })

      const data = await res.json()

      if (data.success === false) {
        toast({ title: "Update user failed. Please try again!" })
        dispatch(updateFailure(data.message))
      } else {
        console.log("I am running")
        dispatch(updateSuccess(data))
        toast({ title: "User updated successfully." })
      }
    } catch (error) {
      toast({ title: "Update user failed. Please try again!" })
      dispatch(updateFailure(error.message))
    }
  }

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart())

      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      })

      const data = await res.json()

      if (!res.ok) {
        dispatch(deleteUserFailure(data.message))
      } else {
        dispatch(deleteUserSuccess())
      }
    } catch (error) {
      console.log(error)
      dispatch(deleteUserFailure(error.message))
    }
  }

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

    <div className="max-w-lg mx-auto p-6 w-full bg-white rounded-xl shadow-md border border-amber-200">
  <h1 className="text-center font-bold text-3xl text-amber-700 mb-6">
    Update Your Profile
  </h1>

  <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
    <input
      type="file"
      accept="image/*"
      hidden
      ref={profilePicRef}
      onChange={handleImageChange}
    />

    <div
      className="w-32 h-32 mx-auto rounded-full overflow-hidden cursor-pointer border-4 border-amber-300 hover:opacity-80 transition"
      onClick={() => profilePicRef.current.click()}
    >
      <img
        src={imageFileUrl || currentUser.profilePicture}
        alt="Profile"
        className="w-full h-full object-cover"
      />
    </div>

    <Input
      type="text"
      id="username"
      placeholder="Username"
      defaultValue={currentUser.username}
      className="h-12 border border-gray-300 focus-visible:ring-amber-400"
      onChange={handleChange}
    />

    <Input
      type="email"
      id="email"
      placeholder="Email"
      defaultValue={currentUser.email}
      className="h-12 border border-gray-300 focus-visible:ring-amber-400"
      onChange={handleChange}
    />

    <Input
      type="password"
      id="password"
      placeholder="New Password"
      className="h-12 border border-gray-300 focus-visible:ring-amber-400"
      onChange={handleChange}
    />

    <Button
      type="submit"
      className="h-12 bg-amber-600 hover:bg-amber-700 text-white font-medium transition"
      disabled={loading}
    >
      {loading ? "Updating..." : "Update Profile"}
    </Button>
  </form>

  <div className="flex justify-between mt-6 text-sm">
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          className="text-red-600 hover:underline font-medium"
        >
          Delete Account
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-slate-800">
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-slate-600">
            This will permanently delete your account and all associated data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-600 text-white"
            onClick={handleDeleteUser}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>

    <Button
      variant="ghost"
      className="text-slate-600 hover:underline font-medium"
      onClick={handleSignout}
    >
      Sign Out
    </Button>
  </div>

  {error && <p className="text-red-600 text-sm mt-4">{error}</p>}
</div>

  )
}

export default DashboardProfile
