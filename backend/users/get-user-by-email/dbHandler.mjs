import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);
const userTable = process.env.USER_TABLE;

export const getUserByEmail = async (email) => {
  console.log(`email: ${email}`);
  const params = {
    TableName: userTable,
    Key: { email: email },
  };
  const { Item } = await dynamo.send(new GetCommand(params));
  if (!Item) {
    // User not found, throw an error with 404 status code
    const error = new Error(`User with email ${email} not found`);
    error.statusCode = 404;
    throw error;
  }
  return Item;
};
