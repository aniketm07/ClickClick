/**
 * @author: an370985@dal.ca
 * @bannerId: B00969798
 * 
 * @description
 * This Lambda function retrieves all tags from posts in the database. It fetches the tags and returns them in the response.
 * If any error occurs during the process, it returns an appropriate error message.
 * 
 * @details
 * - Imports the necessary function to interact with the database.
 * - Defines headers for the response.
 * - The handler function calls the getAllPostTags function to fetch all tags from the database.
 * - If the tags are retrieved successfully, returns a success response with the tags.
 * - If any error occurs, returns a 500 status with an internal server error message.
 */
import { getAllPostTags } from "./dbHandler.mjs";

const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Credentials": true,
};

export const handler = async (event) => {
  try {
    const tags = await getAllPostTags();
    return createResponse(200, JSON.stringify({status: "success", tags}), headers);
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
