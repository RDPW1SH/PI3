"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FaPlus, FaMinus, FaCalendar } from "react-icons/fa"; // react icons - icons
import { useSession } from "next-auth/react"; // next-auth session
import { ToastContainer, toast } from "react-toastify"; // react-toastify
import "react-toastify/dist/ReactToastify.css"; // react-toastify css
import DatePicker from "react-datepicker"; // react-datepicker
import { pt } from "date-fns/locale/pt"; // react-datepicker datetype
import "react-datepicker/dist/react-datepicker.css"; // react-datepicker css

const Criar = () => {
  const { data: session } = useSession();
  const [title, setTitle] = useState("");
  const [options, setOptions] = useState([""]);
  const [startDate, setStartDate] = useState(() => new Date(Date.now() + 15 * 60 * 1000));
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
      console.log("titulo: ", title);
      console.log("id: ", userId);
      console.log("opçoes: ", options);
      const res = await fetch("/api/votacoes/criar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, options, userId, startDate }),
      });

      if (res.ok) {
        toast.success(res.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "light",
        });
        router.push("/votacoes");
      } else {

        toast.error(res.message, {
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

          {/* Adicionar opções e definir data*/}
          <div className="flex justify-between items-center">
            <FaPlus
              className="rounded-full bg-primary text-white hover:bg-primaryDark w-10 h-10 p-2 cursor-pointer"
              onClick={handleNewBar}
            />
            <DatePicker
              className="bg-primary text-white p-1 hover:bg-primaryLight rounded-md cursor-pointer focus:outline-none"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              closeOnScroll={true}
              showTimeInput // Time input
              showIcon
              icon={<FaCalendar className="text-white" />} // Icon do calendario
              dateFormat="Pp"
              locale={pt}
            />
          </div>

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
