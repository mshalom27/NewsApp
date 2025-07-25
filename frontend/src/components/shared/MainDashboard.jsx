import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import DashboardCard from "./DashboardCard"
import { convertToReadableFormat } from "@/lib/utils"
import { Button } from "../ui/button"
import { Link } from "react-router-dom"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"

const MainDashboard = () => {
  const [users, setUsers] = useState([])
  const [comments, setComments] = useState([])
  const [posts, setPosts] = useState([])

  //   console.log(users)
  //   console.log(comments)
  //   console.log(posts)

  const [totalUsers, setTotalUsers] = useState(0)
  const [totalPosts, setTotalPosts] = useState(0)
  const [totalComments, setTotalComments] = useState(0)
  const [lastMonthUsers, setLastMonthUsers] = useState(0)
  const [lastMonthPosts, setLastMonthPosts] = useState(0)
  const [lastMonthComments, setLastMonthComments] = useState(0)

  const { currentUser } = useSelector((state) => state.user)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("https://newsapp-mwio.onrender.com/api/user/getusers?limit=5")

        const data = await res.json()

        if (res.ok) {
          setUsers(data.users)
          setTotalUsers(data.totalUsers)
          setLastMonthUsers(data.lastMonthUsers)
        }
      } catch (error) {
        console.log(error.message)
      }
    }

    const fetchPosts = async () => {
      try {
        const res = await fetch("https://newsapp-mwio.onrender.com/api/post/getposts?limit=5")

        const data = await res.json()

        if (res.ok) {
          setPosts(data.posts)
          setTotalPosts(data.totalPosts)
          setLastMonthPosts(data.lastMonthPosts)
        }
      } catch (error) {
        console.log(error.message)
      }
    }

    const fetchComments = async () => {
      try {
        const res = await fetch("https://newsapp-mwio.onrender.com/api/comment/getcomments?limit=5")

        const data = await res.json()

        if (res.ok) {
          setComments(data.comments)
          setTotalComments(data.totalComments)
          setLastMonthComments(data.lastMonthComments)
        }
      } catch (error) {
        console.log(error)
      }
    }

    if (currentUser.isAdmin) {
      fetchUsers()
      fetchPosts()
      fetchComments()
    }
  }, [currentUser])

  return (
    
    <div className="p-3 md:mx-auto bg-amber-50 min-h-screen">
  <div className="flex-wrap flex gap-4 justify-center">
    <DashboardCard
      title="All Users"
      description={`${convertToReadableFormat(currentUser.createdAt)} - ${convertToReadableFormat(Date.now())}`}
      chartData={[{ value: totalUsers, fill: "#f59e0b" }]}
      chartConfig={{ users: { label: "Users" } }}
      totalValue={totalUsers}
      lastMonthValue={lastMonthUsers}
      footerText={"Showing total users for all time"}
      endAngle={250}
    />

    <DashboardCard
      title="All Comments"
      description={`${convertToReadableFormat(currentUser.createdAt)} - ${convertToReadableFormat(Date.now())}`}
      chartData={[{ value: totalComments, fill: "#f59e0b" }]}
      chartConfig={{ users: { label: "Users" } }}
      totalValue={totalComments}
      lastMonthValue={lastMonthComments}
      footerText={"Showing total comments for all time"}
      endAngle={160}
    />

    <DashboardCard
      title="All Posts"
      description={`${convertToReadableFormat(currentUser.createdAt)} - ${convertToReadableFormat(Date.now())}`}
      chartData={[{ value: totalPosts, fill: "#f59e0b" }]}
      chartConfig={{ users: { label: "Users" } }}
      totalValue={totalPosts}
      lastMonthValue={lastMonthPosts}
      footerText={"Showing total posts for all time"}
      endAngle={110}
    />
  </div>

  <div className="flex flex-wrap gap-4 py-3 mx-auto justify-center">
    <div className="flex flex-col w-full md:w-auto shadow-lg p-4 rounded-md bg-white border border-amber-100">
      <div className="flex justify-between items-center p-3 text-sm font-semibold">
        <h1 className="text-center p-2 text-xl font-bold text-amber-700">Recent Users</h1>
        <Button className="bg-amber-600 hover:bg-amber-700 text-white">
          <Link to="/dashboard?tab=users">See all</Link>
        </Button>
      </div>
      <Table>
        <TableCaption>A list of your recent users.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-amber-700 font-semibold text-sm uppercase tracking-wide">User image</TableHead>
            <TableHead className="text-amber-700 font-semibold text-sm uppercase tracking-wide">Username</TableHead>
          </TableRow>
        </TableHeader>
        {users.map((user) => (
          <TableBody className="divide-y" key={user._id}>
            <TableRow>
              <TableCell>
                <img
                  src={user.profilePicture}
                  alt={user.username}
                  className="w-10 h-10 object-cover bg-amber-100 rounded-full"
                />
              </TableCell>
              <TableCell className="w-32">{user.username}</TableCell>
            </TableRow>
          </TableBody>
        ))}
      </Table>
    </div>

    <div className="flex flex-col w-full md:w-auto shadow-lg p-4 rounded-md bg-white border border-amber-100">
      <div className="flex justify-between items-center p-3 text-sm font-semibold">
        <h1 className="text-center p-2 text-xl font-bold text-amber-700">Recent Comments</h1>
        <Button className="bg-amber-600 hover:bg-amber-700 text-white">
          <Link to="/dashboard?tab=comments">See all</Link>
        </Button>
      </div>
      <Table>
        <TableCaption>A list of your recent comments.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-amber-700 font-semibold text-sm uppercase tracking-wide">Comments</TableHead>
            <TableHead className="text-amber-700 font-semibold text-sm uppercase tracking-wide">Likes</TableHead>
          </TableRow>
        </TableHeader>
        {comments.map((comment) => (
          <TableBody className="divide-y" key={comment._id}>
            <TableRow>
              <TableCell className="w-96">
                <p className="line-clamp-2">{comment.content}</p>
              </TableCell>
              <TableCell>{comment.numberOfLikes}</TableCell>
            </TableRow>
          </TableBody>
        ))}
      </Table>
    </div>

    <div className="flex flex-col w-full md:w-auto shadow-lg p-4 rounded-md bg-white border border-amber-100">
      <div className="flex justify-between items-center p-3 text-sm font-semibold">
        <h1 className="text-center p-2 text-xl font-bold text-amber-700">Recent Posts</h1>
        <Button className="bg-amber-600 hover:bg-amber-700 text-white">
          <Link to="/dashboard?tab=posts">See all</Link>
        </Button>
      </div>
      <Table>
        <TableCaption>A list of your recent posts.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-amber-700 font-semibold text-sm uppercase tracking-wide">Post image</TableHead>
            <TableHead className="text-amber-700 font-semibold text-sm uppercase tracking-wide">Post Title</TableHead>
            <TableHead className="text-amber-700 font-semibold text-sm uppercase tracking-wide">Category</TableHead>
          </TableRow>
        </TableHeader>
        {posts.map((post) => (
          <TableBody className="divide-y" key={post._id}>
            <TableRow>
              <TableCell>
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-10 h-10 object-cover bg-amber-100 rounded-full"
                />
              </TableCell>
              <TableCell className="w-80">{post.title}</TableCell>
              <TableCell className="w-5">{post.category}</TableCell>
            </TableRow>
          </TableBody>
        ))}
      </Table>
    </div>
  </div>
</div>

  )
}

export default MainDashboard
