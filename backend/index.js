import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors";

import authRoutes from "./routes/auth.route.js"
import userRoutes from "./routes/user.route.js"
import postRoutes from "./routes/post.route.js"
import commentRoutes from "./routes/comment.route.js"

dotenv.config()

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Database is connected")
  })
  .catch((err) => {
    console.log(err)
  })

const app = express()

app.use(express.json())
app.use(cookieParser())

app.listen(5000, () => {
  console.log("Server is running on port 5000!")
})

app.use("https://newsapp-mwio.onrender.com/api/auth", authRoutes)
app.use("https://newsapp-mwio.onrender.com/api/user", userRoutes)
app.use("https://newsapp-mwio.onrender.com/api/post", postRoutes)
app.use("https://newsapp-mwio.onrender.com/api/comment", commentRoutes)

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500

  const message = err.message || "Internal Server Error"

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  })
})

app.use(
  cors({
    origin: "https://news-app-ten-chi-27.vercel.app/",
    credentials: true,
  })
);