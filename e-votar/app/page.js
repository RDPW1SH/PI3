import HomepageSearchInput from "@/components/inputs/HomepageSearchInput";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-[500px] w-[100%] flex">
      <div className="flex flex-col justify-center items-center gap-5 p-5 bg-secondary w-full">
        <h1 className="text-2xl font-semibold text-white">Encontre os formularios</h1>
        <HomepageSearchInput/>
      </div>
    </div>
  );
}
