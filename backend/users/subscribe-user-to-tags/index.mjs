/**
 * @author: an370985@dal.ca
 * @bannerId: B00969798
 * 
 * @description
 * This Lambda function subscribes a user to specific tags. It takes an email and a list of tags as input, checks their presence,
 * and updates the user's subscription in the database. If the subscription is successful, it returns a success message. If any error
 * occurs, it returns an appropriate error message.
 * 
 * @details
 * - Imports the necessary function to interact with the database for tag subscriptions.
 * - Defines headers for the response.
 * - The handler function parses the request, validates the email and tags, and attempts to subscribe the user to the specified tags.
 * - If the email or tags are not provided, returns a 400 status with an error message.
 * - If the subscription is successful, returns a success response.
 * - If the user is not found, returns a 404 status with an error message.
 * - If any other error occurs, returns a 500 status with an internal server error message.
 */

import {
    subscribeTags
  } from "./dbHandler.mjs";
  
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
  };
  
  export const handler = async (event) => {
    try {
      const { email, tags } = event;
      if (!email || !tags) {
        return createResponse(400, {status: "failed", message: "email and tags are required",}, headers);
      }
      await subscribeTags(email, tags);
      return createResponse(200, {status: "success", message: "User subscribed to tags successfully",}, headers);
    } catch (error) {
      if(error.statusCode === 404) {
        return createResponse(404, {status: "failed", message: "User not found",}, headers);
      }
      console.error("handler :: Error during subscription:", error);
      return createResponse(500, {status: "failed", message: "Internal server error",}, headers);
    }
  };
  
  const createResponse = (statusCode, body, headers) => {
    return {
      statusCode,
      body,
      headers,
      isBase64Encoded: true,
    };
  }
  