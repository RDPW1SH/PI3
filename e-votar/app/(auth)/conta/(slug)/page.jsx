'use client'
import React, { useState, useEffect } from 'react';
import { FaCamera } from 'react-icons/fa';

// Função para fazer a requisição dos dados do utilizador na base de dados
const fetchUserData = async () => {
  const response = await fetch('/api/user'); // Modifique a URL conforme o endpoint da sua API
  const data = await response.json();
  return data; // Retorna os dados do utilizador
};

// Função para atualizar os dados do utilizador na base de dados
const updateUserData = async (userData) => {
  const response = await fetch('/api/user', { // Modifique a URL conforme o endpoint da sua API
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error('Falha ao atualizar os dados');
  }

  const data = await response.json();
  return data; // Retorna os dados atualizados
};

const UserProfile = () => {
  const [userData, setUserData] = useState({
    fullName: '',
    username: '',
    email: '',
    memberSince: '',
  });
  const [newPhoto, setNewPhoto] = useState(null);
  const [isHovering, setIsHovering] = useState(false);

  // Carregar os dados do utilizador ao carregar o componente
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const data = await fetchUserData();
        setUserData({
          fullName: data.fullName,
          username: data.username,
          email: data.email,
          memberSince: data.memberSince,
        });
      } catch (error) {
        console.error('Erro ao carregar dados do utilizador:', error);
      }
    };

    loadUserData();
  }, []);

  const handlePhotoUpload = (e) => {
    setNewPhoto(e.target.files[0]);
  };

  const triggerFileInput = () => {
    document.getElementById('fileInput').click();
  };

  // Função para atualizar as informações do utilizador
  const handleUpdateUserData = async () => {
    try {
      const updatedData = { ...userData, newPhoto }; // Se houver nova foto, inclua-a
      const updatedUser = await updateUserData(updatedData);
      setUserData(updatedUser);
      alert('Informações atualizadas com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar informações:', error);
      alert('Falha ao atualizar informações.');
    }
  };

  return (
    <div className="flex flex-col md:flex-row w-full p-5 gap-10 items-start justify-center">
      {/* Coluna Esquerda: Informações e Foto do Usuário */}
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-xs">
        <div className="flex flex-col items-center">
          <div
            className="relative cursor-pointer w-28 h-28"
            onClick={triggerFileInput}
          >
            <img
              src={newPhoto ? URL.createObjectURL(newPhoto) : "https://via.placeholder.com/100"}
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
            Membro desde: {userData.memberSince}
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
                className="border border-gray-300 p-2 rounded-md w-full"
                onChange={(e) => setUserData({ ...userData, fullName: e.target.value })}
              />
            </div>
            <div className="w-full">
              <label className="block text-gray-700">Username</label>
              <input
                type="text"
                value={userData.username}
                className="border border-gray-300 p-2 rounded-md w-full"
                disabled
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
              className="border border-gray-300 p-2 rounded-md w-full"
              onChange={(e) => setUserData({ ...userData, email: e.target.value })}
            />
          </div>

          <button
            className="bg-primary text-white px-4 py-2 rounded-md w-full mt-6 hover:bg-primaryLight transition-colors"
            onClick={handleUpdateUserData}
          >
            Atualizar Informações
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
