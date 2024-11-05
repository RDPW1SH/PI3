import React from 'react'
import Link from 'next/link'
import { FaInstagram, FaTwitter } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-secondary py-10">
      <div className="w-full mx-auto">
        <div className="flex flex-wrap">
          {/* Company Column */}
          <div className="w-full sm:w-1/2 md:w-1/4 px-4 mb-8 md:mb-0">
            <h4 className="text-white text-xl font-medium mb-8 capitalize relative pb-2 after:content-[''] after:w-12 after:h-[2px] after:bg-primaryLight after:absolute after:left-0 after:bottom-0">
              E-votar
            </h4>
            <ul>
              <li className="mb-3">
                <Link href="#" id="footer-links-animation" className="text-white text-lg font-normal capitalize">
                  sobre nós
                </Link>
              </li>
              <li className="mb-3">
                <Link href="#" id="footer-links-animation" className="text-white text-lg font-normal capitalize">
                  serviços
                </Link>
              </li>
              <li className="mb-3">
                <Link href="#" id="footer-links-animation" className="text-white text-lg font-normal capitalize">
                  privacidade
                </Link>
              </li>
            </ul>
          </div>

          {/* Get Help Column */}
          <div className="w-full sm:w-1/2 md:w-1/4 px-4 mb-8 md:mb-0">
            <h4 className="text-white text-xl font-medium mb-8 capitalize relative pb-2 after:content-[''] after:w-12 after:h-[2px] after:bg-primaryLight after:absolute after:left-0 after:bottom-0">
              ajuda
            </h4>
            <ul>
              <li className="mb-3">
                <Link href="#" id="footer-links-animation" className="text-white text-lg font-normal capitalize">
                  perguntas frequentes
                </Link>
              </li>
              <li className="mb-3">
                <Link href="#" id="footer-links-animation" className="text-white text-lg font-normal capitalize">
                  contatos
                </Link>
              </li>
            </ul>
          </div>

          {/* Online Shop Column */}
          <div className="w-full sm:w-1/2 md:w-1/4 px-4 mb-8 md:mb-0">
            <h4 className="text-white text-xl font-medium mb-8 capitalize relative pb-2 after:content-[''] after:w-12 after:h-[2px] after:bg-primaryLight after:absolute after:left-0 after:bottom-0">
              votações
            </h4>
            <ul>
              <li className="mb-3">
              <Link href={"/votacoes/criar"} id="footer-links-animation" className="text-white text-lg font-normal capitalize">
                  criar
                </Link>
              </li>
              <li className="mb-3">
                <Link href={"/votacoes"} id="footer-links-animation" className="text-white text-lg font-normal capitalize">
                  participar
                </Link>
              </li>
              
            </ul>
          </div>

          {/* Follow Us Column */}
          <div className="w-full sm:w-1/2 md:w-1/4 px-4">
            <h4 className="text-white text-lg font-medium mb-8 capitalize relative pb-2 after:content-[''] after:w-12 after:h-[2px] after:bg-primaryLight after:absolute after:left-0 after:bottom-0">
              follow us
            </h4>
            <div className="flex flex-wrap gap-4">
              <Link href="#" className="flex justify-center items-center h-10 w-10 bg-primary/[0.8] rounded-full text-center text-white hover:bg-primaryDark hover:text-secondary transition-all duration-500">
                <FaTwitter className='text-2xl'/>
              </Link>
              <Link href="#" className="flex justify-center items-center h-10 w-10 bg-primary/[0.8] rounded-full text-center text-white hover:bg-primaryDark hover:text-secondary transition-all duration-500">
                <RiInstagramFill className='text-2xl'/>
              </Link>
              <Link href="#" className="flex justify-center items-center h-10 w-10 bg-primary/[0.8] rounded-full text-center text-white hover:bg-primaryDark hover:text-secondary transition-all duration-500">
                <FaLinkedin className='text-2xl'/>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer