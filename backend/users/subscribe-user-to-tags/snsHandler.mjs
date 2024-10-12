import AWS from "aws-sdk";
const sns = new AWS.SNS();

const TOPIC_ARN = process.env.TOPIC_ARN;

export async function subscribeToTopicWithFiltering(email, newTags) {
  try {
    console.log("TOPIC_ARN: ", TOPIC_ARN)
    // Check if a subscription already exists for the given email address
    const existingSubscriptions = await sns
      .listSubscriptionsByTopic({ TopicArn: TOPIC_ARN })
      .promise();
    const existingSubscription = existingSubscriptions.Subscriptions.find(
      (subscription) => subscription.Endpoint === email
    );

    console.log("existingSubscription: ", existingSubscription)

    if (existingSubscription) {
      // If a subscription exists, update its attributes
      const filteringPolicy = {
        tags: newTags,
      };

      await sns
        .setSubscriptionAttributes({
          SubscriptionArn: existingSubscription.SubscriptionArn,
          AttributeName: "FilterPolicy",
          AttributeValue: JSON.stringify(filteringPolicy),
        })
        .promise();

      console.log(
        "Subscription attributes updated for the email address:",
        email
      );
      return;
    }

    // If no existing subscription found, create a new one
    const filteringPolicy = {
      tags: newTags,
    };

    const subscriptionParams = {
      Protocol: "email",
      TopicArn: TOPIC_ARN,
      Endpoint: email,
      Attributes: {
        FilterPolicy: JSON.stringify(filteringPolicy),
      },
    };

    await sns.subscribe(subscriptionParams).promise();
    console.log("New subscription created for the email address:", email);
  } catch (error) {
    console.error("Error subscribing user to topic:", error);
    throw error;
  }
}
