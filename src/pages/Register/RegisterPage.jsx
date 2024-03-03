import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ApiConfig } from "../../utils/config";
import Fetch from "../../utils/Fetch";
import { toast } from "react-toastify";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    if (name === "" || email === "" || phone === "") {
      toast.error("Please fill all the fields");
      return;
    }
    var response = await Fetch.post(ApiConfig.register, {
      name,
      email,
      phone,
      privilege: 0,
    });
    console.log(await response.json());
    if (response.status === 201) {
      navigate("/login");
      toast.success(
        "Registered Successfully! Please check your email for password!",
        { autoClose: false, position: "top-right", closeOnClick: true }
      );
    } else {
      toast.error("Error Registering!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-[90%]">
      <form
        action={handleRegister}
        className="flex flex-col w-[90%] items-center justify-center gap-y-4"
      >
        <input
          type="text"
          placeholder="Name"
          className="w-full h-[3rem] px-4 py-2 border border-gray rounded-lg"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="example@example.com"
          className="w-full h-[3rem] px-4 py-2 border border-gray rounded-lg"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="tel"
          placeholder="+91 1234567890"
          className="w-full h-[3rem] px-4 py-2 border border-gray rounded-lg"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <div className="flex flex-row justify-center items-center w-full">
          <input
            type="submit"
            className="w-[50%] h-[3rem] bg-black text-[#8DBF41] font-bold cursor-pointer px-4 py-2 rounded-lg border border-gray mt-4 hover:bg-[#8DBF41] hover:text-black transition duration-300 ease-in-out"
            onClick={(e) => {
              e.preventDefault();
              if (name === "" || email === "" || phone === "") {
                toast.error("Please fill all the fields");
                return;
              }
              handleRegister(e);
            }}
            value={"Register"}
          />
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
