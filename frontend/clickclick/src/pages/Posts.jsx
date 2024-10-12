import React from "react";

function Posts({ post }) {
  const {id, username, fullName, title, tags, timestamp, image, description }  = post;
  return (
    <div key={id} className="flex flex-col w-full bg-backgroundColor mt-10 p-6 border-2 border-gray-200 rounded-md">
      <div className="flex flex-row justify-between">
        <div className="flex flex-row items-center mb-2">
          <img
            src={`https://ui-avatars.com/api/?name=${fullName}`}
            className="w-10 h-10 rounded-full"
          />
          <div className="flex flex-col">
            <div></div>
            <p className="ml-2 text-black"> {fullName} ({username})</p>
            <p className="ml-2 text-black text-sm">{new Date(timestamp).toDateString()}</p>
          </div>
        </div>
        
      </div>
      <p className="text-black text-xl font-semibold my-1 p-1"> {title}</p>
      <p className="text-black text-md font-medium my-1 p-1"> {description}</p>
      
      <div className="flex flex-row flex-wrap m-4 ml-0 gap-2">
      {tags.split(",").map((tag) => (
         <div key={tag} className="px-4 py-2 rounded-full bg-primaryColor text-white hover:bg-darkPrimary transition duration-200 ease-in-out hover:cursor-default">
         #{tag}
       </div>
      ))}
      </div>
      <div className="flex-1">
        <img
          className="w-full h-full object-cover rounded-md"
          src={image}
        ></img>
      </div>
    </div>
  );
}

export default Posts;
