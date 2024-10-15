'use client';
import HomepageSearchInput from "@/components/inputs/HomepageSearchInput";
import { connectToDB } from "@/lib/db";
import { useEffect } from "react";

export default function VotingPage() {

  useEffect(() => {
    async function getData() {
      const db = await connectToDB();

      if (db) {
        console.log('Connected successfully');
      }
    }
    getData();
  }, []);

  const votingOptions = [
    { id: 1, title: "Votação 1", description: "Descrição da Votação 1" },
    { id: 2, title: "Votação 2", description: "Descrição da Votação 2" },
    { id: 3, title: "Votação 3", description: "Descrição da Votação 3" },
    { id: 4, title: "Votação 4", description: "Descrição da Votação 4" },
    { id: 5, title: "Votação 5", description: "Descrição da Votação 5" },
    { id: 6, title: "Votação 6", description: "Descrição da Votação 6" },
    { id: 7, title: "Votação 7", description: "Descrição da Votação 7" },
    { id: 8, title: "Votação 8", description: "Descrição da Votação 8" },
    { id: 8, title: "Votação 9", description: "Descrição da Votação 9" },

  ];

  return (
    <div className="flex flex-col w-[100%]">
      <div className="flex flex-col justify-center items-center gap-3 p-4 bg-secondary w-full">
        <h1 className="text-3xl font-semibold text-white">Participe das Votações</h1>
        <HomepageSearchInput />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 justify-center mx-auto max-w-[1000px]">
        {votingOptions.map(option => (
          <div key={option.id} className="p-5 border rounded-lg bg-white shadow-md w-full max-w-[350px]">
            <h2 className="text-lg font-semibold">{option.title}</h2>
            <p className="text-sm text-gray-600">{option.description}</p>
            <button className="mt-3 bg-blue-500 text-white py-2 px-4 rounded text-sm hover:bg-[#8F45FF] transition-colors">
              Votar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
