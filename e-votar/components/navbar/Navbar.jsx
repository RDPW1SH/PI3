import React from 'react'
import Link from 'next/link'

const Navbar = () => {
    return (

        <>
            <div className='flex p-5 h-auto w-full bg-primary justify-between text-white text-xl'>
                <div className='flex flex-col'>
                    <Link className='font-bold' href={'/'}>E-votar</Link>
                </div>
                <div className='flex gap-5 items-center'>
                    <Link href={'/'} 
                    className='cursor-pointer transition ease-in delay-50 hover:-translate-y-1 hover:text-slate-300'>
                        Votações</Link>
                    <p className='cursor-pointer'>Login</p>
                </div>

            </div>
        </>
    )
}

export default Navbar