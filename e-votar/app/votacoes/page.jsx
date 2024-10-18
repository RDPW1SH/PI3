'use client';
import HomepageSearchInput from "@/components/inputs/HomepageSearchInput";
import { useEffect, useState } from "react";

export default function VotingPage() {
  const [loading, setLoading] = useState(false);
  const [polls, setPolls] = useState([]); // Inicializa com um array vazio

  useEffect(() => {
    async function handlePolls() {
      try {
        const response = await fetch('/api/polls', {
          cache: 'no-cache'
        });
        const data = await response.json();
        setPolls(data); // Atualiza com os dados do servidor
      } catch (error) {
        console.error("Erro ao buscar os dados das votações:", error);
      }
    }
    handlePolls();
  }, []);

  return (
    <div className="flex flex-col w-[100%]">
      <div className="flex flex-col justify-center items-center gap-3 p-4 bg-secondary w-full">
        <h1 className="text-3xl font-semibold text-white">Participe das Votações</h1>
        <HomepageSearchInput />
      </div>
      <div className="flex flex-col items-center p-6">
        {polls.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center mx-auto max-w-[1000px]">
            {polls.map(option => (
              <div key={option.id} className="p-5 border rounded-lg bg-white shadow-md w-full max-w-[350px]">
                <h2 className="text-lg font-semibold">{option.title}</h2>
                <p className="text-sm text-gray-600">{option.description}</p>
                <button className="mt-3 bg-blue-500 text-white py-2 px-4 rounded text-sm hover:bg-[#8F45FF] transition-colors">
                  Votar
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full flex justify-center">
            <p className="text-center">Não há votações disponíveis no momento.</p>
          </div>
        )}
      </div>
    </div>
  );
}
