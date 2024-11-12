"use client";
import HomepageSearchInput from "@/components/inputs/HomepageSearchInput";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { FaVoteYea } from "react-icons/fa";

export default function VotingPage() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [polls, setPolls] = useState([]);

  useEffect(() => {
    async function handlePolls() {
      try {
        const response = await fetch("/api/votacoes", {
          cache: "no-cache",
        });
        const data = await response.json();
        setPolls(data.polls);
        console.log(polls);
      } catch (error) {
        console.error("Erro ao buscar os dados das votações:", error);
      }
      setLoading(false);
    }
    handlePolls();
  }, []);

  async function handleVote(pollId, optionId) {
    const res = await fetch("api/votos", {
      method: "POST",
      headers: {},
      body: { pollId, optionId },
    });
  }

  if (loading) {
    return <div>Loading...</div>;
  }

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
          <div className="flex flex-row gap-4">
            {polls.map((poll) => (
              <div
                key={poll.id}
                className="flex flex-col bg-white shadow-lg rounded-lg p-5 w-auto min-w-[400px] max-w-[600px]"
              >
                {/* Título da votação */}
                <h2 className="text-xl font-semibold mb-4">{poll.title}</h2>

                {/* Opções de votação */}
                <div className="flex flex-col gap-3">
                  {poll.options.map((option, index) => {
                    const totalVotes = poll.votes.length;

                    // Calculate the number of votes for this option
                    const optionVotes = poll.votes.filter(
                      (vote) => vote.optionId === option.id
                    ).length;

                    // Calculate the percentage
                    const votePercentage =
                      totalVotes > 0
                        ? optionVotes > 0
                          ? ((optionVotes / totalVotes) * 100).toFixed(1)
                          : 0
                        : 0;

                    return (
                      <div className="flex flex-row" key={index}>
                        <div className="flex flex-col w-[90%] gap-1">
                          {/* Display option title with the calculated percentage */}
                          <span className="text-lg">
                            {option.optionTitle} - {votePercentage}%
                          </span>
                          <div
                            className="bg-primary rounded-lg h-2"
                            style={{ width: `${votePercentage}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-center items-center w-[10%]">
                          {poll.votes.some(vote => vote.userId == session.user.id && vote.optionId === option.id) ? (
                            <h1>Votaste neste </h1>
                          ) :
                          <FaVoteYea
                            onClick={() => handleVote(poll.id, option.id)}
                            className="text-black w-full hover:cursor-pointer"
                          />
                          }
                          
                        </div>
                      </div>
                    );
                  })}
                  <div className="flex flex-row justify-between mt-4">
                    <p>Total Votes: {poll.votes.length}</p>
                    <p>
                      Acaba no dia:{" "}
                      {new Date(poll.end_date).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}{" "}
                      {new Date(poll.end_date).toLocaleTimeString("en-GB", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
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
