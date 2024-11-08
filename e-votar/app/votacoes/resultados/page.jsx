'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from "next/navigation";

const Resultados = () => {
  const [polls, setPolls] = useState([]);  // Armazena as votações encontradas
  const router = useRouter();  // Instância do router
  const { searchTerm } = router.query;  // Obtém o termo de pesquisa da URL

  // Função para buscar as votações com o termo de pesquisa
  useEffect(() => {
    if (!searchTerm) return;

    const fetchPolls = async () => {
      try {
        const response = await fetch(`/api/votacoes?searchTerm=${searchTerm}`);
        const data = await response.json();
        setPolls(data.polls || []);  // Atualiza o estado com as votações encontradas
      } catch (error) {
        console.error("Erro ao buscar as votações:", error);
      }
    };

    fetchPolls();
  }, [searchTerm]);  // Reexecuta o useEffect sempre que o searchTerm mudar

  return (
    <div className="flex flex-col p-5">
      <h1 className="text-2xl font-semibold pb-5 text-secondary">Resultados da Pesquisa</h1>
      {/* Exibição das votações encontradas */}
      {polls.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {polls.map((poll) => (
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

export default Resultados;
