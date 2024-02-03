import logout from "../../assets/logout.svg";
import { Outlet, useNavigate } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex flex-row justify-between items-center w-full h-16 bg-white border border-gray font-inter bg-[#f4f2ed]">
        <div className="flex flex-row justify-center items-center gap-x-64 ml-4 max-md:ml-2">
          <a
            href="/"
            className="flex flex-row justify-center items-center text-3xl font-bold cursor-pointer"
          >
            Park<div className="text-[#8DBF41]">Vision</div>
          </a>
          <div className="flex flex-row justify-center items-center font-bold gap-x-8">
            <a
              href="/"
              className="flex flex-row justify-center items-center font-thin cursor-pointer text-gray hover:text-[#8DBF41] transition duration-300 ease-in-out"
            >
              Dashboard
            </a>
            <a
              href="/organizations"
              className="flex flex-row justify-center items-center font-thin cursor-pointer text-black hover:text-[#8DBF41] transition duration-300 ease-in-out"
            >
              Organizations
            </a>
            <a
              href="/cctv"
              className="flex flex-row justify-center items-center font-thin cursor-pointer text-black hover:text-[#8DBF41] transition duration-300 ease-in-out"
            >
              CCTVs
            </a>
            <a
              href="/parkings"
              className="flex flex-row justify-center items-center font-thin cursor-pointer text-black hover:text-[#8DBF41] transition duration-300 ease-in-out"
            >
              Parking Lots
            </a>
            <a
              href="/feed"
              className="flex flex-row justify-center items-center font-thin cursor-pointer text-black hover:text-[#8DBF41] transition duration-300 ease-in-out"
            >
              Real Time Feed
            </a>
            <a
              href="/billing"
              className="flex flex-row justify-center items-center font-thin cursor-pointer text-black hover:text-[#8DBF41] transition duration-300 ease-in-out"
            >
              Billing
            </a>
            <a
              href="/customer-segmentation"
              className="flex flex-row justify-center items-center font-thin cursor-pointer text-black hover:text-[#8DBF41] transition duration-300 ease-in-out"
            >
              Customer Segmentation
            </a>
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
    </div>
  );
};

export default NavBar;
