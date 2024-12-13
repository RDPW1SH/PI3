"use client";
import React, { useState, useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import { FaCamera } from "react-icons/fa";
import { useRouter } from "next/navigation";

const UserProfile = () => {
  const { data: session } = useSession();
  const [userData, setUserData] = useState({
    username: "",
    createdAt: "",
    password: "",
    newPassword: "",
    email: "",
  });
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  useEffect(() => {

    if (session) {
      // Fetch user data from the API using the session's user ID
      fetch(`/api/user/profile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: session.user.id }), // Fetch based on session user ID
      })
        .then((res) => res.json())
        .then((data) => {
          setUserData({
            username: data.username,
            email: data.email,
            createdAt: data.createdAt,
          });
          console.log(data);
        })
        .catch((error) =>
          console.error("Erro ao buscar dados do utilizador:", error)
        );
    }
  }, [session]);

  const handleUpdate = async () => {
    
    try {
      console.log(userData)
      const res = await fetch('/api/user/updateProfile', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: session.user.id, userData }), 
      })

      const data = res.json();

      if(res.ok) {
        signOut();
        router.push('/login');
        
      } else {
        setErrorMessage(res.message);
      }

    } catch (error) {
      console.log("Erro handleUpdate(): " + error);
    }
  };

  

  if (!session) return <div>Carregando...</div>;

  return (
    <div className="flex flex-col md:flex-row w-full p-5 gap-10 items-start justify-center">
      {/* Coluna Esquerda: Informações e Foto do Utilizador */}
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-xs flex flex-col gap-2 items-center">
        <div className="flex flex-col items-center gap-1">
          
           
            
          </div>
          <p className="text-gray-500">@{userData.username}</p>
          <p className="text-gray-400 text-sm">
            Membro desde:{" "}
            {new Date(userData.createdAt).toLocaleDateString("pt-PT", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}{" "}
          </p>
          <button onClick={() => signOut()} className="p-2 bg-red-400 text-white rounded-md hover:bg-red-500">Fazer logout</button>
        
      </div>

      {/* Coluna Direita: Formulário de Edição do Perfil */}
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl">
        <h1 className="text-2xl font-semibold mb-6">Editar Perfil</h1>
        {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
        <div className="flex flex-col gap-6">
          <div className="flex gap-4">
            <div className="w-full">
              <label className="block text-gray-700">Username</label>
              <input
                type="text"
                value={userData.username}
                onChange={(e) =>
                  setUserData({ ...userData, username: e.target.value })
                }
                className="border border-gray-300 p-2 rounded-md w-full"
              />
            </div>
          </div>

          {/* Senha */}
          <div className="flex gap-4">
            <div className="w-full">
              <label className="block text-gray-700">Senha atual</label>
              <input
                type="password"
                className="border border-gray-300 p-2 rounded-md w-full"
                value={userData.password}
                placeholder="Digite a sua senha atual para alterar os seus dados"
                onChange={(e) =>
                  setUserData({ ...userData, password: e.target.value })
                }
            />
            </div>
            <div className="w-full">
              <label className="block text-gray-700">Nova Senha</label>
              <input
                type="password"
                className="border border-gray-300 p-2 rounded-md w-full"
                value={userData.newPassword}
                onChange={(e) =>
                  setUserData({ ...userData, newPassword: e.target.value })
                }
              />
            </div>
          </div>

          {/* Email */}
          <div className="w-full">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={userData.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
              className="border border-gray-300 p-2 rounded-md w-full"
            />
          </div>

          <button
            className="bg-primary text-white px-4 py-2 rounded-md w-full mt-6 hover:bg-primaryLight transition-colors"
            onClick={handleUpdate}
          >
            Atualizar Informações
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
