import React, { useRef, useEffect, useState } from "react";
import Navbar from "../components/common/Navbar";
import axios from "axios";
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { API_URL } from "../constants/constants";
import { getSession, getEmail } from "../lib/session";

function CreatePost() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  let [uploadedFile, setUploadedFile] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    username: "",
    image: "",
    imageType: "",
    fullName: "",
  });
  const fileInputRef = useRef(null);
  const drop = useRef(null);
  const [email, setEmail] = useState(null);
  const token = getSession();

  useEffect(() => {
    const fetchEmail = async () => {
      const email = await getEmail();
      setEmail(email);
    };
    fetchEmail();
  }, []);

  useEffect(() => {
    drop.current.addEventListener("dragover", handleDragOver);
    drop.current.addEventListener("drop", handleDrop);
    if (email) {
      axios
        .get(`${API_URL}/api/users/${email}`, {
          headers: {
            Authorization: `${token}`,
          },
        })
        .then((response) => {
          setUser(response.data.body.user);
          const username = response.data.body.user.username;
          const fullName = response.data.body.user.fullName;
          console.log(username);
          setFormData(prevFormData => ({
            ...prevFormData,
            username: username,
            fullName: fullName
          }));
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [email, token]);

  const handleFileInputChange = (e) => {
    const { files } = e.target;
    if (files?.length) {
      setUploadedFile(URL.createObjectURL(files[0]));
      base64Image(files[0])
            .then(base64Data => {
                // Set the base64 image data and type in the state
                setFormData((prevState) => ({
                    ...prevState,
                    image: base64Data,
                    imageType: files[0].type,
                }));
            })
            .catch(error => {
                console.error('Error converting image to base64:', error);
            });
    }
  };
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  function base64Image(image) {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => {
            resolve(reader.result);
        }
        reader.readAsDataURL(image);
    });
}

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const { files } = e.dataTransfer;
    if (files?.length) {
      setUploadedFile(URL.createObjectURL(files[0]));

      base64Image(files[0])
            .then(base64Data => {
                // Set the base64 image data and type in the state
                setFormData((prevState) => ({
                    ...prevState,
                    image: base64Data,
                    imageType: files[0].type,
                }));
            })
            .catch(error => {
                console.error('Error converting image to base64:', error);
            });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
      axios.post(`${API_URL}/api/posts`, formData, { headers: { Authorization: `${token}` } }).then((response) => {
          toast.success("Post created successfully! 🎉")
          event.target.reset();
          setTimeout(() => navigate("/dashboard"), 2000);
      }).catch((error) => {
          toast.error(error.message);
          console.log(error);
      })
  }

  const handleChange = (e) => {
    let { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col overflow-auto w-full bg-darkBackground p-10">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col w-full bg-backgroundColor p-10 border-2 mb-10 border-gray-200 rounded-md">
            <input
              placeholder="Enter Title"
              name="title"
              id="title"
              className=" text-darkPrimary font-bold placeholder-gray-400 placeholder:font-bold w-full py-1.5 mb-2 mt-1 text-5xl transition duration-200 ease-in-out rounded-lg bg-whiteColor border-none focus:outline-none"
              onChange={handleChange}
            />
            <input
              placeholder="Enter Description"
              name="description"
              id="description"
              className=" text-darkPrimary font-bold placeholder-gray-400 placeholder:font-bold w-full py-1.5 mb-2 mt-1 text-lg transition duration-200 ease-in-out rounded-lg bg-whiteColor border-none focus:outline-none"
              onChange={handleChange}
            />
            <input
              ref={fileInputRef}
              onChange={handleFileInputChange}
              className="hidden"
              id="file-upload"
              name="file-upload"
              type="file"
              accept="image/*"
            />
            <div
              ref={drop}
              className="group col-span-full"
              onClick={handleButtonClick}
            >
              <div className=" flex justify-center rounded-lg border-2 border-dashed border-gray-400 px-6 py-10 hover:cursor-pointer group-hover:border-primaryColor transition duration-300 ease-in-out">
                <div className="text-center">
                  <svg className="mx-auto h-12 w-12 group-hover:fill-current group-hover:text-primaryColor transition duration-200 ease-in-out" fill="#000000" height="48px" width="48px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 487 487" xmlSpace="preserve"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M308.1,277.95c0,35.7-28.9,64.6-64.6,64.6s-64.6-28.9-64.6-64.6s28.9-64.6,64.6-64.6S308.1,242.25,308.1,277.95z M440.3,116.05c25.8,0,46.7,20.9,46.7,46.7v122.4v103.8c0,27.5-22.3,49.8-49.8,49.8H49.8c-27.5,0-49.8-22.3-49.8-49.8v-103.9 v-122.3l0,0c0-25.8,20.9-46.7,46.7-46.7h93.4l4.4-18.6c6.7-28.8,32.4-49.2,62-49.2h74.1c29.6,0,55.3,20.4,62,49.2l4.3,18.6H440.3z M97.4,183.45c0-12.9-10.5-23.4-23.4-23.4c-13,0-23.5,10.5-23.5,23.4s10.5,23.4,23.4,23.4C86.9,206.95,97.4,196.45,97.4,183.45z M358.7,277.95c0-63.6-51.6-115.2-115.2-115.2s-115.2,51.6-115.2,115.2s51.6,115.2,115.2,115.2S358.7,341.55,358.7,277.95z"></path> </g> </g> </g></svg>
                  <div className="mt-4 flex text-sm leading-6">
                    <span className="font-bold text-darkPrimary group-hover:text-primaryColor transition duration-300 ease-in-out">
                      Upload an image
                      <span className="text-gray-400 ml-1">
                        or drag and drop
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-5 w-full my-10">
              <div className="flex flex-row justify-between items-center">
                <p className="text-darkPrimary font-bold text-xl">
                  Uploaded Image:{" "}
                </p>
                <button type="submit" className="px-4 py-2 rounded-lg bg-primaryColor text-white hover:bg-darkPrimary transition duration-200 ease-in-out">
                  {" "}
                  Create!{" "}
                </button>
              </div>
              <img
                className="w-full object-cover rounded-md"
                src={uploadedFile}
              />
            </div>
          </div>
        </form>
        <ToastContainer />
      </div>

    </>
  );
}

export default CreatePost;
