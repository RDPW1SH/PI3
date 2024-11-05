"use client";
import HomepageSearchInput from "@/components/inputs/HomepageSearchInput";
import { useEffect, useState } from "react";

export default function VotingPage() {
  const [loading, setLoading] = useState(false);
  const [polls, setPolls] = useState([]); // Inicializa com um array vazio

  useEffect(() => {
    async function handlePolls() {
      try {
        const response = await fetch("/api/votacoes", {
          cache: "no-cache",
        });
        const data = await response.json();
        setPolls(data.polls);
      } catch (error) {
        console.error("Erro ao buscar os dados das votações:", error);
      }
    }
    handlePolls();
  }, []);

  return (
    <div className="flex flex-col w-[100%]">
      <div className="flex flex-col justify-center items-center gap-3 p-4 bg-secondary w-full">
        <h1 className="text-3xl font-semibold text-white">
          Participe das Votações
        </h1>
        <HomepageSearchInput />
      </div>
      <div className="flex flex-col items-center p-6">
        {polls ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center mx-auto max-w-[1000px]">
          {polls.map((poll) => (
            <div key={poll.id} className="flex flex-col bg-white shadow-lg rounded-lg p-6 w-full max-w-[400px]">
              {/* Título da votação */}
              <h2 className="text-xl font-semibold mb-4">{poll.title}</h2>

              {/* Opções de votação */}
              <div className="flex flex-col gap-3">
                {poll.options.map((option, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-lg">{option.optionTitle}</span>
                    {!poll.voted ? (
                      <button
                        className="bg-blue-500 text-white text-sm px-3 py-1 rounded hover:bg-blue-600"
                        onClick={() => handleVote(option.optionTitle, poll.id)}
                      >
                        Votar
                      </button>
                    ) : (
                      <div className="w-full ml-4 relative bg-gray-200 rounded-full h-6">
                        <div
                          className="absolute top-0 left-0 h-full bg-green-500 rounded-full transition-all duration-500"
                          style={{ width: `${option.percentage}%` }}
                        />
                        <span className="absolute left-1/2 transform -translate-x-1/2 text-sm text-gray-700">
                          {option.percentage}%
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Detalhes finais, como total de votos e tempo restante */}
              {poll.voted && (
                <div className="mt-4 text-sm text-gray-500">
                  <p>Total de votos: {poll.totalVotes}</p>
                  <p>{poll.timeLeft} restantes</p>
                </div>
              )}
            </div>
          ))}
        </div>



        ) : (
          <div className="w-full flex justify-center">
            <p className="text-center">
              Não há votações disponíveis no momento.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
