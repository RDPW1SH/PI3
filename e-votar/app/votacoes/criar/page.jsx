"use client";
import { useRouter } from "next/navigation";
import { FaPlus, FaMinus } from "react-icons/fa";
import React, { useState } from "react";
import { useSession } from "next-auth/react";

const Criar = () => {

  const {data: session} = useSession();
  const [title, setTitle] = useState("");
  const [options, setOptions] = useState([""]);

  // Add a new option input field
  function handleNewBar() {
    setOptions([...options, ""]);
  }

  // Handle option value change
  const handleOptionChange = (e, index) => {
    const newOptions = [...options];
    newOptions[index] = e.target.value;
    setOptions(newOptions);
  };

  function handleRemoveBar(index) {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
  }
  // Handle form submission
  async function handleNewPoll(e) {
    e.preventDefault();

    try {
      const userId = session.user.id;
      const res = await fetch("/api/votacoes/criar", {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, options, userId }),
      });

      if (res.ok) {
        console.log('POLL CREATED OHOHOHOHO')
      } else {
        console.error("Error creating poll");
      }
    } catch (error) {
      console.error("Failed to create poll:", error);
    }
  }

  return (
    <div className="flex flex-col p-5 justify-center items-center">
        <h1 className="text-2xl font-semibold pb-5 text-secondary">Nova votação</h1>
      <div className="flex w-[400px] bg-gray-100 shadow-lg">
        <form className="flex flex-col gap-5 p-4 w-full" onSubmit={() => handleNewPoll()}>
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
                    onClick={() => handleRemoveBar(index)}/>
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
          className="p-2 bg-primaryLight hover:bg-primary text-white text-xl rounded-md">Create poll</button>
        </form>
      </div>
    </div>
  );
};

export default Criar;
