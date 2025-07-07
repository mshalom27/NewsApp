import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"
import { Link } from "react-router-dom"
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

const DashboardPosts = () => {
  const { currentUser } = useSelector((state) => state.user)

  const [userPosts, setUserPosts] = useState([])
  // console.log(userPosts)

  const [showMore, setShowMore] = useState(true)
  const [postIdToDelete, setPostIdToDelete] = useState("")

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`)

        const data = await res.json()

        if (res.ok) {
          setUserPosts(data.posts)

          if (data.posts.length < 9) {
            setShowMore(false)
          }
        }
      } catch (error) {
        console.log(error)
      }
    }

    if (currentUser.isAdmin) {
      fetchPosts()
    }
  }, [currentUser._id])

  const handleShowMore = async () => {
    const startIndex = userPosts.length

    try {
      const res = await fetch(
        `/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`
      )

      const data = await res.json()

      if (res.ok) {
        setUserPosts((prev) => [...prev, ...data.posts])

        if (data.posts.length < 9) {
          setShowMore(false)
        }
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  const handleDeletePost = async () => {
    // console.log(postIdToDelete)

    try {
      const res = await fetch(
        `/api/post/deletepost/${postIdToDelete}/${currentUser._id}`,
        {
          method: "DELETE",
        }
      )

      const data = await res.json()

      if (!res.ok) {
        console.log(data.message)
      } else {
        setUserPosts((prev) =>
          prev.filter((post) => post._id !== postIdToDelete)
        )
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    // <div className="flex flex-col items-center justify-center w-full p-3">
    //   {currentUser.isAdmin && userPosts.length > 0 ? (
    //     <>
    //       <Table>
    //         <TableCaption>A list of your published articles.</TableCaption>

    //         <TableHeader>
    //           <TableRow>
    //             <TableHead className="w-[200px]">Date Updated</TableHead>
    //             <TableHead>Post Image</TableHead>
    //             <TableHead>Post Title</TableHead>
    //             <TableHead>Category</TableHead>
    //             <TableHead>Delete</TableHead>
    //             <TableHead>Edit</TableHead>
    //           </TableRow>
    //         </TableHeader>

    //         {userPosts.map((post) => (
    //           <TableBody className="divide-y" key={post._id}>
    //             <TableRow>
    //               <TableCell>
    //                 {new Date(post.updatedAt).toLocaleDateString()}
    //               </TableCell>

    //               <TableCell>
    //                 <Link to={`/post/${post.slug}`}>
    //                   <img
    //                     src={post.image}
    //                     alt={post.title}
    //                     className="w-20 h-10 object-cover bg-gray-500"
    //                   />
    //                 </Link>
    //               </TableCell>

    //               <TableCell>
    //                 <Link to={`/post/${post.slug}`}>{post.title}</Link>
    //               </TableCell>

    //               <TableCell>{post.category}</TableCell>

    //               <TableCell>
    //                 <AlertDialog>
    //                   <AlertDialogTrigger asChild>
    //                     <span
    //                       onClick={() => {
    //                         setPostIdToDelete(post._id)
    //                       }}
    //                       className="font-medium text-red-600 hover:underline cursor-pointer"
    //                     >
    //                       Delete
    //                     </span>
    //                   </AlertDialogTrigger>

    //                   <AlertDialogContent>
    //                     <AlertDialogHeader>
    //                       <AlertDialogTitle>
    //                         Are you absolutely sure?
    //                       </AlertDialogTitle>

    //                       <AlertDialogDescription>
    //                         This action cannot be undone. This will permanently
    //                         delete your post and remove your data from our
    //                         servers.
    //                       </AlertDialogDescription>
    //                     </AlertDialogHeader>

    //                     <AlertDialogFooter>
    //                       <AlertDialogCancel>Cancel</AlertDialogCancel>
    //                       <AlertDialogAction
    //                         className="bg-red-600"
    //                         onClick={handleDeletePost}
    //                       >
    //                         Continue
    //                       </AlertDialogAction>
    //                     </AlertDialogFooter>
    //                   </AlertDialogContent>
    //                 </AlertDialog>
    //               </TableCell>

    //               <TableCell>
    //                 <Link
    //                   to={`/update-post/${post._id}`}
    //                   className="font-medium text-green-600 hover:underline cursor-pointer"
    //                 >
    //                   <span>Edit</span>
    //                 </Link>
    //               </TableCell>
    //             </TableRow>
    //           </TableBody>
    //         ))}
    //       </Table>

    //       {showMore && (
    //         <button
    //           onClick={handleShowMore}
    //           className="w-full text-blue-700 self-center text-sm py-7"
    //         >
    //           Show more
    //         </button>
    //       )}
    //     </>
    //   ) : (
    //     <p>You have no posts yet!</p>
    //   )}
    // </div>

    <div className="flex flex-col items-center justify-center w-full p-4 bg-white rounded-md shadow-sm">
  {currentUser.isAdmin && userPosts.length > 0 ? (
    <>
      <Table className="w-full border border-amber-200 text-sm">
        <TableCaption className="text-slate-500 mb-4">
          A list of your published articles.
        </TableCaption>

        <TableHeader className="bg-amber-50">
          <TableRow>
            <TableHead className="w-[160px] text-slate-700">Date Updated</TableHead>
            <TableHead className="text-slate-700">Post Image</TableHead>
            <TableHead className="text-slate-700">Title</TableHead>
            <TableHead className="text-slate-700">Category</TableHead>
            <TableHead className="text-slate-700">Delete</TableHead>
            <TableHead className="text-slate-700">Edit</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {userPosts.map((post) => (
            <TableRow
              key={post._id}
              className="even:bg-amber-50 hover:bg-amber-100 transition-colors"
            >
              <TableCell>{new Date(post.updatedAt).toLocaleDateString()}</TableCell>

              <TableCell>
                <Link to={`/post/${post.slug}`}>
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-20 h-10 object-cover rounded-sm border border-gray-300"
                  />
                </Link>
              </TableCell>

              <TableCell className="text-slate-800 font-medium">
                <Link to={`/post/${post.slug}`} className="hover:underline">
                  {post.title}
                </Link>
              </TableCell>

              <TableCell className="text-gray-500">{post.category}</TableCell>

              <TableCell>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <span
                      onClick={() => setPostIdToDelete(post._id)}
                      className="text-red-600 hover:underline cursor-pointer"
                    >
                      Delete
                    </span>
                  </AlertDialogTrigger>

                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-slate-800">
                        Are you absolutely sure?
                      </AlertDialogTitle>

                      <AlertDialogDescription className="text-slate-600">
                        This action cannot be undone. This will permanently delete your post.
                      </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        className="bg-red-600 hover:bg-red-700 text-white"
                        onClick={handleDeletePost}
                      >
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>

              <TableCell>
                <Link
                  to={`/update-post/${post._id}`}
                  className="text-green-600 hover:underline"
                >
                  Edit
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {showMore && (
        <button
          onClick={handleShowMore}
          className="w-full text-amber-600 hover:underline text-sm mt-6"
        >
          Show more
        </button>
      )}
    </>
  ) : (
    <p className="text-slate-500 italic">You have no posts yet!</p>
  )}
</div>

  )
}

export default DashboardPosts
