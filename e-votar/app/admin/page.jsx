"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify"; // react-toastify
import "react-toastify/dist/ReactToastify.css"; // react-toastify css
// Icons
import { FaTrash } from "react-icons/fa";
import { LuSettings2 } from "react-icons/lu";

const AdminPage = () => {
  const [polls, setPolls] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function getPolls() {
      const res = await fetch("/api/votacoes/admin", {});

      if (res.ok) {
        const data = await res.json();
        setPolls(data.polls);
        // console.log(data);
      } else {
      }
    }
    async function getUsers() {
      const res = await fetch("/api/user", {});

      if (res.ok) {
        const data = await res.json();
        setUsers(data.users);
        // console.log(data);
      } else {
      }
    }
    getPolls();
    getUsers();
  }, []);

  async function deletePoll(id) {
    const res = await fetch("/api/votacoes/admin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    const data = await res.json();
    if (res.ok) {
      toast.success(data.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
      });
      setPolls((prevPolls) => prevPolls.filter((poll) => poll.id !== id));
    } else {
      toast.error(data.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
      });
    }
  }
  async function deleteUser(id) {
    const res = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    const data = await res.json();
    if (res.ok) {
      toast.success(data.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
      });
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    } else {
      toast.error(data.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
      });
    }
  }

  return (
    <div className="flex flex-col justify-center items-center p-5 bg-gray-50">
      <ToastContainer />
      <h1 className="text-lg font-bold">Ultimas votações</h1>
      <div className="w-[80%] relative overflow-x-auto shadow-lg sm:rounded-lg">
        {/* Tabela ultimas votações */}
        <table className="w-full text-sm text-left text-slate-600 border-2 border-black">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              <th scope="col" className="px-6 py-3">
                Titulo da votação
              </th>
              <th scope="col" className="px-6 py-3">
                Criador da votação
              </th>
              <th scope="col" className="px-6 py-3">
                Nº de votos
              </th>
              <th scope="col" className="px-6 py-3">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {polls.map((poll, index) => (
              <tr
                className={index % 2 === 0 ? "bg-purple-200" : "bg-gray-200"}
                key={poll.id}
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-slate-700 whitespace-nowrap"
                >
                  {poll.title}
                </th>
                <td className="px-6 py-4 cursor-pointer">
                  {poll.users?.username || "Desconhecido"}
                </td>
                <td className="px-6 py-4 cursor-pointer hover:text-black">
                  {poll.votes?.length || 0}
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <Link
                      href={"#"}
                      className="font-medium text-primary hover:underline"
                    >
                      <FaTrash
                        className="w-4 h-4 text-red-400 hover:text-red-500 cursor-pointer"
                        onClick={() => deletePoll(poll.id)}
                      />
                    </Link>
                    <Link
                      href={"#"}
                      className="font-medium text-primary hover:underline"
                    >
                      <LuSettings2 className="w-4 h-4 text-slate-600 hover:text-slate-800 cursor-pointer" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Tabela ultimos utilizadores */}
        <hr />
        <h1 className="text-lg text-center font-bold pt-5 bg-gray-50">
          Ultimos utilizadores
        </h1>
        <table className="w-full text-sm text-left text-slate-600 border-2 border-black">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID utilizador
              </th>
              <th scope="col" className="px-6 py-3">
                Nome do utilizador
              </th>
              <th scope="col" className="px-6 py-3">
                Nº de votações criadas
              </th>
              <th scope="col" className="px-6 py-3">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                className={index % 2 === 0 ? "bg-purple-200" : "bg-gray-200"}
                key={user.id}
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-slate-700 whitespace-nowrap"
                >
                  {user.id}
                </th>
                <td className="px-6 py-4 cursor-pointer">{user.username}</td>
                <td className="px-6 py-4"></td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <Link
                      href={"#"}
                      className="font-medium text-primary hover:underline"
                    >
                      <FaTrash
                        className="w-4 h-4 text-red-400 hover:text-red-500 cursor-pointer"
                        onClick={() => deleteUser(user.id)}
                      />
                    </Link>
                    <Link
                      href={"#"}
                      className="font-medium text-primary hover:underline"
                    >
                      <LuSettings2 className="w-4 h-4 text-slate-600 hover:text-slate-800 cursor-pointer" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPage;
