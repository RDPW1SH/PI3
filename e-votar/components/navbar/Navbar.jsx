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
                    <p className='cursor-pointer'>Votações</p>
                    <p className='cursor-pointer'>Login</p>
                </div>

            </div>
        </>
    )
}

export default Navbar