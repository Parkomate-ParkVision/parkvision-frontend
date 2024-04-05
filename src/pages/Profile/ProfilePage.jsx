import React, { useEffect } from "react";
import AuthContext from "../../authContext";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ApiConfig } from "../../utils/config";
import axios from "axios";

const ProfilePage = () => {
  const auth = useContext(AuthContext);
  const [user, setUser] = useState({});

  const navigate = useNavigate();

  const fetchOrganizations = async () => {};

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const userId = localStorage.getItem("userId");

    if (!accessToken) {
      navigate("/");
    }

    axios
      .get(ApiConfig.users + "/" + userId + "/", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="w-full h-full bg-[#f4f2ed] flex flex-col items-center justify-center gap-y-8 font-poppins">
      <div className="flex flex-col justify-start items-start w-[96%] h-full bg-white max-md:flex-col border border-gray rounded-lg my-8 p-8">
        <div className="flex flex-row justify-start items-center gap-x-8">
          <div className="profile-pic flex justify-start items-start">
            {user.profilePicture != null ? (
              <img
                src={user.profilePicture}
                alt=""
                className="w-36 h-36 rounded-full border-4 border-black"
              />
            ) : (
              <i className="fas fa-user-circle text-9xl"></i>
            )}
          </div>
          <div>
            <div className="profile-name w-full flex flex-col">
              <h1 className="text-3xl mb-1">{user.name}</h1>
            </div>
            <div className="profile-email w-full flex flex-col">
              <a className="mb-1" href={`mailto:${user.email}`}>
                {user.email}
              </a>
            </div>
            <div className="profile-email w-full flex flex-col">
              <a className="mb-1" href={`tel:${user.phone}`}>
                {String(user.phone).slice(0, 3)} {String(user.phone).slice(3)}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
