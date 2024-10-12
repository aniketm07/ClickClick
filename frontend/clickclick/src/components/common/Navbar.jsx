import React, { useState, useEffect, useRef } from "react";
import Logo from "../../assets/logo-no-background.svg";
import { useNavigate } from "react-router-dom";
import { removeSession, getEmail, getSession } from "../../lib/session";
import axios from "axios";
import { API_URL } from "../../constants/constants";
import UploadSVG from "../../assets/upload.svg";

function Navbar() {
  const [user, setUser] = useState(null);
  const [showLogoutDropdown, setShowLogoutDropdown] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState(null);
  const token = getSession();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchEmail = async () => {
      const email = await getEmail();
      setEmail(email);
    };
    fetchEmail();
  }, []);

  useEffect(() => {
    if (email) {
      axios
        .get(`${API_URL}/api/users/${email}`, {
          headers: {
            Authorization: `${token}`,
          },
        })
        .then((response) => {
          console.log(response.data.body.user);
          setUser(response.data.body.user);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [email, token]);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowLogoutDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogoutDropdown = () => {
    setShowLogoutDropdown(!showLogoutDropdown);
  };

  return (
    <nav className="flex flex-row justify-between bg-backgroundColor sticky top-0 z-50 border-b-2 border-gray-200 items-center">
      <div className="py-2 px-10">
        <img
          className="h-9 hover:cursor-pointer"
          src={Logo}
          alt=""
          onClick={() => navigate("/dashboard")}
        />
      </div>
      <div className="flex flex-row items-center px-5 gap-5">
        <p
          className="font-semibold hidden md:block rounded-lg text-primaryColor hover:text-darkPrimary hover:scale-110 hover:font-bold cursor-pointer transition duration-200 ease-in-out"
          onClick={() => navigate("/create")}
        >
          Create Post
        </p>
        <img src={UploadSVG} alt="" className="w-8 h-8 visible md:hidden hover:cursor-pointer hover:scale-110 transition-all ease-in-out duration-200" />
        {user && (
          <div className="relative" ref={dropdownRef}>
            <img
              onClick={handleLogoutDropdown}
              className="w-9 h-9 m-1 rounded-full hover:cursor-pointer hover:ring-2 hover:ring-darkPrimary transition-shadow"
              src={`https://ui-avatars.com/api/?name=${user.fullName}`}
              alt="Bordered avatar"
            />
            {showLogoutDropdown && (
              <div className="absolute right-1 mt-2 py-2 w-48 bg-backgroundColor rounded-lg shadow-xl z-10">
                <button
                  className="block px-4 py-2 text-darkPrimary hover:bg-primaryColor hover:text-white w-full text-left"
                  onClick={() => navigate("/profile")}
                >
                  Profile
                </button>
                <button
                  className="block px-4 py-2 text-darkPrimary hover:bg-primaryColor hover:text-white w-full text-left"
                  onClick={() => {
                    removeSession();
                    navigate("/");
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
