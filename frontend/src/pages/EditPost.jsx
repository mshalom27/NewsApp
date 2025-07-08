// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select"
// import { useToast } from "@/hooks/use-toast"
// import { getFilePreview, uploadFile } from "@/lib/appwrite/uploadImage"
// import React, { useEffect, useState } from "react"
// import ReactQuill from "react-quill"
// import "react-quill/dist/quill.snow.css"
// import { useSelector } from "react-redux"
// import { useNavigate, useParams } from "react-router-dom"

// const EditPost = () => {
//   const { toast } = useToast()
//   const navigate = useNavigate()
//   const { postId } = useParams()

//   const { currentUser } = useSelector((state) => state.user)

//   const [file, setFile] = useState(null)
//   const [imageUploadError, setImageUploadError] = useState(null)
//   const [imageUploading, setImageUploading] = useState(false)

//   const [formData, setFormData] = useState({
//     title: "", 
//   category: "",
//   content: "",
//   image: ""
//   })

//   console.log(formData)
//   console.log("Image URL:", formData.image)


//   const [updatePostError, setUpdatePostError] = useState(null)

//   useEffect(() => {
//     try {
//       const fetchPost = async () => {
//         const res = await fetch(`/api/post/getposts?postId=${postId}`)

//         const data = await res.json()

//         if (!res.ok) {
//           console.log(data.message)
//           setUpdatePostError(data.message)

//           return
//         }

//         if (res.ok) {
//           setUpdatePostError(null)
//           setFormData(data.posts[0])
//         }
//       }

//       fetchPost()
//     } catch (error) {
//       console.log(error.message)
//     }
//   }, [postId])

//   const handleUploadImage = async () => {
//     try {
//       if (!file) {
//         setImageUploadError("Please select an image!")
//         toast({ title: "Please select an image!" })
//         return
//       }

//       setImageUploading(true)

//       setImageUploadError(null)

//       const uploadedFile = await uploadFile(file)
//       const postImageUrl = getFilePreview(uploadedFile.$id)

//       setFormData({ ...formData, image: postImageUrl })

//       toast({ title: "Image Uploaded Successfully!" })

//       if (postImageUrl) {
//         setImageUploading(false)
//       }
//     } catch (error) {
//       setImageUploadError("Image upload failed")
//       console.log(error)

//       toast({ title: "Image upload failed!" })
//       setImageUploading(false)
//     }
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()

//     console.log(formData._id)

//     try {
//       const res = await fetch(
//         `/api/post/updatepost/${postId}/${currentUser._id}`,
//         {
//           method: "PUT",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(formData),
//         }
//       )

//       const data = await res.json()

//       if (!res.ok) {
//         toast({ title: "Something went wrong! Please try again." })
//         setUpdatePostError(data.message)

//         return
//       }

//       if (res.ok) {
//         toast({ title: "Article Published Successfully!" })
//         setUpdatePostError(null)

//         navigate(`/post/${data.slug}`)
//       }
//     } catch (error) {
//       toast({ title: "Something went wrong! Please try again." })
//       setUpdatePostError("Something went wrong! Please try again.")
//     }
//   }

//   return (
    
//     <div className="p-4 sm:p-6 max-w-4xl mx-auto min-h-screen bg-yellow-50">
//   <h1 className="text-center text-3xl font-bold text-slate-800 my-8">
//     Edit Article
//   </h1>

//   <form className="flex flex-col gap-6" onSubmit={handleSubmit}>

//     <div className="flex flex-col sm:flex-row gap-4 justify-between">
//       <Input
//         type="text"
//         id="title"
//         placeholder="Enter article title"
//         required
//         className="w-full sm:w-3/4 h-12 border border-gray-300 rounded-md px-4 focus:ring-2 focus:ring-amber-500 focus:outline-none"
//         value={formData.title}
//         onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//       />

//       <Select
//         onValueChange={(value) => setFormData({ ...formData, category: value })}
//         value={formData.category}
//       >
//         <SelectTrigger className="w-full sm:w-1/4 h-12 border border-gray-300 rounded-md px-4 focus:ring-2 focus:ring-amber-500 focus:outline-none">
//           <SelectValue placeholder="Select a Category" />
//         </SelectTrigger>
//         <SelectContent>
//           <SelectGroup>
//             <SelectLabel>Category</SelectLabel>
//             <SelectItem value="worldnews">World News</SelectItem>
//             <SelectItem value="sportsnews">Sports News</SelectItem>
//             <SelectItem value="localnews">Local News</SelectItem>
//           </SelectGroup>
//         </SelectContent>
//       </Select>
//     </div>

//     <div className="flex flex-col sm:flex-row gap-4 items-center justify-between border-2 border-amber-400 border-dashed rounded-md p-4 bg-white">
//       <Input
//         type="file"
//         accept="image/*"
//         onChange={(e) => setFile(e.target.files[0])}
//         className="w-full sm:w-auto"
//       />

//       <Button
//         type="button"
//         className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-4 py-2 rounded-md transition"
//         onClick={handleUploadImage}
//       >
//         {imageUploading ? "Uploading..." : "Upload Image"}
//       </Button>
//     </div>

