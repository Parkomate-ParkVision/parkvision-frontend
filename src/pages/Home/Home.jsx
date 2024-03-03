import React from "react";
import { useState } from "react";

import styles from "./Home.module.css";
import homeCarImage from "../../assets/homeCarImage.svg";
import UpArrowIcon from "../../assets/UpArrowIcon.svg";
import RegisterPage from "../Register/RegisterPage";
import LoginForm from "../../components/Login/Login";

const Home = () => {
  const [firstPage, setFirstPage] = useState(true);

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
            className="h-screen w-[90%] flex flex-col justify-center items-center gap-y-8 mt-16"
          >
            <div className="flex flex-col w-[40%] justify-center items-center gap-x-2 gap-y-4">
              <div className="font-bold text-2xl">Register</div>
              <RegisterPage />
            </div>
            <div className="font-bold text-2xl">OR</div>
            <div className="flex flex-row justify-center w-[90%] gap-x-8 items-center justify-center">
              <a
                href="#login"
                className="flex flex-col w-[50%] items-center justify-center bg-white text-2xl font-bold italic w-[50%] border border-gray p-4 rounded-lg cursor-pointer hover:bg-[#8DBF41] transition duration-300 ease-in-out"
                onClick={() => {
                  setFirstPage(false);
                }}
              >
                <div className="font-bold w-50 text-lg">
                  I already have an account!
                </div>
              </a>
            </div>
          </div>
          <div
            id="login"
            className="h-screen w-[40%] flex flex-col justify-center items-center gap-y-8"
          >
            <div className="flex flex-row justify-center items-center gap-x-2 font-bold w-full text-2xl">
              Sign In
            </div>
            <LoginForm />
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
