'use client'
import React, { useState } from 'react'
import { FaSearch } from "react-icons/fa";
import { useRouter } from "next/navigation"; // Importa o hook do Next.js para navegação

const HomepageSearchInput = () => {
  const [searchTerm, setSearchTerm] = useState("");  // Armazena o termo de pesquisa
  const router = useRouter();  // Cria a instância do router

  // Função para redirecionar para a página de resultados com o termo de pesquisa
  const handleSearch = () => {
    if (!searchTerm.trim()) return; // Se não houver termo, não faz o redirecionamento

    // Redireciona para a página de resultados, passando o termo de pesquisa na URL
    router.push(`/votacoes/resultados?searchTerm=${searchTerm}`);
  }

  return (
    <div className='relative flex rounded-lg'>
      {/* Campo de pesquisa */}
      <input 
        type="text" 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}  // Atualiza o estado do termo de pesquisa
        className="bg-white py-2 px-4 focus:outline-none w-[400px] hover:bg-slate-100 focus:outline-2 focus:outline-primary rounded-lg"
        placeholder='Ex: 23475942'
      />
      {/* Ícone de lupa para disparar a busca */}
      <FaSearch 
        onClick={handleSearch}  // Chama a função de pesquisa ao clicar na lupa
        className='absolute right-4 bg-transparent text-xl bg-white h-full rounded-r-lg cursor-pointer hover:text-primaryLight'
      />
    </div>
  )
}

export default HomepageSearchInput;
