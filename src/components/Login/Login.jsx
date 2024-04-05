import React from "react";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../authContext";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Fetch from "../../utils/Fetch";
import { ApiConfig } from "../../utils/config";
import { toast } from "react-toastify";

const LoginForm = () => {
  const setAuth = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState({});

  const handleLogin = async ({ e }) => {
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    var response = await Fetch.post(ApiConfig.login, { email, password });
    if (response.status === 200) {
      response = await response.json();
      // console.log(response);
      var decoded = jwtDecode(response.tokens.access);
      const userId = decoded.user_id;
      localStorage.setItem("userId", userId);
      localStorage.setItem("accessToken", response.tokens.access);
      localStorage.setItem("refreshToken", response.tokens.refresh);
      localStorage.setItem("privilege", response.tokens.privilege);
      window.location.href = "/";
      axios
        .get(ApiConfig.users + "/" + userId + "/", {
          headers: {
            Authorization: `Bearer ${response.tokens.access}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          setUser(res.data);
          setAuth({
            login: true,
            userId: userId,
            name: res.data.name,
            privilege: res.data.privilege,
            email: res.data.email,
          });
        })
        .catch((err) => {
          console.log(err);
        });
      toast.success("Logged In Successfully");
    } else {
      toast.error("Invalid Credentials");
    }
  };
  return (
    <div className="flex flex-col justify-center items-center w-full gap-y-4">
      <form action={handleLogin} className="flex flex-col w-[90%] gap-y-4">
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
            className="w-[50%] h-[3rem] bg-black text-[#8DBF41] font-bold cursor-pointer px-4 py-2 rounded-lg border border-gray mt-4 hover:bg-[#8DBF41] hover:text-black transition duration-300 ease-in-out"
            onClick={(e) => {
              e.preventDefault();
              if (email === "" || password === "") {
                toast.error("Please fill all the fields");
                return;
              }
              handleLogin(e);
            }}
            value={"Sign In"}
          />
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
