/**
 * @author: an370985@dal.ca
 * @bannerId: B00969798
 *
 * @description
 * This is the lambda function that registers a user. This takes all the required parameters and checks if the user already exists.
 * If the user exists it returns an error.
 * If the user does not exist it creates the user in the AWS Cognito User Pool and also stores the user data in DynamoDB which includes the basic user information.
 */

import { checkAndUpdateUserPool } from "./cognitoHandler.mjs";
import { verifyUserExists, createUser } from "./dbHandler.mjs";

const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Credentials": true,
};

export const handler = async (event) => {
  try {
    console.log(event);
    const body = JSON.parse(event.body);
    console.log(body);
    const { email, password, username, fullName } = body;

    if (!email || !password || !username || !fullName) {
      return createResponse(400, JSON.stringify({status: "failed", message: "Incorrect request body. Please provide email, password, username, and full name",}), headers);
    }

    if (await verifyUserExists(email, username)) {
      return createResponse(400, JSON.stringify({status: "failed", message: `User already exists with email ${email} or username ${username}`,}), headers);
    }

    if (!(await checkAndUpdateUserPool(email, password))) {
      return createResponse(400, JSON.stringify({status: "failed",message: "User already exists",}), headers);
    }

    await createUser(body);

    return createResponse(200, JSON.stringify({status: "success", message: "User created successfully!",}), headers);
  } catch (error) {
    console.error("Error during authentication:", error);
    return createResponse(500, JSON.stringify({status: "failed", message: "Internal server error",}), headers);
  }
};

const createResponse = (statusCode, body, headers) => {
  return {
    statusCode,
    body,
    headers,
  };
};
