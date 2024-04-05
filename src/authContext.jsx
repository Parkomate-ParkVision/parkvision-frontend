import { createContext, useState } from "react";

const AuthContext = createContext({
  login: localStorage.getItem("accessToken") === null,
  userId: "",
  name: "",
  privilege: "",
});

export default AuthContext;
