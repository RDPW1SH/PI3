'use client'
import React from 'react'
import { FaSearch } from "react-icons/fa";

const HomepageSearchInput = () => {
  return (
    <div className='relative flex rounded-lg'>
        <input 
        type="text" 
        className="bg-white py-2 px-4 focus:outline-none w-[400px] hover:bg-slate-100 focus:outline-2 focus:outline-primary rounded-lg"
        placeholder='Ex: 23475942'/>
        <FaSearch className='absolute right-4 bg-transparent text-xl bg-white h-full rounded-r-lg cursor-pointer hover:text-primaryLight'/>
    </div>
    
  )
}

export default HomepageSearchInput