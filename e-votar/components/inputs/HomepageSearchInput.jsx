'use client';
import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

const HomepageSearchInput = () => {
  const [searchTerm, setSearchTerm] = useState(""); // Armazena o termo de pesquisa
  const router = useRouter();

  // Função para redirecionar para a página de resultados com o termo de pesquisa
  const handleSearch = () => {
    if (!searchTerm.trim()) return; // Se não houver termo, não faz o redirecionamento

    // Redireciona para a página de resultados, passando o termo de pesquisa na URL
    router.push(`/votacoes?searchTerm=${searchTerm}`);
  };

  return (
    <div className="relative flex rounded-lg">
      <input 
        type="text" 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} 
        className="bg-white py-2 px-4 focus:outline-none w-[400px] hover:bg-slate-100 focus:outline-2 focus:outline-primary rounded-lg"
        placeholder="Ex: 23475942"
      />
      <FaSearch 
        onClick={handleSearch} 
        className="absolute right-4 bg-transparent text-xl bg-white h-full rounded-r-lg cursor-pointer hover:text-primaryLight"
      />
    </div>
  );
};

export default HomepageSearchInput;
