import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home/Home";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import NavBar from "./components/Navbar/Navbar";
import Dashboard from "./pages/Dashboard/Dashboard";
import ParkingPage from "./pages/Parking/ParkingPage";
import Feed from "./pages/Feed/Feed";
import Verifier from "./pages/Verifier/Verifier";
import OrganizationPage from "./pages/Organization/OrganizationPage";
import IndividualOrganizationPage from "./pages/Organization/IndividualOrganizationPage";
import CCTVPage from "./pages/CCTV/CCTVPage";
import CustomerSegmentation from "./pages/Customer-Segmentation/CustomerSegmentation";
import GatePage from "./pages/Gates/GatePage";
import LoginPage from "./pages/Login/Login";
import DashboardCopy from "./pages/Dashboard/DashboardCopy";

export const router = createBrowserRouter([
  {
    index: true,
    element: <Home />,
  },
  {
    path: "login",
    element: <LoginPage />,
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
        path: "/copy",
        element: <DashboardCopy />,
      },
      {
        path: "parkings",
        element: <ParkingPage />,
      },
      {
        path: "feed",
        element: <Feed />,
      },
      {
        path: "verifier",
        element: <Verifier />,
      },
      {
        path: "cctv",
        element: <CCTVPage />,
      },
      {
        path: "gates",
        element: <GatePage />,
      },
      {
        path: "organizations",
        element: <OrganizationPage />,
      },
      {
        path: "organizations/:id",
        element: <IndividualOrganizationPage />,
      },
      {
        path: "customer-segmentation",
        element: <CustomerSegmentation />,
      },
    ],
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);
