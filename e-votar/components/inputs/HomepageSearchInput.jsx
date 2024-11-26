'use client';
import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

const HomepageSearchInput = () => {
  const [searchTerm, setSearchTerm] = useState(""); // Armazena o termo de pesquisa
  const router = useRouter();

  
  const handleSearch = () => {
    if (!searchTerm.trim()) return;
    router.push(`/votacoes?searchTerm=${searchTerm}`);
  };

  return (
    <div className='relative flex rounded-lg min-w-[400px]'>
      <input 
        type="text" 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="bg-white focus:outline-none py-2 px-4 w-[90%] 
        hover:bg-slate-100 focus:outline-2 rounded-l-lg"
        placeholder='Ex: 23475942'/>
      <FaSearch 
        onClick={handleSearch} 
        className='w-[10%] p-2 bg-transparent text-xl bg-white h-full rounded-r-lg cursor-pointer hover:text-primaryLight'
      />
    </div>
  );
};

export default HomepageSearchInput;
