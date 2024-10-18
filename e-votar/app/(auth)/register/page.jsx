'use client'
import React, {useState} from 'react';
import Link from 'next/link';
import { redirect } from 'next/dist/server/api-utils';
import { revalidatePath } from 'next/cache';
import { useRouter } from 'next/navigation';


const RegisterPage = () => {

  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    password: '',
    repeatPassword: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  async function handleRegister(e) {

    e.preventDefault()


    try {

      if (formData.password !== formData.repeatPassword) {
        setErrorMessage('As senhas não correspondem');
        return;
      }

      setErrorMessage('')
      const res = await fetch('/api/auth/register', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)

      })

      
      
      if (res.ok) {
        router.push('/')
      } else {
        const response = await res.json();
        setErrorMessage(response.message); // Error message
      }

    } catch (error) {
      setErrorMessage('Ocorreu um problema, tente reiniciar')
      console.log(error)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-animated p-5">
      {/* Card de Registro */}
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-[400px] flex flex-col gap-5">
        <h2 className="text-2xl font-semibold text-primary text-center">Registrar</h2>
        {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
        <form className="flex flex-col gap-4" onSubmit={handleRegister}>
          {/* Input de Nome */}
          <div className="flex flex-col gap-2">
            <label className="text-primary font-medium" htmlFor="name">Nome</label>
            <input
              type="text"
              id="name"
              name='username'
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="p-3 rounded-md text-black bg-gray-200 border border-purple-500"
              placeholder="Insira o seu nome"
            />
          </div>
          {/* Input de E-mail */}
          <div className="flex flex-col gap-2">
            <label className="text-primary font-medium" htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              name='email'
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="p-3 rounded-md text-black bg-gray-200 border border-purple-500"
              placeholder="Insira o seu e-mail"
            />
          </div>
          {/* Input de Senha */}
          <div className="flex flex-col gap-2">
            <label className="text-primary font-medium" htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              name='password'
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="p-3 rounded-md text-black bg-gray-200 border border-purple-500"
              placeholder="Crie uma senha"
            />
          </div>
          {/* Input de Confirmação de Senha */}
          <div className="flex flex-col gap-2">
            <label className="text-primary font-medium" htmlFor="confirm-password">Confirme a Senha</label>
            <input
              type="password"
              id="confirm-password"
              name='repeatPassword'
              onChange={(e) => setFormData({ ...formData, repeatPassword: e.target.value })}
              className="p-3 rounded-md text-black bg-gray-200 border border-purple-500"
              placeholder="Confirme a sua senha"
            />
          </div>
          {/* Botão de Registro */}
          <button
            type="submit"
            className="bg-secondaryLight text-primary py-3 rounded-full hover:bg-purple-500 hover:text-white transition-all"
          >
            Registrar
          </button>
        </form>
        {/* Link para página de Login */}
        <div className="text-center mt-4">
          <Link href="/login" className="text-primary underline text-sm">
            Já tem uma conta? Faça login!
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
