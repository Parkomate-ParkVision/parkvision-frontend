import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import NavBar from "./components/Navbar/Navbar";
import Dashboard from "./pages/Dashboard/Dashboard";
import ParkingPage from "./pages/Parking/ParkingPage";

export const router = createBrowserRouter([
  {
    index: true,
    element: <Home />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

export const authRouter = createBrowserRouter([
  {
    path: "/",
    element: <NavBar />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "parkings",
        element: <ParkingPage />,
      },
    ],
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);
