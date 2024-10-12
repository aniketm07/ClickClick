/**
 * @author: an370985@dal.ca
 * @bannerId: B00969798
 * 
 * @description
 * This Lambda function retrieves all posts from the database. It fetches the posts and returns them in the response.
 * If any error occurs during the process, it returns an appropriate error message.
 * 
 * @details
 * - Imports the necessary function to interact with the database.
 * - Defines headers for the response.
 * - The handler function calls the getAllPosts function to fetch all posts from the database.
 * - If the posts are retrieved successfully, returns a success response with the posts.
 * - If any error occurs, returns a 500 status with an internal server error message.
 */
import { getAllPosts } from "./dbHandler.mjs";

const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Credentials": true,
};

export const handler = async (event) => {
  try {
    const posts = await getAllPosts();
    return createResponse(200, JSON.stringify({status: "success", posts}), headers);
  } catch (error) {
    console.error("Error creating post:", error);
    return createResponse(500, JSON.stringify({status: "failed", message: "Internal server error",}), headers);
  }
};

const createResponse = (statusCode, body, headers) => {
    return {
        statusCode,
        body,
        headers,
    };
}
