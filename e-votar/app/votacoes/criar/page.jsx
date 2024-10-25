"use client";
import { useRouter } from "next/navigation";
import { FaPlus, FaMinus } from "react-icons/fa";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Criar = () => {

  const { data: session } = useSession();
  const [title, setTitle] = useState("");
  const [options, setOptions] = useState([""]);
  const router = useRouter();

  // Adicionar nova opção
  function handleNewBar() {
    setOptions([...options, ""]);
  }

  // Gerir mudança de valor
  const handleOptionChange = (e, index) => {
    const newOptions = [...options];
    newOptions[index] = e.target.value;
    setOptions(newOptions);
  };

  function handleRemoveBar(index) {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
  }

  // Gerir nova votação
  async function handleNewPoll(e) {
    e.preventDefault();

    try {
      const userId = session.user.id;
      console.log("titulo: ", title)
      console.log("id: ", userId)
      console.log("opçoes: ", options)
      const res = await fetch("/api/votacoes/criar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, options, userId }),
      });

      if (res.ok) {

        toast.success("A votação foi criada com sucesso", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "light",
        });
        router.push('/votacoes');

      } else {

        console.error("Error creating poll");

        toast.error("Ocorreu um erro, tente novamente", {
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
    } catch (error) {
      console.error("Failed to create poll:", error);
    }
  }

  return (
    <div className="flex flex-col p-5 justify-center items-center">
      <ToastContainer />
      <h1 className="text-2xl font-semibold pb-5 text-secondary">
        Nova votação
      </h1>
      <div className="flex w-[400px] bg-gray-100 shadow-lg">
        <form
          className="flex flex-col gap-5 p-4 w-full"
          onSubmit={handleNewPoll}
        >
          <input
            type="text"
            className="text-secondary border-primary font-semibold text-xl bg-transparent border-b-2  focus:outline-none"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Post title"
            maxLength={40}
            required
          />

          <div id="poll_options">
            <div className="flex flex-col gap-5 relative">
              {options.map((option, index) => (
                <div className="flex bg-white rounded-2xl" key={index}>
                  <input
                    type="text"
                    value={option}
                    className="p-2 w-full bg-white rounded-2xl focus:outline-primaryLight"
                    onChange={(e) => handleOptionChange(e, index)}
                    placeholder={`Opção ${index + 1}`}
                    required
                  />
                  <FaMinus
                    className="bg-red-400 hover:bg-red-500 rounded-2xl text-white p-2 w-10 h-10 cursor-pointer"
                    onClick={() => handleRemoveBar(index)}
                  />
                </div>
              ))}
            </div>
          </div>

          <FaPlus
            className="rounded-full bg-primary text-white hover:bg-primaryDark w-10 h-10 p-2 cursor-pointer"
            onClick={handleNewBar}
          />
          <button
            type="submit"
            className="p-2 bg-primaryLight hover:bg-primary text-white text-xl rounded-md"
          >
            Create poll
          </button>
        </form>
      </div>
    </div>
  );
};

export default Criar;
