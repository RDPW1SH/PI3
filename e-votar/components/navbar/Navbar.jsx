"use client";
import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { FaUser } from "react-icons/fa";

const Navbar = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <>
        <div className="flex py-3 px-5 h-auto w-full bg-primary justify-between text-white text-xl items-center">
          <div className="flex flex-col">
            <Link className="text-2xl font-bold" href={"/"}>
              E-votar
            </Link>
          </div>
          <div className="flex gap-5 items-center">
            <Link
              href={"/votacoes"}
              className="cursor-pointer transition ease-in delay-50 hover:-translate-y-1 hover:text-slate-300"
            >
              Votações
            </Link>

            <Link
              href={"/login"}
              className="cursor-pointer p-[6px] border-2 border-transparent bg-white text-black rounded-md 
                  hover:transition-all hover:border-white hover:bg-opacity-20 hover:text-white"
            >
              Login
            </Link>
          </div>
        </div>
      </>
    );
  } 
  return (
    <>
      <div className="flex py-3 px-5 h-auto w-full bg-primary justify-between text-white text-xl items-center">
        <div className="flex flex-col">
          <Link className="text-2xl font-bold" href={"/"}>
            E-votar
          </Link>
        </div>
        <div className="flex gap-5 items-center">
          <Link
            href={"/votacoes"}
            className="cursor-pointer transition ease-in delay-50 hover:-translate-y-1 hover:text-slate-300"
          >
            Votações
          </Link>
          {/* Display the user icon or login button only when session is ready */}

          {session ? (
            <Link href={"/conta"}>
              <FaUser className="text-xl cursor-pointer" />
            </Link>
          ) : !session ? (
            <Link
              href={"/login"}
              className="cursor-pointer p-[6px] border-2 border-transparent bg-white text-black rounded-md 
                hover:transition-all hover:border-white hover:bg-opacity-20 hover:text-white"
            >
              Login
            </Link>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
