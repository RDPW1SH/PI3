'use client'
import React, { useEffect, useState } from 'react';

const Votacoes = () => {
  const [polls, setPolls] = useState([]);  // Armazena todas as votações
  const [filteredPolls, setFilteredPolls] = useState([]);  // Armazena as votações filtradas
  const [searchTerm, setSearchTerm] = useState("");  // Armazena o termo de pesquisa
  const [errorMessage, setErrorMessage] = useState("");  // Mensagem de erro para pesquisa vazia

  // Função para buscar as votações da API
  useEffect(() => {
    const fetchPolls = async () => {
      try {
        const response = await fetch('/api/votacoes');  // Carrega todas as votações
        const data = await response.json();
        setPolls(data.polls || []);
        setFilteredPolls(data.polls || []);  // Inicialmente exibe todas as votações
      } catch (error) {
        console.error('Erro ao buscar as votações:', error);
      }
    };

    fetchPolls();
  }, []);

  // Função para lidar com a pesquisa
  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setErrorMessage("Por favor, insira um termo de pesquisa");
      setFilteredPolls(polls);  // Se a pesquisa estiver vazia, mostra todas as votações
    } else {
      setErrorMessage("");
      const filtered = polls.filter((poll) => 
        poll.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPolls(filtered);  // Atualiza a lista de votações filtradas
    }
  };

  return (
    <div className="flex flex-col p-5">
      <div className="relative flex mb-5">
        <input 
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`bg-white py-2 px-4 w-full rounded-lg ${errorMessage ? 'border-red-500 border' : ''}`}
          placeholder="Pesquise uma votação"
        />
        <button onClick={handleSearch} className="ml-2 bg-primary text-white px-4 py-2 rounded-lg">
          Pesquisar
        </button>
      </div>
      {errorMessage && <p className="text-red-500 text-sm mb-4">{errorMessage}</p>}

      <h1 className="text-2xl font-semibold pb-5 text-secondary">Votações</h1>

      {filteredPolls.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredPolls.map((poll) => (
            <div key={poll.id} className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg">
              <h3 className="text-xl font-semibold">{poll.title}</h3>
              <p className="text-gray-600">{poll.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">Nenhuma votação encontrada.</p>
      )}
    </div>
  );
};

export default Votacoes;
