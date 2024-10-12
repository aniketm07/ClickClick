import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
} from "@aws-sdk/lib-dynamodb";
import { subscribeToTopicWithFiltering } from "./snsHandler.mjs";

const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);
const userTable = process.env.USER_TABLE;

const getUserByEmail = async (email) => {
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

export const subscribeTags = async (email, tags) => {
  try {
    const user = await getUserByEmail(email);
    const newTags = [...new Set([...tags, ...user.tags])];
    console.log("newTags: ", newTags)

    await subscribeToTopicWithFiltering(user.email, newTags);

    const params = {
      TableName: userTable,
      Item: {
        email: user.email,
        password: user.password,
        tags: newTags,
        username: user.username,
        fullName: user.fullName,
        createdAt: user.createdAt,
      },
    };

    // Store data in DynamoDB
    await dynamo.send(new PutCommand(params));
    return `Subscribed User ${user.id}`;
  } catch (error) {
    console.error("Error fetching User:", error);
    throw new Error("Error fetching User");
  }
};
