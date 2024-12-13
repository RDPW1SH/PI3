"use client";
import HomepageSearchInput from "@/components/inputs/HomepageSearchInput";
import { useSession } from "next-auth/react";
import { ToastContainer, toast } from "react-toastify"; // react-toastify
import "react-toastify/dist/ReactToastify.css"; // react-toastify css
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FaVoteYea } from "react-icons/fa";

export default function VotingPage({ searchParams }) {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [polls, setPolls] = useState([]);
  const router = useRouter();

  // get searchTerm
  const searchTerm = searchParams?.searchTerm || null;

  useEffect(() => {
    async function handlePolls() {
      try {
        const url = searchTerm
          ? `/api/votacoes?searchTerm=${encodeURIComponent(searchTerm)}`
          : `/api/votacoes`;

        const response = await fetch(url, { cache: "no-store" });
        const data = await response.json();

        if (response.ok) {
          setPolls(data.polls);
        }
      } catch (error) {
        console.error("Erro ao buscar os dados das votações:", error);
      }
      setLoading(false);
    }

    handlePolls();
  }, [searchTerm]);

  async function handleVote(pollId, optionId) {
    if (!session) {
      router.push("/login");
      return;
    }
  
    try {
      const res = await fetch("/api/votacoes/votos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pollId,
          optionId,
          userId: session?.user?.id,
        }),
      });
  
      if (res.ok) {
        setPolls((prevPolls) =>
          prevPolls.map((poll) => {
            if (poll.id === pollId) {
              const updatedVotes = poll.votes.filter(
                (vote) => vote.userId !== session.user.id
              );
  
              return {
                ...poll,
                votes: [...updatedVotes, { userId: session.user.id, optionId }],
              };
            }
            return poll;
          })
        );
  
        toast.success("O seu voto foi registado com sucesso", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "light",
        });
      } else {
        const errorData = await res.json();
        toast.error(errorData.message || "Erro ao registrar voto", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      console.error("Erro ao registrar voto:", error);
      toast.error("Erro ao registrar voto", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
      });
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center gap-4 pt-10">
        <div className="flex flex-col bg-white shadow-lg rounded-lg p-5 min-w-[400px] max-w-[600px]">
          <div className="animate-pulse flex flex-col gap-3">
            <h2 className="text-xl mb-4"></h2>
            <div className="flex flex-row"></div>
            <div className="flex-1 space-y-6 py-1">
              <div className="h-2 bg-slate-300 rounded"></div>
              <div className="h-2 bg-slate-300 rounded"></div>
              <div className="h-2 bg-slate-300 rounded"></div>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-2 bg-slate-300 rounded col-span-2"></div>
                  <div className="h-2 bg-slate-300 rounded col-span-1"></div>
                </div>
                <div className="h-2 bg-slate-7300 rounded"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col bg-white shadow-lg rounded-lg p-5 min-w-[400px] max-w-[600px]">
          <div className="animate-pulse flex flex-col gap-3">
            <h2 className="text-xl mb-4"></h2>
            <div className="flex flex-row"></div>
            <div className="flex-1 space-y-6 py-1">
              <div className="h-2 bg-slate-300 rounded"></div>
              <div className="h-2 bg-slate-300 rounded"></div>
              <div className="h-2 bg-slate-300 rounded"></div>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-2 bg-slate-300 rounded col-span-2"></div>
                  <div className="h-2 bg-slate-300 rounded col-span-1"></div>
                </div>
                <div className="h-2 bg-slate-7300 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-[100%]">
      <ToastContainer />
      <div className="flex flex-col justify-center items-center gap-3 p-4 bg-secondary w-full">
        <h1 className="text-3xl font-semibold text-white">
          Participe das Votações
        </h1>
        <HomepageSearchInput />
      </div>
      <div className="flex flex-row p-6 justify-center">
        {polls ? (
          <div className="flex flex-row gap-4 flex-wrap justify-center">
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
                          {poll.votes.some(
                            (vote) =>
                              vote.userId == session?.user?.id &&
                              vote.optionId === option.id
                          ) ? (
                            <p>✨</p>
                          ) : (
                            <FaVoteYea
                              onClick={() => handleVote(poll.id, option.id)}
                              className="text-black w-full hover:cursor-pointer"
                            />
                          )}
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
          <div className="w-full flex flex-col justify-center items-center gap-5">
            <p className="text-lg text-center font-normal">
              O nosso sistema não encontrou nenhuma votação. Experimente criar
              uma
            </p>
            <Link
              className="text-lg py-2 px-3 font-semibold text-white bg-primaryLight rounded-lg max-w-[220px] hover:bg-primary"
              href={"/votacoes/criar"}
            >
              Crie a sua votação aqui!
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
