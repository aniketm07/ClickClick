/**
 * @author: an370985@dal.ca
 * @bannerId: B00969798
 * 
 * @description
 * This Lambda function handles the creation of a new post. It receives the title, username, image, image type, and description
 * as input parameters, validates their presence, and processes the image for storage and tagging. The function uploads the image to S3,
 * detects labels using AWS Rekognition, and stores the post data in DynamoDB. It also publishes a notification to an SNS topic for each tag detected.
 *
 * @details
 * - Imports necessary functions and clients for interaction with AWS services (S3, DynamoDB, Rekognition, SNS).
 * - Defines headers for the response.
 * - The handler function parses the request body, validates the input fields, and calls the createPost function.
 * - If the input validation fails, returns a 400 status with an error message.
 * - If the post creation is successful, returns a success response with the post ID.
 * - If any error occurs, returns a 500 status with an internal server error message.
 */

import { createPost } from "./dbHandler.mjs";

const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Credentials": true,
};

export const handler = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const { title, username, image, imageType, description, fullName } = body;

    if (!title || !username || !image || !imageType || !description || !fullName) {
        return createResponse(400, JSON.stringify({status: "failed", message: "Incorrect request body. Please complete all fields and try again.",}), headers);
    }

    const postId = await createPost(
      title,
      username,
      image,
      imageType,
      description,
      fullName
    );

    return createResponse(200, JSON.stringify({status: "success", message: `Post created successfully with id ${postId}`,}), headers);
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
