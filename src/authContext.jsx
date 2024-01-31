import { createContext, useState } from "react";

const AuthContext = createContext({
  login: localStorage.getItem("accessToken") === null,
  uid: "",
  uname: "",
});

export default AuthContext;
