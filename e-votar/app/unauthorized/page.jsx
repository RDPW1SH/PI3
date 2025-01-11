import React from "react";
import { MdError } from "react-icons/md";

const Unauthorized = () => {
  return (
    <div className="flex flex-col justify-center items-center p-5 gap-2">
      <MdError className="w-20 h-20 text-primary" />
      <h1 className="text-lg">
        Voçê não está autorizado a entrar nesta página, tente utilizar outra
        conta ou contacte os administradores.
      </h1>
    </div>
  );
};

export default Unauthorized;
