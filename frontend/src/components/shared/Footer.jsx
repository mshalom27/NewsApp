import React from "react"
import { Link } from "react-router-dom"

const Footer = () => {
  return (
    
    <div className="bg-gray-900 text-gray-300 py-10">
  <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-10">
   <div>
      <h2 className="text-xl font-semibold text-gray-200 mb-4">About Us</h2>
      <p className="text-sm leading-relaxed text-gray-400">
        NewsWorld is committed to delivering fast, accurate, and reliable news.
        Our mission is to enrich lives with timely stories and insights that matter.
      </p>
    </div>

    <div>
      <h2 className="text-xl font-semibold text-gray-200 mb-4">Quick Links</h2>
      <ul className="space-y-3 text-sm">
        <li>
          <Link to="/" className="hover:text-amber-500 transition-colors duration-200">Home</Link>
        </li>
        <li>
          <Link to="/about" className="hover:text-amber-500 transition-colors duration-200">About Us</Link>
        </li>
        <li>
          <Link to="/news" className="hover:text-amber-500 transition-colors duration-200">News Articles</Link>
        </li>
        <li>
          <Link to="/contact" className="hover:text-amber-500 transition-colors duration-200">Contact</Link>
        </li>
      </ul>
    </div>

    <div>
      <h2 className="text-xl font-semibold text-gray-200 mb-4">Contact Us</h2>
      <ul className="text-sm space-y-2">
        <li className="text-gray-400">📍 1234 Street Name, City, Country</li>
        <li className="text-gray-400">✉️ info@example.com</li>
        <li className="text-gray-400">📞 +91 234 567 890</li>
      </ul>
    </div>
  </div>

  <div className="mt-12 border-t border-gray-700 pt-6 text-center">
    <p className="text-sm text-gray-400">Follow us on:</p>
    <div className="flex justify-center space-x-6 mt-4 text-sm">
      <a href="#" className="hover:text-amber-500 transition-colors">Facebook</a>
      <a href="#" className="hover:text-amber-500 transition-colors">Twitter</a>
      <a href="#" className="hover:text-amber-500 transition-colors">LinkedIn</a>
      <a href="#" className="hover:text-amber-500 transition-colors">Instagram</a>
    </div>
    <p className="mt-6 text-xs text-gray-500">
      &copy; {new Date().getFullYear()} <span className="font-semibold text-white">NewsWorld</span>. All rights reserved.
    </p>
  </div>
</div>

  )
}

export default Footer
