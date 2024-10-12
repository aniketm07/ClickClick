import { useState } from "react";
import axios from "axios";
import { Button, Label, Modal, TextInput } from "flowbite-react";
import { API_URL } from "../../constants/constants";


function RegisterModal({
  setOpenLoginModal,
  setOpenRegisterModal,
  openRegisterModal,
  toast
}) {
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
    fullName: "",
  });
  const handleRegister = () => {
    axios
      .post(`${API_URL}/auth/register`, registerData)
      .then((response) => {
        console.log(response);
        if (response.data.status === "success") {
          toast.success("User created successfully. Please log in.");
          setOpenRegisterModal(false);
          setOpenLoginModal(true);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something went wrong. Please try again.");
      });
  };

  const handleOnChangeRegisterData = (e) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <Modal
      show={openRegisterModal}
      size="md"
      onClose={() => setOpenRegisterModal(false)}
      popup
    >
      <Modal.Header />
      <Modal.Body>
        <div className="space-y-6">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">
            Sign up to our platform
          </h3>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email" value="Email" />
            </div>
            <TextInput
              id="email"
              name="email"
              placeholder="name@company.com"
              onChange={handleOnChangeRegisterData}
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
              onChange={handleOnChangeRegisterData}
              required
            />
          </div>

          <div>
            <div className="mb-2 block">
              <Label htmlFor="fullName" value="Full Name" />
            </div>
            <TextInput
              id="Fullname"
              name="fullName"
              placeholder="John Doe"
              required
              onChange={handleOnChangeRegisterData}
            />
          </div>

          <div>
            <div className="mb-2 block">
              <Label htmlFor="username" value="Username" />
            </div>
            <TextInput
              id="username"
              name="username"
              placeholder="johndoe"
              onChange={handleOnChangeRegisterData}
              required
            />
          </div>

          <div className="w-full">
            <Button
              className="bg-primaryColor hover:bg-darkPrimary transition duration-200 ease-in-out"
              onClick={handleRegister}
            >
              Sign up a new account
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default RegisterModal;
