import Logo from "../assets/logo-no-background.svg";
import CameraGif from "../assets/output-onlinegiftools.gif";
import UploadPNG from "../assets/submit.png";
import AlgorithmPNG from  "../assets/algorithm.png";
import ClickPNG from "../assets/click.png";
import { useState, useEffect } from "react";
import { checkAlreadyLoggedIn } from "../lib/session";
import { useNavigate } from "react-router-dom";
import RegisterModal from "../components/Users/RegisterModal";
import LoginModal from "../components/Users/LoginModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Landing() {
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openRegisterModal, setOpenRegisterModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if(checkAlreadyLoggedIn()) {
      navigate("/dashboard");
    }
  }, [navigate]);

  return (
    <div className="flex flex-col overflow-auto w-full bg-primaryColor">
      <div className="w-full h-24 flex justify-center items-center mt-10 py-2 bg-darkBackground">
        <img src={Logo} alt="Logo of the ClickClick" className="h-10" />
      </div>
      <div className="flex mt-40 justify-between lg:px-40 md:px-20 px-5">
        <div className="max-w-[800px] mt-[-96px] w-full mx-auto text-center flex-1 flex flex-col justify-center md:items-start">
          <h1 className=" text-whiteColor md:text-start md:text-5xl text-4xl font-bold md:py-6 mb-4 md:mb-1 animate-slide-up-opacity duration-200">
            Upload, Share, and Explore with Ease
          </h1>
          <p className="md:text-start md:text-xl text-md font-bold text-whiteColor animate-slide-up-opacity">
            Are you ready to unleash your creativity? Look no further than
            ClickClick – your go-to platform for effortless image sharing and
            exploration. Whether you're an avid photographer, a passionate
            artist, or just someone who loves to capture moments, ClickClick is
            here to elevate your experience.
          </p>
          <div className="flex flex-row gap-2">
            <button
              className=" bg-whiteColor w-[200px] font-bold mx-auto md:mx-0 rounded-md my-6 py-3 text-darkPrimary animate-slide-up-opacity hover:cursor-pointer hover:text-whiteColor hover:bg-darkPrimary transition-all ease-in-out duration-200"
              onClick={() => setOpenLoginModal(true)}
            >
              Login Now
            </button>
            <button
              className=" bg-whiteColor w-[200px] font-bold mx-auto md:mx-0 rounded-md my-6 py-3 text-darkPrimary animate-slide-up-opacity hover:cursor-pointer hover:text-whiteColor hover:bg-darkPrimary transition-all ease-in-out duration-200"
              onClick={() => setOpenRegisterModal(true)}
            >
              Register Now
            </button>
          </div>
        </div>
        <div className=" hidden md:flex flex-1 items-center justify-center ">
          <img src={CameraGif} className="w-full max-w-[1200px] px-5" alt="" />
        </div>
      </div>
      <div className="w-full h-fit flex flex-row items-center justify-center">
        <div className="flex flex-col lg:flex-row w-[80%] h-full bg-backgroundColor gap-8 p-10 text-center">
          <div className="flex flex-col basis-1/3 items-center justify-start gap-8">
            <img className="w-16 h16" src={UploadPNG} alt="upload PNG"></img>
            <p className="text-primaryColor font-semibold text-lg">
              Uploading your favorite images has never been easier. With just a
              few clicks, your creations are ready to be shared with the world.
            </p>
          </div>
          <div className="flex flex-col basis-1/3 items-center justify-start gap-8">
            <img className="w-16 h16" src={ClickPNG} alt="click PNG"></img>
            <p className="text-primaryColor font-semibold text-lg">
              Keep up with the latest trends and discover new content
              effortlessly by subscribing to your favorite tags.
            </p>
          </div>
          <div className="flex flex-col basis-1/3 items-center justify-start gap-8">
            <img className="w-16 h16" src={AlgorithmPNG} alt="algorithm PNG"></img>
            <p className="text-primaryColor font-semibold text-lg">
              ClickClick utilizes advanced algorithms to automatically generate
              tags for your images, making them easily discoverable by others
              who share your interests.
            </p>
          </div>
        </div>
      </div>
      <RegisterModal setOpenLoginModal={setOpenLoginModal} setOpenRegisterModal={setOpenRegisterModal} openRegisterModal={openRegisterModal} toast={toast}/>
      <LoginModal openLoginModal={openLoginModal} setOpenLoginModal={setOpenLoginModal} toast={toast} />
      <ToastContainer />
    </div>
  );
}

export default Landing;
