import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
import {
  DetectLabelsCommand,
  RekognitionClient,
} from "@aws-sdk/client-rekognition";
import AWS from "aws-sdk";

AWS.config.update({ region: "us-east-1" });

const rekogClient = new RekognitionClient();

const sns = new AWS.SNS();
const s3Client = new S3Client();
const bucketName = process.env.POST_IMAGE_BUCKET_NAME;

const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);
const postTable = process.env.POST_TABLE;
const TOPIC_ARN = process.env.TOPIC_ARN;

export const createPost = async (
  title,
  username,
  image,
  imageType,
  description,
  fullName
) => {
  try {
    const postId = uuidv4();
    const timestamp = Date.now();
    let imageUrl = "";

    const s3Key = `${postId}_${username}.${imageType.split("/")[1]}`;
    if (image) {
      const img = image.split(",")[1];
      const s3Params = {
        Bucket: bucketName,
        Key: s3Key,
        Body: Buffer.from(img, "base64"),
        ContentType: imageType,
      };
      // Upload image to S3
      await s3Client.send(new PutObjectCommand(s3Params));

      imageUrl = `https://${bucketName}.s3.amazonaws.com/${s3Key}`;
    }

    const rekogParams = {
      Image: {
        S3Object: {
          Bucket: bucketName,
          Name: s3Key,
        },
      },
    };

    const tags = await detect_labels(rekogParams, username);

    const params = {
      TableName: postTable,
      Item: {
        id: postId,
        title,
        username,
        timestamp,
        tags,
        image: imageUrl,
        description,
        fullName
      },
    };

    // Store post data in DynamoDB
    await dynamo.send(new PutCommand(params));
    return postId;
  } catch (error) {
    console.error("Error creating post:", error);
    throw new Error("Error creating post");
  }
};

const detect_labels = async (rekogParams, username) => {
  const response = await rekogClient.send(new DetectLabelsCommand(rekogParams));
  console.log(response.Labels);
  const tags = response.Labels.map((label) => label.Name.toLowerCase())
    .slice(0, 7)
    .join(",");
  tags.split(",").map((tag) => publishMessageToTopic(tag, username));
  console.log("tags:", tags);
  return tags;
};

const publishMessageToTopic = async (tag, username) => {
  const message = `${username} uploaded a new image tagged with ${tag} – Check it out now!`;
  // Publish message to the common SNS topic
  const publishParams = {
    Message: message,
    TopicArn: TOPIC_ARN,
    MessageAttributes: {
      tags: {
        DataType: "String",
        StringValue: tag,
      },
    },
  };

  // Publish the message to the topic
  const publishResult = await sns.publish(publishParams).promise();
  console.log("Message published:", publishResult.MessageId);
};
