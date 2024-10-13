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
        
      </div>
    </div>
  );
}
