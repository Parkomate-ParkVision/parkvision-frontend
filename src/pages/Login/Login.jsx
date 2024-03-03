import React from "react";
import homeCarImage from "../../assets/homeCarImage.svg";
import LoginForm from "../../components/Login/Login";

const LoginPage = () => {
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
    </div>
  );
};

export default LoginPage;
