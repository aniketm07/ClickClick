import {
  CognitoIdentityProviderClient,
  SignUpCommand,
} from "@aws-sdk/client-cognito-identity-provider";

const config = {
  region: "us-east-1",
};
const client = new CognitoIdentityProviderClient(config);

export const checkAndUpdateUserPool = async (email, password) => {
  try {
    const input = {
      ClientId: process.env.COGNITO_CLIENT_ID,
      Username: email,
      Password: password,
      UserAttributes: [
        {
          Name: "email",
          Value: email,
        },
      ],
    };
    const command = new SignUpCommand(input);
    const cognitoResponse = await client.send(command);
    return cognitoResponse;
  } catch (error) {
    console.error("SignUp error:", error);
    return null;
  }
};
