
import Advertise from "@/components/shared/Advertise"
import PostCard from "@/components/shared/PostCard"
import { Button } from "@/components/ui/button"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import React, { useEffect, useState, useRef } from "react"
import { Link } from "react-router-dom"

const Home = () => {
  const [posts, setPosts] = useState([])
  const scrollRef = useRef(null)

  const features = [
    {
      title: "Curated Coverage",
      description: "Stay updated with handpicked stories across politics, science, culture, and more.",
      icon: "📰",
    },
    {
      title: "Engaged Community",
      description: "Join thoughtful discussions, comment on posts, and connect with like-minded readers.",
      icon: "💬",
    },
    {
      title: "Seamless Experience",
      description: "Enjoy a fast, clean, and intuitive interface across all your devices.",
      icon: "⚡",
    },
    {
      title: "Verified Sources",
      description: "We prioritize accuracy and credibility from trusted publishers.",
      icon: "✅",
    },
    {
      title: "Real-time Updates",
      description: "Stay ahead with breaking news and live updates as they happen.",
      icon: "📡",
    },
    {
      title: "Bookmark Favorites",
      description: "Save articles you love and come back to them anytime.",
      icon: "🔖",
    },
  ]

  const scroll = (dir) => {
    const scrollAmount = scrollRef.current?.offsetWidth || 300
    scrollRef.current?.scrollBy({
      left: dir === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    })
  }

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("https://newsapp-mwio.onrender.com/api/post/getPosts?limit=6")
      const data = await res.json()
      if (res.ok) {
        setPosts(data.posts)
      }
    }
    fetchPosts()
  }, [])

  return (
    <div className="bg-amber-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-amber-100">
        <div className="max-w-7xl mx-auto px-6 py-10 md:py-18 text-center md:text-left">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800 leading-tight">
            Discover Truth With <br />
            <span className="text-amber-600">News</span>
            <span className="text-gray-900">World</span>
          </h1>
          <p className="mt-6 text-lg text-gray-700 max-w-xl">
            Daily headlines, deep dives, and trending updates. The world in your pocket.
          </p>
          <Link to="/search">
            <Button className="mt-6 bg-amber-400 hover:bg-amber-500 text-black py-3 px-6 rounded-full font-semibold shadow-md flex items-center gap-2 w-fit">
              View all posts <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Feature Highlights Section */}
      <section className="py-16 relative bg-amber-100">
        <h2 className="text-5xl font-bold  text-amber-600 text-center mb-10">Why Readers Choose Us</h2>
        <div className="relative max-w-6xl mx-auto px-4">
          {/* Left Arrow */}
          <button
            onClick={() => scroll("left")}
            className="absolute -left-4 top-1/2 -translate-y-1/2 bg-white border shadow-md rounded-full p-2 z-10"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>

          {/* Scrollable Feature Cards */}
          <div
            ref={scrollRef}
            className="overflow-x-auto scrollbar-hide flex gap-6 scroll-smooth snap-x snap-mandatory"
            style={{ scrollBehavior: "smooth", scrollSnapType: "x mandatory" }}
          >
            {features.map((feature, i) => (
              <div key={i} className="snap-start w-[300px] flex-shrink-0">
                <FeatureCard {...feature} />
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => scroll("right")}
            className="absolute -right-4 top-1/2 -translate-y-1/2 bg-white border shadow-md rounded-full p-2 z-10"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </section>

      {/* Ad Section */}
      <div className="px-4 py-6">
        <Advertise />
      </div>

      {/* Recent Posts Section */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {posts?.length > 0 && (
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold text-gray-800">Recent Posts</h2>
            <div className="flex flex-wrap gap-6 justify-center sm:justify-start">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            <Link
              to="/search"
              className="text-lg hover:underline text-center font-semibold text-amber-700"
            >
              View all news
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

const FeatureCard = ({ title, description, icon }) => {
  return (
    <div className="bg-gray-100 rounded-xl p-6 shadow hover:shadow-lg transition-shadow duration-300 h-full flex flex-col items-center justify-start text-center">
      <div className="text-4xl mb-3">{icon}</div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  )
}

export default Home

