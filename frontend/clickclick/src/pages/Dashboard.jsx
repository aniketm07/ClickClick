import Posts from "./Posts";
import Navbar from "../components/common/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { ThreeCircles } from "react-loader-spinner";
import { API_URL } from "../constants/constants";
import { getSession } from "../lib/session";

function Dashboard() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [tags, setTags] = useState([]);
  const token = getSession();

  useEffect(() => {
      axios
        .get(`${API_URL}/api/posts`, {
          headers: {
            Authorization: `${token}`,
          },
        })
        .then((response) => {
          const postFetched = response.data.posts;
          // Sort fetched posts by timestamp in descending order
          if(postFetched && postFetched.length > 0){
          const sortedPosts = postFetched.sort(
            (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
          );

          setPosts(sortedPosts);
          setFilteredPosts(sortedPosts);

          const uniqueTags = new Set();
          response.data.posts
            .map((post) => post.tags.split(","))
            .forEach((tagArray) => {
              tagArray.forEach((tag) => {
                uniqueTags.add(tag);
              });
            });
          setTags(Array.from(uniqueTags));
          }
          setTimeout(() => setLoading(false), 2000);
        });
  }, []);

  useEffect(() => {
    const filtered = posts.filter((post) => {
      const tags = post.tags.split(",");
      if (tags.includes(searchTerm.toLowerCase())) {
        return post;
      }
    });
    setFilteredPosts(filtered);
  }, [searchTerm]);

  const clearFilter = () => {
    setSearchTerm("");
    setFilteredPosts(posts);
  };

  return (
    <>
      <Navbar />
      <div className="block overflow-auto w-full bg-darkBackground">
        <div className="flex flex-col lg:flex-row h-full">
          {/* Filters */}
          <div className="flex flex-col basis-4/12 p-10 justify-between">
            <div className="flex flex-col w-full">
              <div className="w-full flex flex-row items-center justify-center gap-4">
                <input
                  placeholder="Search for Tags"
                  name="name"
                  className=" text-darkPrimary placeholder-gray-400 w-full px-4 py-2 mb-1 mt-1 text-base transition duration-200 ease-in-out rounded-lg bg-whiteColor border-2 border-darkPrimary border-solid focus:outline-none focus:ring-4 focus:ring-primaryColor focus:bg-whiteColor focus:border-none"
                />
                <button
                  className="px-4 py-2 h-11 rounded-md bg-primaryColor text-white hover:bg-darkPrimary transition duration-200 ease-in-out"
                  onClick={clearFilter}
                >
                  {" "}
                  Clear{" "}
                </button>
              </div>
              <div className="flex flex-row flex-wrap m-4 ml-0 gap-2">
                {tags &&
                  tags.map((tag) => (
                    <button
                      key={tag}
                      className={`px-4 py-2 rounded-full font-semibold ring-2 ring-darkPrimary text-darkPrimary hover:bg-primaryColor hover:text-whiteColor transition duration-200 ease-in-out ${
                        searchTerm === tag
                          ? "bg-primaryColor text-whiteColor"
                          : ""
                      }`}
                      onClick={() => setSearchTerm(tag)}
                    >
                      #{tag}
                    </button>
                  ))}
              </div>
            </div>
          </div>
          {/* All posts are rendered here */}
          <div className="flex flex-col basis-8/12 px-10 pb-10 m-auto items-center justify-center">
            {loading ? (
              <>
                <ThreeCircles
                  visible={true}
                  height="100"
                  width="100"
                  color="#134074"
                  ariaLabel="three-circles-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
                <p className="text-primaryColor mt-2 font-bold text-2xl">
                  Loading...
                </p>
              </>
            ) : filteredPosts.length === 0 ? (
              <p className="text-primaryColor mt-2 font-bold text-2xl">
                No posts found
              </p>
            ) : (
              filteredPosts.map((post) => <Posts key={post.id} post={post} />)
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
