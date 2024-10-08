import React from 'react';
import Link from 'next/link';  

const ForgotPasswordPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-animated p-5">
      
      <div className="bg-gray-200 p-10 rounded-lg shadow-lg w-full max-w-[450px] flex flex-col gap-6"> 
        <h2 className="text-3xl font-semibold text-primary text-center">Esqueci a Senha</h2> 
        <p className="text-center text-base text-gray-600"> 
          Insira o seu e-mail abaixo e enviaremos um link para redefinir a sua senha.
        </p>
        <form className="flex flex-col gap-5"> 
          
          <div className="flex flex-col gap-3"> 
            <label className="text-primary font-medium" htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              className="p-4 rounded-md text-black bg-gray-200 border border-purple-500" 
              placeholder="Insira o seu e-mail"
            />
          </div>
          
          <button
            type="submit"
            className="bg-secondaryLight text-primary py-4 rounded-full hover:bg-purple-500 hover:text-white transition-all"
          >
            Enviar link de recuperação
          </button>
        </form>
      
        <div className="text-center mt-5"> 
        <Link href="/login" className="text-primary underline text-sm">
            Voltar ao Login
          </Link> 
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
