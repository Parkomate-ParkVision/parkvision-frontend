import "./App.css";
import React, { useContext } from "react";
import AuthContext from "./authContext.jsx";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { router, authRouter } from "./router";

function App() {
  const auth = useContext(AuthContext);
  return (
    <>
      {auth.login ? (
        <>
          <RouterProvider router={router} />
        </>
      ) : (
        <>
          <RouterProvider router={authRouter} />
        </>
      )}
      <ToastContainer />
    </>
  );
}

export default App;
