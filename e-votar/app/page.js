'use client'
import HomepageSearchInput from "@/components/inputs/HomepageSearchInput";
import { connectToDB } from "@/lib/db";
import { useEffect } from "react";
export default function Home() {

  useEffect(() => {
    async function getData() {
      const db = await connectToDB()

      if (db) {
        console.log('connected susscessfully')
      }
    }
    getData()
  }, [])
  return (
    <div className="flex flex-col w-[100%]">
      <div className="flex flex-col justify-center items-center gap-5 p-5 bg-secondary w-full">
        <h1 className="text-2xl font-semibold text-white">Encontre já o formulário</h1>
        <HomepageSearchInput />
      </div>
      <div className="flex gap-5 p-5 justify-center">
        <div className="flex flex-col w-[300px] h-[200px] bg-primaryLight text-white shadow-lg rounded-md p-5 justify-between items-center">
          <h1 className="text-xl font-semibold">Fácil e rapido</h1>
          <p className="text-lg">Crie votações facilmente quer seja para trabalho ou para diversão</p>
        </div>

        <div className="flex flex-col w-[300px] h-[200px] bg-primaryLight shadow-xl rounded-md p-5 justify-between items-center">
          <h1 className="text-xl font-semibold">Grátis para usar</h1>
          <p className="text-lg">Não pague pelo que vai usar. Simples e barato</p>
        </div>
      </div>
    </div>
  );
}
