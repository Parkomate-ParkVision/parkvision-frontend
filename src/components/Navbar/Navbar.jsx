import { useState, useEffect } from "react";
import logout from "../../assets/logout.svg";
import { Outlet, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { NavLink,useLocation } from "react-router-dom";
import { FaArrowUp } from "react-icons/fa";

const ScrollToTopButton = ({ show }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      className={`fixed bottom-4 left-4 rounded-full ${
        show ? "visible" : "invisible"
      }`}
      onClick={scrollToTop}
      style={{  }}
    >
      <img width="64" height="64" src="/src/assets/icons8-collapse-arrow-64(1).png" alt="collapse-arrow--v1"/>    
    </button>
  );
};

const NavBar = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex flex-row justify-between items-center w-full h-16 bg-white border border-gray font-inter bg-[#f4f2ed]">
        <div className="flex flex-row justify-center items-center gap-x-64 ml-4 max-md:ml-2">
          <NavLink
            to="/"
            className="flex flex-row justify-center items-center text-3xl font-bold cursor-pointer"
          >
            Park<div className="text-[#8DBF41]">Vision</div>
          </NavLink>
          <div className="flex flex-row justify-center items-center font-bold gap-x-8">
            <NavLink
              to="/"
              className={`flex flex-row justify-center items-center font-thin cursor-pointer text-black hover:text-[#8DBF41] transition duration-300 ease-in-out ${
                location.pathname == "/" ? "text-[#8DBF41] bg-gray-200 p-2 rounded" : ""
              }`}
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/organizations"
              className={`flex flex-row justify-center items-center font-thin cursor-pointer text-black hover:text-[#8DBF41] transition duration-300 ease-in-out ${
                location.pathname == "/organizations"
                  ? "text-[#8DBF41] bg-gray-200 p-2 rounded"
                  : ""
              }`}
            >
              Organizations
            </NavLink>
            <NavLink
              to="/cctv"
              className={`flex flex-row justify-center items-center font-thin cursor-pointer text-black hover:text-[#8DBF41] transition duration-300 ease-in-out ${
                location.pathname == "/cctv" ? "text-[#8DBF41] bg-gray-200 p-2 rounded" : ""
              }`}
            >
              CCTVs
            </NavLink>
            <NavLink
              to="/parkings"
              className={`flex flex-row justify-center items-center font-thin cursor-pointer text-black hover:text-[#8DBF41] transition duration-300 ease-in-out ${
                location.pathname == "/parkings" ? "text-[#8DBF41] bg-gray-200 p-2 rounded" : ""
              }`}
            >
              {console.log(location.pathname == "/parkings")}
              Parking Lots
            </NavLink>
            <NavLink
              to="/feed"
              className={`flex flex-row justify-center items-center font-thin cursor-pointer text-black hover:text-[#8DBF41] transition duration-300 ease-in-out ${
                location.pathname == "/feed" ? "text-[#8DBF41] bg-gray-200 p-2 rounded" : ""
              }`}
            >
              Real Time Feed
            </NavLink>
            <NavLink
              to="/billing"
              className={`flex flex-row justify-center items-center font-thin cursor-pointer text-black hover:text-[#8DBF41] transition duration-300 ease-in-out ${
                location.pathname == "/billing" ? "text-[#8DBF41] bg-gray-200 p-2 rounded" : ""
              }`}
            >
              Billing
            </NavLink>
            <NavLink
              to="/customer-segmentation"
              className={`flex flex-row justify-center items-center font-thin cursor-pointer text-black hover:text-[#8DBF41] transition duration-300 ease-in-out ${
                location.pathname == "/customer-segmentation"
                  ? "text-[#8DBF41] bg-gray-200 p-2 rounded"
                  : ""
              }`}
            >
              Customer Segmentation
            </NavLink>
          </div>
        </div>
        <div
          className="flex flex-row justify-center items-center gap-x-4 mr-2 cursor-pointer"
          onClick={() => {
            localStorage.clear();
            window.location.href = "/";
          }}
        >
          <img src={logout} alt="Logout" className="w-8 h-8" />
        </div>
      </div>
      <div className="flex flex-row justify-center items-center w-full h-full">
        <Outlet />
      </div>
      <ScrollToTopButton show={showScrollButton} />
    </div>
  );
};

export default NavBar;
