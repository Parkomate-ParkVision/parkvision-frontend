import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import homeCarImage from "../../assets/homeCarImage.svg";
import UpArrowIcon from "../../assets/UpArrowIcon.svg";
import styles from "./Home.module.css";
import Fetch from "../../utils/Fetch";
import { ApiConfig } from "../../utils/config";
import { toast } from "react-toastify";

const Home = () => {
  const [firstPage, setFirstPage] = useState(true);
  const [userType, setUserType] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async ({ e }) => {
    console.log(email, password, userType);
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    var response = await Fetch.post(ApiConfig.login, formData);
    // console.log(await response.json());
    if (response.status === 200) {
      response = await response.json();
      localStorage.setItem("accessToken", response.tokens.access);
      localStorage.setItem("refreshToken", response.tokens.refresh);
      localStorage.setItem("userType", userType);
      window.location.href = "";
      toast.success("Logged In Successfully");
    } else {
      toast.error("Invalid Credentials");
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    window.location.href = "";
  };

  return (
    <div>
      <div className="relative w-[100%] bg-[#f4f2ed] flex flex-row h-full justify-between items-center max-md:flex-col max-md:flex-col max-md:justify-start max-md:h-[50%] overflow-hidden font-inter">
        <img
          src={homeCarImage}
          alt="Car Image"
          h
          className="fixed object-cover top-0 left-0 w-[20%] h-[100vh] max-md:-rotate-90 max-md:w-full max-md:h-[50%] max-md:top-0 max-md:justify-start max-md:relative max-md:overflow-hidden transition duration-300 ease-in-out"
        />
        <div
          id=""
          className="w-[80%] flex flex-col justify-center items-center text-center h-full text-center gap-y-4 ml-[20%] max-md:w-full max-md:ml-[0%] overflow-hidden"
        >
          <div className="flex flex-col justify-center items-center h-screen w-full text-center gap-y-16">
            <h1 className="text-6xl font-bold w-full italic w-full">
              Welcome to{" "}
              <div className="flex flex-row justify-center items-center">
                Park<div className="text-[#8DBF41]">Vision</div>
              </div>
            </h1>
            <div className="w-full">
              <a
                href="#signintype"
                onClick={() => {
                  setFirstPage(false);
                }}
              >
                <button className="w-[30%] h-[4rem] bg-black text-[#8DBF41] text-2xl font-bold px-4 py-2 rounded-lg border border-gray mt-4 hover:bg-[#8DBF41] hover:text-black transition duration-300 ease-in-out">
                  Get Started
                </button>
              </a>
            </div>
          </div>
          <div
            id="signintype"
            className="h-screen w-full flex flex-col justify-center items-center gap-y-8"
          >
            <div className="font-bold w-full text-2xl">Sign In as </div>
            <div className="flex flex-row w-[90%] gap-x-8">
              <a
                href="#login"
                className="flex flex-col w-[90%] items-center justify-center bg-white text-2xl font-bold italic w-full border border-gray p-4 rounded-lg cursor-pointer hover:bg-[#8DBF41] transition duration-300 ease-in-out"
                onClick={() => {
                  setUserType("admin");
                  setFirstPage(false);
                }}
              >
                <div className="flex flex-col justify-center items-center">
                  <img
                    src="https://img.icons8.com/ios/50/000000/user.png"
                    alt="User"
                    className="w-12 h-12"
                  />
                  <div className="flex flex-row justify-center items-center">
                    Admin
                  </div>
                </div>
              </a>
              <a
                href="#login"
                className="flex flex-col w-[90%] items-center justify-center bg-white text-2xl font-bold italic w-full border border-gray p-4 rounded-lg cursor-pointer hover:bg-[#8DBF41] transition duration-300 ease-in-out"
                onClick={() => {
                  setUserType("superadmin");
                  setFirstPage(false);
                }}
              >
                <div className="flex flex-col justify-center items-center">
                  <img
                    src="https://img.icons8.com/ios/50/000000/user.png"
                    alt="User"
                    className="w-12 h-12"
                  />
                  <div className="flex flex-row justify-center items-center">
                    Super Admin
                  </div>
                </div>
              </a>
            </div>
          </div>
          <div
            id="login"
            className="h-screen w-[40%] flex flex-col justify-center items-center gap-y-8"
          >
            <div className="flex flex-row justify-center items-center gap-x-2 font-bold w-full text-2xl">
              Sign In as{" "}
              <div className="text-[#8DBF41]">
                {userType == "admin" ? "Admin" : "Super Admin"}
              </div>
            </div>
            <div className="flex flex-col justify-center items-center w-full gap-y-4">
              <form
                action={handleLogin}
                className="flex flex-col w-[90%] gap-y-4"
              >
                <input
                  type="text"
                  placeholder="example@example.com"
                  className="w-full h-[3rem] px-4 py-2 border border-gray rounded-lg"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="********"
                  className="w-full h-[3rem] px-4 py-2 border border-gray rounded-lg"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="flex flex-row justify-center items-center w-full">
                  <input
                    type="submit"
                    className="w-[50%] h-[3rem] bg-black text-[#8DBF41] font-bold px-4 py-2 rounded-lg border border-gray mt-4 hover:bg-[#8DBF41] hover:text-black transition duration-300 ease-in-out"
                    onClick={(e) => {
                      handleLogin(e);
                    }}
                    value={"Sign In"}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {!firstPage && (
        <img
          src={UpArrowIcon}
          alt=""
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 bg-none text-[#8DBF41] px-4 py-2 rounded-full cursor-pointer hover:bg-[#8DBF41] hover:text-black transition duration-300 ease-in-out w-12 h-12"
        />
      )}
    </div>
  );
};

export default Home;
