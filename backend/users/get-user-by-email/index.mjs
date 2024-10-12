/**
* @author: an370985@dal.ca
* @bannerId: B00969798
* @description
* This Lambda function retrieves a user's details by their email address. It takes an email as input, checks its presence,
* and fetches the user information from the database. If the user is found, it returns the user details. If the user is not found,
* or any error occurs, it returns an appropriate error message.
* 
* @details
* - Imports the necessary function to interact with the database.
* - Defines headers for the response.
* - The handler function parses the request, validates the email, and attempts to retrieve user information.
* - If the email is not provided, returns a 400 status with an error message.
* - If the user is found, returns a success response with the user details.
* - If the user is not found, returns a 404 status with an error message.
* - If any other error occurs, returns a 500 status with an internal server error message.
*/
import {
    getUserByEmail
  } from "./dbHandler.mjs";
  
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
  };
  
  export const handler = async (event) => {
    try {
      const { email } = event;
      if (!email) {
        return createResponse(400, {status: "failed", message: "email is required"}, headers);
      }
      const user = await getUserByEmail(email);
      return createResponse(200, {status: "success", user, message: "User retrieved successfully"}, headers);
    } catch (error) {
      if(error.statusCode === 404) {
        return createResponse(404, {status: "failed", message: "User not found"}, headers);
      }
      console.error("handler :: Error during fetching user:", error);
      return createResponse(500, {status: "failed", message: "Internal server error"}, headers);
    }
  };
  
  const createResponse = (statusCode, body, headers) => {
    return {
      statusCode,
      body,
      headers,
    };
  }
  