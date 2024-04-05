import React, { useEffect } from "react";

function Profile({
  dropdownRef,
  user,
  toggleVisibility,
  isVisible,
  setIsVisible,
  handleLogout,
  navigate,
}) {
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    const handleWindowClick = (event) => {
      handleClickOutside(event);
    };

    window.addEventListener("click", handleWindowClick);

    return () => {
      window.removeEventListener("click", handleWindowClick);
    };
  }, [handleClickOutside]);

  return (
    <div
      className="userprofile hover:cursor-pointer w-[40px] h-12 max-w-[40px] min-w-[52px] mb-1 rounded-[2rem] flex flex-col items-center transition-all duration-300 ease-in-out"
      ref={dropdownRef}
    >
      <div className="flex flex-col items-center justify-center mt-2">
        {user.profilePicture ? (
          <img
            src={user.profilePicture}
            alt=""
            width="35px"
            className="rounded-xl focus:outline-none"
            onClick={toggleVisibility}
          />
        ) : (
          <i
            className="fa-solid fa-user-circle fa-3x"
            onClick={toggleVisibility}
          ></i>
        )}
      </div>
      {isVisible ? (
        <div className="absolute right-0 z-10 flex flex-col justify-evenly items-center mt-16 bg-white rounded-b-xl shadow-xl border border-gray transition-opacity duration-300">
          <ul className="flex flex-col">
            <li
              className="hover:bg-[#f4f2ee] text-black flex flex-row gap-x-4 items-center justify-start cursor-pointer px-7 py-4"
              onClick={() => {
                navigate("/profile");
                setIsVisible(false);
              }}
            >
              <p className="text-md">Profile</p>
            </li>
            <li
              className="hover:bg-[#f4f2ee] text-black flex flex-row gap-x-4 items-center justify-start cursor-pointer px-7 py-4"
              onClick={() => {
                navigate("/notifications");
                setIsVisible(false);
              }}
            >
              <p className="text-md">Notifications</p>
            </li>
            <li
              className="hover:bg-[#f4f2ee] rounded-b-xl text-black flex flex-row gap-x-4 items-center justify-start cursor-pointer px-8 py-4"
              onClick={handleLogout}
            >
              <p className="text-md">Log out</p>
            </li>
          </ul>
        </div>
      ) : null}
    </div>
  );
}

export default Profile;
