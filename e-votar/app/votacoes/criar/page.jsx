
'use client'
import { getServerSession } from 'next-auth'
import { useRouter } from 'next/navigation'
import { FaPlus } from "react-icons/fa";
import React from 'react'

const Criar = () => {

    document.getElementById('poll_options')
    // const {data: session} = getServerSession()


    async function handleNewPoll() {

    }

    async function handleNewBar() {
        
    }
    return (
        <div className='flex-grow p-5 justify-center items-center'>
            <form onSubmit={handleNewPoll}>
                <input type="text" name='title' placeholder='Post title' max={40} min={40}/>
                <div id='poll_options'>
                    <div className='relative'>
                        <p className='absolute right-2'>Sim</p>
                    </div>
                </div>
                <FaPlus className='rounded-full p-2 bg-primary text-white hover:bg-primaryDark' onClick={handleNewBar}/>
                <button type='submit'>Create poll</button>
            </form>
        </div>
    )
}

export default Criar