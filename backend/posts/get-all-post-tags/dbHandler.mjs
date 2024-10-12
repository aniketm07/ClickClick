import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  ScanCommand
} from "@aws-sdk/lib-dynamodb";
import AWS from "aws-sdk";
AWS.config.update ({ region: "us-east-1" });

const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);
const postTable = process.env.POST_TABLE;

export const getAllPostTags = async () => {
    let tags = new Set();
    let lastEvaluatedKey;
  
    do {
      const params = {
        TableName: postTable,
        ExclusiveStartKey: lastEvaluatedKey
      };
  
      const { Items, LastEvaluatedKey } = await dynamo.send(new ScanCommand(params));
      lastEvaluatedKey = LastEvaluatedKey;
  
      if (Items) {
        for (const item of Items) {
          const itemTags = item.tags?.split(",");
          if (itemTags) {
            itemTags.forEach(tag => tags.add(tag.trim()));
          }
        }
      }
    } while (lastEvaluatedKey);
  
    return Array.from(tags);
  };