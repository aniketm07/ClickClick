import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  PutCommand,
  GetCommand,
  ScanCommand
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);
const userTable = process.env.USER_TABLE;

export const verifyUserExists = async (email, username) => {
  const existingUserByUsername = await checkIfUserWithUsernameExists(username);
  const existingUser = await checkIfUserWithEmailExists(email);
  return existingUserByUsername && existingUser;
};

export const createUser = async (user) => {
  try {
    const {
      email,
      password,
      username,
      fullName
    } = user;
    console.log("email: "+ email)
    const timestamp = Date.now();
    const params = {
      TableName: userTable,
      Item: {
        email: email,
        password: password,
        username: username,
        fullName: fullName,
        createdAt: timestamp,
        tags: [],
      },
    };

    // Store User data in DynamoDB
    await dynamo.send(new PutCommand(params));
    return true;
  } catch (error) {
    console.error("Error adding user:", error);
    throw new Error("Unable to add user");
  }
};

const checkIfUserWithUsernameExists = async (username) => {
  const params = {
    TableName: userTable,
    FilterExpression: "username = :username",
    ExpressionAttributeValues: {
        ":username": username,
    },
  };

  try {
    const { Items } = await dynamo.send(new ScanCommand(params));
    console.log("Items: "+ Items)
    return !Items || Items.length === 0;
  } catch (error) {
    console.error('Error querying DynamoDB:', error);
    throw error;
  }
};

const checkIfUserWithEmailExists = async (email) => {
  const params = {
    TableName: userTable,
    Key: { email: email },
  };
  const { Item } = await dynamo.send(new GetCommand(params));
  console.log("Item: "+ Item)
  return Item;
};