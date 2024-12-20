'use client'
import { useSession } from 'next-auth/react';
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from "react-toastify"; // react-toastify
import "react-toastify/dist/ReactToastify.css"; // react-toastify css
import { FaVoteYea } from "react-icons/fa";

const votacao = () => {

    let {id} = useParams();
    const router = useRouter();
    const {data: session} = useSession();
    let [poll, setPoll] = useState(null);
    
    useEffect(() => {
        async function handlePool() {
            try {
                const res = await fetch(`/api/votacoes/votacao?id=${id}`, {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                      },
                });
    
                if(!res.ok) {
                    toast.error("Não conseguimos encontrar a votação que procura", {
                              position: "top-right",
                              autoClose: 3000,
                              hideProgressBar: false,
                              closeOnClick: true,
                              pauseOnHover: false,
                              draggable: false,
                              progress: undefined,
                              theme: "light",
                            });
                    router.push('/');
                } else {
                    const data = await res.json();
                    console.log(data.poll);
                    console.log(data.user);
                    setPoll(data.poll);
                }
            } catch (error) {
                console.log(error);
            }
            
        }
        handlePool();
    }, []);

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
                return {
                    ...poll,
                    votes: [...updatedVotes, { userId: session.user.id, optionId }],
                }
            }
    
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


        } catch (error) {

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

  if (!poll) {
    return <div>Carregando...</div>;
}
  return (
    
    <div className='flex p-5 gap-2 justify-center'>
        <ToastContainer/>
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
        <div className='py-2'>
            <div className='flex gap-1'>
                <h2 className='text-lg font-bold'>Votação criada por: </h2>
                <p className='text-lg'>{poll.users.username}</p>
            </div>
            
            <div className='flex gap-1'>
                <h2 className='text-lg font-bold'>Criada no dia: </h2>
                <p className='text-lg'>{new Date(poll.start_date).toLocaleTimeString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                })}</p>
            </div>
        </div>
    </div>
  )
}

export default votacao