//     {imageUploadError && (
//       <p className="text-red-600 text-sm">{imageUploadError}</p>
//     )}

//     {formData.image && (
//       <img
//         src={formData.image}
//         alt="Uploaded preview"
//         className="w-full h-72 object-cover rounded-md"
//       />
//     )}

//     <ReactQuill
//       theme="snow"
//       placeholder="Write your article here..."
//       className="h-72 bg-white rounded-md"
//       value={formData.content}
//       onChange={(value) => setFormData({ ...formData, content: value })}
//       required
//     />

//     <Button
//       type="submit"
//       className="bg-green-600 hover:bg-green-700 text-white font-semibold h-12 rounded-md"
//     >
//       Update Your Article
//     </Button>

//     {updatePostError && (
//       <p className="text-red-600 text-sm mt-2">{updatePostError}</p>
//     )}
//   </form>
// </div>

//   )
// }

// export default EditPost

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { uploadFile } from "@/lib/appwrite/uploadImage"
import { storage, appwriteConfig } from "@/lib/appwrite/config"
import React, { useEffect, useState } from "react"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"

const EditPost = () => {
  const { toast } = useToast()
  const navigate = useNavigate()
  const { postId } = useParams()

  const { currentUser } = useSelector((state) => state.user)

  const [file, setFile] = useState(null)
  const [imageUploadError, setImageUploadError] = useState(null)
  const [imageUploading, setImageUploading] = useState(false)

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    content: "",
    image: "",
  })

  const [updatePostError, setUpdatePostError] = useState(null)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/post/getposts?postId=${postId}`)
        const data = await res.json()

        if (!res.ok) {
          console.log(data.message)
          setUpdatePostError(data.message)
          return
        }

        setUpdatePostError(null)
        setFormData(data.posts[0])
      } catch (error) {
        console.log(error.message)
      }
    }

    fetchPost()
  }, [postId])

  const handleUploadImage = async () => {
    try {
      if (!file) {
        setImageUploadError("Please select an image!")
        toast({ title: "Please select an image!" })
        return
      }

      setImageUploading(true)
      setImageUploadError(null)

      const uploadedFile = await uploadFile(file)

      const postImageUrl = storage.getFileView(
        appwriteConfig.storageId,
        uploadedFile.$id
      )

      setFormData({ ...formData, image: postImageUrl })
      toast({ title: "Image Uploaded Successfully!" })

      setImageUploading(false)
    } catch (error) {
      setImageUploadError("Image upload failed")
      console.log(error)
      toast({ title: "Image upload failed!" })
      setImageUploading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await fetch(
        `/api/post/updatepost/${postId}/${currentUser._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      )

      const data = await res.json()

      if (!res.ok) {
        toast({ title: "Something went wrong! Please try again." })
        setUpdatePostError(data.message)
        return
      }

      toast({ title: "Article Updated Successfully!" })
      setUpdatePostError(null)
      navigate(`/post/${data.slug}`)
    } catch (error) {
      toast({ title: "Something went wrong! Please try again." })
      setUpdatePostError("Something went wrong! Please try again.")
    }
  }

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto min-h-screen bg-yellow-50">
      <h1 className="text-center text-3xl font-bold text-slate-800 my-8">
        Edit Article
      </h1>

      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <Input
            type="text"
            id="title"
            placeholder="Enter article title"
            required
            className="w-full sm:w-3/4 h-12 border border-gray-300 rounded-md px-4 focus:ring-2 focus:ring-amber-500 focus:outline-none"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />

          <Select
            onValueChange={(value) =>
              setFormData({ ...formData, category: value })
            }
            value={formData.category}
          >
            <SelectTrigger className="w-full sm:w-1/4 h-12 border border-gray-300 rounded-md px-4 focus:ring-2 focus:ring-amber-500 focus:outline-none">
              <SelectValue placeholder="Select a Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Category</SelectLabel>
                <SelectItem value="worldnews">World News</SelectItem>
                <SelectItem value="sportsnews">Sports News</SelectItem>
                <SelectItem value="localnews">Local News</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between border-2 border-amber-400 border-dashed rounded-md p-4 bg-white">
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full sm:w-auto"
          />

          <Button
            type="button"
            className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-4 py-2 rounded-md transition"
            onClick={handleUploadImage}
          >
            {imageUploading ? "Uploading..." : "Upload Image"}
          </Button>
        </div>

        {imageUploadError && (
          <p className="text-red-600 text-sm">{imageUploadError}</p>
        )}

        {formData.image && (
          <img
            src={formData.image}
            alt="Uploaded preview"
            className="w-full h-72 object-cover rounded-md"
          />
        )}

        <ReactQuill
          theme="snow"
          placeholder="Write your article here..."
          className="h-72 bg-white rounded-md"
          value={formData.content}
          onChange={(value) => setFormData({ ...formData, content: value })}
          required
        />

        <Button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold h-12 rounded-md"
        >
          Update Your Article
        </Button>

        {updatePostError && (
          <p className="text-red-600 text-sm mt-2">{updatePostError}</p>
        )}
      </form>
    </div>
  )
}

export default EditPost
