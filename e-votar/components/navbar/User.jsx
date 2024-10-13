'use client'
import React from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { FaUser } from "react-icons/fa";

const User = () => {

    const { data: session, status } = useSession();
    return (
        <>
            {status === "loading" ? (
                <p>Loading...</p>
            ) : session ? (
                <FaUser className='text-xl cursor-pointer' />
            ) : (
                <Link
                    href={'/login'}
                    className='cursor-pointer p-[6px] border-2 border-transparent bg-white text-black rounded-md 
            hover:transition-all hover:border-white hover:bg-opacity-20 hover:text-white'>
                    Login
                </Link>
            )}
        </>

    );
}

export default User