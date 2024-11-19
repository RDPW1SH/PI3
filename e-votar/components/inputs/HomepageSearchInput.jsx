'use client'
import React from 'react'
import { FaSearch } from "react-icons/fa";

const HomepageSearchInput = () => {
  return (
    <div className='relative flex rounded-lg min-w-[400px]'>
        <input 
        type="text" 
        className="bg-white focus:outline-none py-2 px-4 w-[90%] 
        hover:bg-slate-100 focus:outline-2 rounded-l-lg"
        placeholder='Ex: 23475942'/>
        <FaSearch className='w-[10%] p-2 bg-transparent text-xl bg-white h-full rounded-r-lg cursor-pointer hover:text-primaryLight'/>
    </div>
    
  )
}

export default HomepageSearchInput