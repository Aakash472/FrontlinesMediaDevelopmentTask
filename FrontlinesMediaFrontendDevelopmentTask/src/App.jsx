import { useState } from 'react'
import './App.css'
import Home from './Components/Home'

function App() {
  const [sortOrder, setSortOrder] = useState("")

  return (
    <>
      <div className="bg-gray-50 text-gray-800">

        <header className="bg-linear-to-r from-blue-700 to-indigo-300 text-white py-4 shadow-md flex justify-around">
          <h1 className="text-2xl font-bold">Frontlines Media {"</>"}</h1>
          <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className="text-white p-2 bg-gray-700 rounded-lg outline-none cursor-pointer">
            <option value="">Sort By</option>
            <option value="asc">Company Name (A–Z)</option>
            <option value="desc">Company Name (Z–A)</option>
          </select>
        </header>

        <main className="p-4">
          <h2 className="text-3xl text-center font-semibold mb-2 text-gray-800">Companies Directory</h2>
          <p className="text-gray-600 mb-6 text-center">
            Explore and filter companies by name, location, and industry.
          </p>
          <Home onSortChange={sortOrder} />
        </main>

        <footer className="bg-black text-white py-10 mt-10">
          <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="max-w-md mb-6 md:mb-0">
              <h2 className="text-2xl font-semibold mb-3">Frontlines Media</h2>
              <p className="text-gray-400 text-sm leading-relaxed">
                Frontlines Media Companies Directory helps you explore top organizations
                across multiple industries. Filter by location, sector, and size to find
                the company that fits your goals.
              </p>
            </div>
            <div className="flex flex-wrap gap-6 text-gray-400 text-sm">
              <a href="#" className="hover:text-white transition">About Us</a>
              <a href="#" className="hover:text-white transition">Contact</a>
              <a href="#" className="hover:text-white transition">Privacy Policy</a>
              <a href="#" className="hover:text-white transition">Terms of Use</a>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} Frontlines Media. All rights reserved.
          </div>
        </footer>
      </div>
    </>
  )
}

export default App
