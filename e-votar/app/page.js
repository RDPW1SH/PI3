
import HomepageSearchInput from "@/components/inputs/HomepageSearchInput";
import Link from "next/link";
import { FaPoll, FaVoteYea, FaChartBar } from 'react-icons/fa';

export default function Home() {
  

  return (
    <div className="flex flex-col w-[100%]">
      <div className="flex flex-col justify-center items-center gap-5 p-5 bg-secondary w-full">
        <h1 className="text-2xl font-semibold text-white">Encontre já o formulário</h1>
        <HomepageSearchInput />
      </div>

      <div className="flex justify-center p-5">
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-8'>
          <div className='bg-white p-8 rounded-lg shadow-md hover:shadow-lg max-w-md'>
            <FaPoll className='text-primary text-4xl mb-4' />
            <h3 className='text-xl font-semibold mb-2'>Crie suas Próprias Votações</h3>
            <p className='text-gray-600'>Registre-se e crie votações personalizadas para engajar seu público com facilidade.</p>
          </div>

          <div className='bg-white p-8 rounded-lg shadow-md hover:shadow-lg max-w-md'>
            <FaVoteYea className='text-primary text-4xl mb-4' />
            <h3 className='text-xl font-semibold mb-2'>Participe nas Votações</h3>
            <p className='text-gray-600'>Escolha entre várias votações disponíveis e faça sua voz ser ouvida nas decisões importantes.</p>
          </div>

          <div className='bg-white p-8 rounded-lg shadow-md hover:shadow-lg max-w-md'>
            <FaChartBar className='text-primary text-4xl mb-4' />
            <h3 className='text-xl font-semibold mb-2'>Acompanhe os Resultados</h3>
            <p className='text-gray-600'>Veja os resultados em tempo real com gráficos e análises detalhadas de cada votação.</p>
          </div>
        </div>
      </div>

      
      <div className="flex justify-center mt-8">
        <Link href={'/votacoes/criar'}>
        <button 
          
          className="bg-primary text-white py-3 px-6 rounded-lg text-lg hover:bg-primaryLight transition-colors"
        >
          Criar Votação
        </button>
        </Link>
        
      </div>
    </div>
  );
}
