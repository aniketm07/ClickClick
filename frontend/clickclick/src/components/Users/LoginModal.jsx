import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Label, Modal, TextInput } from "flowbite-react";
import { setSessionCookie } from "../../lib/session";
// import { useAuth } from "../auth/AuthContext";
import { API_URL } from "../../constants/constants";

function LoginModal({ openLoginModal, setOpenLoginModal, toast }) {
  // const { initializeAuth } = useAuth();
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const handleOnChangeLoginData = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async () => {
    axios
      .post(`${API_URL}/auth/login`, loginData)
      .then(async (response) => {
        if (response.data.status === "success") {
          toast.success("User logged in successfully.");
          await setSessionCookie(response.data.token);
          navigate("/dashboard");
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something went wrong. Please try again.");
      });
  };
  return (
    <Modal
      show={openLoginModal}
      size="md"
      onClose={() => setOpenLoginModal(false)}
      popup
    >
      <Modal.Header />
      <Modal.Body>
        <div className="space-y-6">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">
            Sign in to our platform
          </h3>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email" value="Email" />
            </div>
            <TextInput
              id="email"
              name="email"
              placeholder="name@company.com"
              onChange={handleOnChangeLoginData}
              required
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password" value="Password" />
            </div>
            <TextInput
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              onChange={handleOnChangeLoginData}
              required
            />
          </div>

          <div className="w-full">
            <Button
              className="bg-primaryColor hover:bg-darkPrimary transition duration-200 ease-in-out"
              onClick={handleLogin}
            >
              Sign in to your account
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default LoginModal;
