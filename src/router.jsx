import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import NavBar from "./components/Navbar/Navbar";
import Dashboard from "./pages/Dashboard/Dashboard";
import ParkingPage from "./pages/Parking/ParkingPage";
import Feed from "./pages/Feed/Feed";
import Retrainer from "./pages/Retrainer/Retrainer";
import OrganizationPage from "./pages/Organization/OrganizationPage";
import IndividualOrganizationPage from "./pages/Organization/IndividualOrganizationPage";
import CCTVPage from "./pages/CCTV/CCTVPage";
import CustomerSegmentation from "./pages/Customer-Segmentation/CustomerSegmentation";

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
      {
        path: "feed",
        element: <Feed />,
      },
      {
        path: "retrainer",
        element: <Retrainer />,
      },
      {
        path: "cctv",
        element: <CCTVPage />,
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
