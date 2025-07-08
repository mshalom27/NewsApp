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
import { FaCheck } from "react-icons/fa"
import { RxCross2 } from "react-icons/rx"

const DashboardUsers = () => {
  const { currentUser } = useSelector((state) => state.user)

  const [users, setUsers] = useState([])

  const [showMore, setShowMore] = useState(true)
  const [userIdToDelete, setUserIdToDelete] = useState("")

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`/api/user/getusers`)

        const data = await res.json()

        if (res.ok) {
          setUsers(data.users)

          if (data.users.length < 9) {
            setShowMore(false)
          }
        }
      } catch (error) {
        console.log(error)
      }
    }

    if (currentUser.isAdmin) {
      fetchUsers()
    }
  }, [currentUser._id])

  const handleShowMore = async () => {
    const startIndex = users.length

    try {
      const res = await fetch(`/api/user/getusers?startIndex=${startIndex}`)

      const data = await res.json()

      if (res.ok) {
        setUsers((prev) => [...prev, ...data.users])

        if (data.users.length < 9) {
          setShowMore(false)
        }
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  const handleDeleteUser = async () => {
    try {
      const res = await fetch(`/api/user/delete/${userIdToDelete}`, {
        method: "DELETE",
      })

      const data = await res.json()

      if (res.ok) {
        setUsers((prev) => prev.filter((user) => user._id !== userIdToDelete))
      } else {
        console.log(data.message)
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
  

    <div className="flex flex-col items-center justify-center w-full p-3">
  {currentUser.isAdmin && users.length > 0 ? (
    <>
      <Table>
        <TableCaption className="text-sm text-muted-foreground mt-4">
          A list of your recent subscribers.
        </TableCaption>

        <TableHeader className="bg-amber-100 text-slate-800">
          <TableRow>
            <TableHead className="w-[160px] font-semibold">Joined On</TableHead>
            <TableHead className="font-semibold">User Image</TableHead>
            <TableHead className="font-semibold">Username</TableHead>
            <TableHead className="font-semibold">Email</TableHead>
            <TableHead className="font-semibold">Admin</TableHead>
            <TableHead className="font-semibold text-center">Delete</TableHead>
          </TableRow>
        </TableHeader>

        {users.map((user) => (
          <TableBody className="divide-y" key={user._id}>
            <TableRow className="hover:bg-amber-50">
              <TableCell className="text-sm">
                {new Date(user.createdAt).toLocaleDateString()}
              </TableCell>

              <TableCell>
                <img
                  src={user.profilePicture}
                  alt={user.username}
                  className="w-10 h-10 object-cover rounded-full border border-slate-300"
                />
              </TableCell>

              <TableCell className="font-medium text-slate-700">{user.username}</TableCell>

              <TableCell className="text-slate-600">{user.email}</TableCell>

              <TableCell>
                {user.isAdmin ? (
                  <FaCheck className="text-green-600 text-lg" />
                ) : (
                  <RxCross2 className="text-red-500 text-lg" />
                )}
              </TableCell>

              <TableCell className="text-center">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <span
                      onClick={() => setUserIdToDelete(user._id)}
                      className="text-red-600 hover:underline cursor-pointer text-sm font-medium"
                    >
                      Delete
                    </span>
                  </AlertDialogTrigger>

                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. It will permanently delete this user and
                        all their data.
                      </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        className="bg-red-600"
                        onClick={handleDeleteUser}
                      >
                        Confirm
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          </TableBody>
        ))}
      </Table>

      {showMore && (
        <button
          onClick={handleShowMore}
          className="text-blue-700 hover:underline self-center text-sm py-7"
        >
          Show more
        </button>
      )}
    </>
  ) : (
    <p className="text-slate-600 mt-10 text-sm italic">You have no subscribers yet!</p>
  )}
</div>

  )
}

export default DashboardUsers
