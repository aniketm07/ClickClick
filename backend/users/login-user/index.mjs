/**
 * @author: an370985@dal.ca
 * @bannerId: B00969798
 * @description
 * This Lambda function handles user authentication. It receives an email and password, validates their presence,
 * and attempts to authenticate the user against AWS Cognito User Pool. Upon successful authentication, it returns
 * a JSON Web Token (JWT). If authentication fails, it returns an appropriate error message.
 * 
 * @details
 * - Imports necessary functions to interact with AWS Cognito.
 * - Defines headers for the response.
 * - The handler function parses the request body, validates the email and password, and attempts to get a JWT.
 * - If the credentials are correct, returns a success response with the token.
 * - If the credentials are incorrect or if any error occurs, returns an error response with the appropriate message.
 */

import {
  getCognitoUser,
  getUserPool,
  getAuthenticationDetails,
} from "./cognitoHandler.mjs";

const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Credentials": true,
};

export const handler = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const { email, password } = body;

    if (!email || !password) {
      return createResponse(400, JSON.stringify({status: "failed", message: "email and password are required",}), headers);
    }

    const token = await getToken(email, password);
    if (token !== null) {
      console.log(token);
      return createResponse(200, JSON.stringify({status: "success", token: token, message: "User logged in successfully",}), headers);
    }
    return createResponse(401, JSON.stringify({status: "failed", message: "Authentication failed! Invalid email or password",}), headers);
  } catch (error) {
    console.error("handler :: Error during authentication:", error);
    return createResponse(500, JSON.stringify({status: "failed", message: "Internal server error",}), headers);
  }
};

const getToken = async (email, password) => {
  const userPool = getUserPool();
  const cognitoUser = getCognitoUser(userPool, email);
  const authenticationDetails = getAuthenticationDetails(email, password);

  return new Promise((resolve, reject) => {
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function (result) {
        const token = result.getIdToken().getJwtToken();
        resolve(token);
      },
      onFailure: function (err) {
        console.error("getToken :: Authentication error:", err);
        resolve(null);
      },
    });
  });
};

const createResponse = (statusCode, body, headers) => {
  return {
    statusCode,
    body,
    headers,
  };
}
