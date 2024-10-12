import React, { useEffect, useState } from "react";
import Navbar from "../components/common/Navbar";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../constants/constants";
import { getSession, getEmail } from "../lib/session";

function Profile() {
  const [user, setUser] = useState(null);
  const [allTags, setAllTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [userTags, setUserTags] = useState([]);
  const navigate = useNavigate();
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
    const fetchData = async () => {
      if (email) {
        try {
          const tagsResponse = await axios.get(`${API_URL}/api/posts/tags`, {
            headers: {
              Authorization: `${token}`,
            },
          });
          setAllTags(tagsResponse.data.tags);

          axios
            .get(`${API_URL}/api/users/${email}`, {
              headers: {
                Authorization: `${token}`,
              },
            })
            .then((response) => {
              setUser(response.data.body.user);
              setUserTags(response.data.body.user.tags);
            })
            .catch((error) => {
              console.log(error);
            });
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData();
  }, [email, token]);

  const handleSubmit = () => {
    axios
      .patch(
        `${API_URL}/api/users/subscribe`,
        {
          email: user.email,
          tags: selectedTags,
        },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      )
      .then((response) => {
        toast.success(
          "Tags subscribed successfully! 🎉 You will be shortly redirected!"
        );
        setTimeout(() => navigate("/dashboard"), 4000);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Navbar />
      <div className="w-full overflow-auto bg-darkBackground p-10">
        <div className="flex flex-col-reverse lg:flex-row gap-10">
          <div className="flex flex-col gap-10 basis-2/3">
            <div className="flex flex-col gap-2 bg-backgroundColor p-10 border-2 border-gray-200 rounded-md">
              <p className="text-primaryColor font-semibold text-lg">User tags:</p>
              <div className="flex flex-row gap-2 flex-wrap">
                {userTags.length > 0 ? (
                  userTags.map((tag) => (
                    <div
                      key={tag}
                      className={`px-4 py-2 h-10 mb-1 rounded-full font-semibold ring-2 ring-darkPrimary text-darkPrimary hover:bg-primaryColor hover:text-whiteColor transition duration-200 ease-in-out`}
                    >
                      #{tag}
                    </div>
                  ))
                ) : (
                  <p className="text-primaryColor font-bold text-lg text-center">
                    No tags found
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-2 bg-backgroundColor p-10 border-2 border-gray-200 rounded-md">
              <p className="text-primaryColor font-semibold text-lg">All tags:</p>
              <div className="flex flex-row gap-2 flex-wrap">
                {allTags?.map((tag) => (
                  <button
                    key={tag}
                    className={`px-4 py-2 h-10 mb-1 rounded-full font-semibold ring-2 ring-darkPrimary text-darkPrimary hover:bg-primaryColor hover:text-whiteColor transition duration-200 ease-in-out ${
                      selectedTags.includes(tag)
                        ? "bg-primaryColor text-whiteColor"
                        : ""
                    }`}
                    onClick={() => {
                      if (selectedTags.includes(tag)) {
                        setSelectedTags(
                          selectedTags.filter(
                            (selectedTag) => selectedTag !== tag
                          )
                        );
                      } else {
                        setSelectedTags([...selectedTags, tag]);
                      }
                    }}
                  >
                    #{tag}
                  </button>
                ))}
              </div>
              <div className="flex flex-row justify-end">
                <button
                  className="p-2 h-10 rounded-md w-24 font-semibold mt-10 ring-2 bg-primaryColor text-whiteColor ring-darkPrimary hover:bg-darkPrimary hover:text-whiteColor transition duration-200 ease-in-out"
                  onClick={() => handleSubmit()}
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          {user && (
            <div className="flex flex-col basis-1/3 bg-white p-10 border-2 mb-10 border-gray-200 rounded-md shadow-lg gap-10">
              <img
                className="w-40 h-40 self-center lg:w-60 lg:h-60 rounded-full border-4 border-primaryColor shadow-md"
                src={`https://ui-avatars.com/api/?name=${user.fullName}`}
                alt="User avatar"
              />

              <div className="flex flex-col items-start gap-5">
                <div className="flex flex-row gap-2 items-center">
                  <p className="text-gray-700 text-md lg:text-lg font-semibold">
                    Username:
                  </p>
                  <p className="text-primaryColor text-md lg:text-lg font-bold">
                    {user.username}
                  </p>
                </div>
                <div className="flex flex-row gap-2 items-center text-ellipsis overflow-hidden whitespace-nowrap max-w-full">
                  <p className="text-gray-700 text-md lg:text-lg font-semibold">Email:</p>
                  <p className="text-primaryColor text-md lg:text-lg font-bold">
                    {user.email}
                  </p>
                </div>
                <div className="flex flex-row gap-2 items-center">
                  <p className="text-gray-700 text-md lg:text-lg font-semibold">
                    Full Name:
                  </p>
                  <p className="text-primaryColor text-md lg:text-lg font-bold">
                    {user.fullName}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <ToastContainer />
      </div>
    </>
  );
}

export default Profile;
