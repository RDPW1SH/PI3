import React from 'react'
import Link from 'next/link'

const Navbar = () => {
    return (

        <>
            <div className='flex py-3 px-5 h-auto w-full bg-primary justify-between text-white text-xl items-center'>
                <div className='flex flex-col'>
                    <Link className='text-2xl font-bold' href={'/'}>E-votar</Link>
                </div>
                <div className='flex gap-5 items-center'>
                    <Link
                        href={'/'}
                        className='cursor-pointer transition ease-in delay-50 hover:-translate-y-1 hover:text-slate-300'>
                        Votações</Link>
                    <Link
                        href={'/login'}
                        className='cursor-pointer p-[6px] border-2 border-transparent bg-white text-black rounded-md 
                        hover:transition-all hover:border-white hover:bg-opacity-20 hover:text-white'>
                        Login</Link>
                </div>
            </div>
        </>
    )
}

export default Navbar