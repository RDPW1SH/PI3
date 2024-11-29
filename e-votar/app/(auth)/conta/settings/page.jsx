"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { FaCamera } from "react-icons/fa";

const UserProfile = () => {
  const { data: session } = useSession();
  const [userData, setUserData] = useState({
    fullName: "",
    username: "",
    createdAt: "",
    email: "",
  });
  const [newPhoto, setNewPhoto] = useState(null);

  // Fetch user data when the session is loaded
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
            fullName: data.fullName,
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

  const handlePhotoUpload = (e) => {
    setNewPhoto(e.target.files[0]);
  };

  const handleUpdate = () => {
    // Send the updated data to the API
    fetch(`/api/user/updateProfile`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: session.user.id, userData, newPhoto }), // Envia os novos dados
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Perfil atualizado com sucesso!");
      })
      .catch((error) => console.error("Erro ao atualizar o perfil:", error));
  };

  const triggerFileInput = () => {
    document.getElementById("fileInput").click();
  };

  if (!session) return <div>Carregando...</div>;

  return (
    <div className="flex flex-col md:flex-row w-full p-5 gap-10 items-start justify-center">
      {/* Coluna Esquerda: Informações e Foto do Utilizador */}
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-xs">
        <div className="flex flex-col items-center">
          <div
            className="relative cursor-pointer w-28 h-28"
            onClick={triggerFileInput}
          >
            <img
              src={
                newPhoto
                  ? URL.createObjectURL(newPhoto)
                  : "https://via.placeholder.com/100"
              }
              alt="Foto de perfil"
              className="rounded-full w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black bg-opacity-50 hover:bg-opacity-50 z-10">
              <FaCamera className="text-white text-2xl opacity-0 hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>
          <input
            type="file"
            id="fileInput"
            className="hidden"
            onChange={handlePhotoUpload}
            accept="image/*"
          />
          <h2 className="text-xl font-semibold">{userData.fullName}</h2>
          <p className="text-gray-500">@{userData.username}</p>
          <p className="text-gray-400 text-sm">
            Membro desde:{" "}
            {new Date(userData.createdAt).toLocaleDateString("pt-PT", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}{" "}
          </p>
        </div>
      </div>

      {/* Coluna Direita: Formulário de Edição do Perfil */}
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl">
        <h1 className="text-2xl font-semibold mb-6">Editar Perfil</h1>
        <div className="flex flex-col gap-6">
          <div className="flex gap-4">
            <div className="w-full">
              <label className="block text-gray-700">Nome Completo</label>
              <input
                type="text"
                value={userData.fullName}
                onChange={(e) =>
                  setUserData({ ...userData, fullName: e.target.value })
                }
                className="border border-gray-300 p-2 rounded-md w-full"
              />
            </div>
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
              <label className="block text-gray-700">Senha</label>
              <input
                type="password"
                className="border border-gray-300 p-2 rounded-md w-full"
              />
            </div>
            <div className="w-full">
              <label className="block text-gray-700">Confirmar Senha</label>
              <input
                type="password"
                className="border border-gray-300 p-2 rounded-md w-full"
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
