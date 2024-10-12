import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";
import AWS from "aws-sdk";

AWS.config.update({ region: "us-east-1" });

const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);

const postTable = process.env.POST_TABLE;

export const getAllPosts = async () => {
  const params = { TableName: postTable };
  const { Items } = await dynamo.send(new ScanCommand(params));
  return Items;
};
