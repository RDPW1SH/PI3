import React from 'react';

const LoginPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-animated p-5">
      {/* Card de Login */}
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-[400px] flex flex-col gap-5">
        <h2 className="text-2xl font-semibold text-primary text-center">Login</h2>
        <form className="flex flex-col gap-4">
          {/* Input de E-mail */}
          <div className="flex flex-col gap-2">
            <label className="text-primary font-medium" htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
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
              className="p-3 rounded-md text-black bg-gray-200 border border-purple-500"
              placeholder="Insira a sua senha"
            />
          </div>
          {/* Botão de Login */}
          <button
            type="submit"
            className="bg-secondaryLight text-primary py-3 rounded-full hover:bg-purple-500 transition-all"
          >
            Entrar
          </button>
        </form>
        {/* Link para recuperar senha */}
        <div className="text-center mt-4">
          <a href="#" className="text-primary underline text-sm">
            Esqueceu a senha?
          </a>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
