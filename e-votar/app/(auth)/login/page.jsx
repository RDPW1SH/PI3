'use client'
import React, { useLayoutEffect, useState } from 'react';
import Link from 'next/link';
import { signIn, useSession} from 'next-auth/react';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  
  const {data: session} = useSession();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();


  if(session) {
    router.push('/');
  }
  
  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    const res = await signIn('credentials', {
      email,
      password,
    });

    if(res.ok) {
      router.push('/');
    } else {
      setErrorMessage(res.error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-animated p-5">
      {/* Login Card */}
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-[400px] flex flex-col gap-5">
        <h2 className="text-2xl font-semibold text-primary text-center">Login</h2>
        {/* Display error message */}
        {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
        <form className="flex flex-col gap-4" onSubmit={handleLogin}>
          {/* Email Input */}
          <div className="flex flex-col gap-2">
            <label className="text-primary font-medium" htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-3 rounded-md text-black bg-gray-200 border border-purple-500"
              placeholder="Insira o seu e-mail"
            />
          </div>
          {/* Password Input */}
          <div className="flex flex-col gap-2">
            <label className="text-primary font-medium" htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-3 rounded-md text-black bg-gray-200 border border-purple-500"
              placeholder="Insira a sua senha"
            />
          </div>
          {/* Login Button */}
          <button
            type="submit"
            className="bg-secondaryLight text-primary py-3 rounded-full hover:bg-purple-500 hover:text-white transition-all"
          >
            Entrar
          </button>
        </form>
        {/* Forgot Password & Register Links */}
        <div className="text-center mt-4">
          <Link href="/forgot-password" className="text-primary underline text-sm">
            Esqueceu a senha?
          </Link>
          <br />
          <Link href="/register" className="text-primary underline text-sm">
            Registrar
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
