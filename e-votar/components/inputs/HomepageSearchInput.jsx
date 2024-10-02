'use client'
import React from 'react'
import { FaSearch } from "react-icons/fa";

const HomepageSearchInput = () => {
  return (
    <div className='flex rounded-lg'>
        <input 
        type="text" 
        className="bg-white py-1 px-4 focus:outline-none w-[80%] focus:border-b-4 focus:border-b-primary rounded-l-lg"
        placeholder='Ex: 23475942'/>
        <FaSearch className='bg-white w-[20%] h-full p-3 rounded-r-lg cursor-pointer hover:text-primaryLight'/>
    </div>
    
  )
}

export default HomepageSearchInput