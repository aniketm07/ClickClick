<div align="center">
  <img src="https://clickclick-project.s3.amazonaws.com/logo.png" alt="ClickClick Logo" width=150 height=150>
</div>

# ClickClick - An Online Photo Sharing Platform

ClickClick is an online photo-sharing platform designed to streamline the process of uploading and sharing images. Users can effortlessly upload photos, subscribe to tags, and receive notifications about new posts related to their interests. Built using various AWS services, ClickClick showcases a secure, scalable, and cost-effective cloud architecture.

<h2 align="center">💻 Tech Stack</h2>
<p align="center">
    <img alt="React" src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB"/>
    <img alt="TailwindCSS" src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white">
    <img alt="Node" src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white">
    <img alt="AWS" src="https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white">
</p>

## Demo

[Demo Of ClickClick](https://drive.google.com/file/d/1_dTFPJpqjc1OpjaQ9dugKQzxeVDpNp-7/view?usp=sharing)

## Project Overview

ClickClick offers a range of features designed to provide a seamless user experience:

- **Seamless Login and Upload:** ClickClick offers a seamless login process, allowing users to quickly access their accounts and upload images with ease. This ensures users can share their creations without unnecessary hassle or delays.

- **Tag Subscription:** ClickClick enables users to stay updated with the latest trends and discover new content effortlessly by subscribing to their favorite tags. This feature allows users to receive notifications whenever new posts are made with tags they've subscribed to, ensuring they never miss out on relevant content.

- **Automatic Tag Generation:** ClickClick utilizes Amazon Rekognition, a powerful image recognition service, to automatically generate tags for uploaded images. This makes it easier for users to categorize and search for images based on their interests, enhancing the overall discoverability of their content.

- **Email Notifications:** ClickClick employs Amazon Simple Notification Service (SNS) to send email notifications to users who have subscribed to specific tags. Whenever a new post is created with a tag they're subscribed to, users receive an email notification, keeping them informed about new content relevant to their interest.

## Architecture Diagram

![View Architecture Diagram](https://clickclick-project.s3.amazonaws.com/Arch.png)

## AWS Services Used

### Compute
- **Amazon ECS with Fargate:** Manages containerized frontend applications with auto-scaling for cost efficiency.
- **AWS Lambda:** Powers serverless backend functions, reducing infrastructure overhead.

### Storage
- **Amazon S3:** Securely stores user-uploaded images with scalable, durable storage.

### Database
- **Amazon DynamoDB:** Manages semi-structured user and post data with automatic scaling for high availability.

### Networking and Content Delivery
- **Amazon VPC:** Provides a secure network with public and private subnets.
- **Application Load Balancer:** Ensures high availability by balancing traffic across containers.
- **Amazon API Gateway:** Manages API endpoints and enhances security with throttling and authorizers.

### Security
- **AWS Cognito:** Secures user authentication and authorization with JWT tokens and multi-factor authentication.

### Machine Learning
- **Amazon Rekognition:** Automatically generates tags for uploaded images.

### Management and Governance
- **AWS CloudFormation:** Automates infrastructure deployment and management.

### Other Services
- **Amazon SNS:** Sends email notifications to users based on tag subscriptions.

## AWS Well-Architected Framework Alignment

The ClickClick platform adheres to AWS's Well-Architected Framework, fulfilling its six core pillars:

1. **Operational Excellence:** Automated deployments via CloudFormation.
2. **Security:** Strong access control and data protection.
3. **Reliability:** High availability with ALB and DynamoDB.
4. **Performance Efficiency:** Serverless architecture with efficient resource allocation.
5. **Cost Optimization:** Pay-as-you-go services and auto-scaling.
6. **Sustainability:** Efficient resource usage with serverless architectures.

## Getting Started

To run ClickClick:

1. Clone the repository.
2. Create a `S3` bucket and upload all the backend zip files.
3. Modify the `S3Bucket` and `S3Key` for all the Lambda functions in the `iac/ClickClickCloudFormation.yaml`
4. Run the `iac/ClickClickCloudFormation.yaml` script in the AWS CloudFormation Service.
5. Get the `LoadBalancerDomainName` from the output of the script.

You're all set to explore **ClickClick!**
## Screenshots

![Langing Page](https://clickclick-project.s3.amazonaws.com/landing-page.png)

![Registration](https://clickclick-project.s3.amazonaws.com/registration.png)

![Login](https://clickclick-project.s3.amazonaws.com/login.png)

![Home](https://clickclick-project.s3.amazonaws.com/home.png)

![Upload Image](https://clickclick-project.s3.amazonaws.com/upload-image.png)

![Uploaded Image](https://clickclick-project.s3.amazonaws.com/uploaded-image.png)

![Tags](https://clickclick-project.s3.amazonaws.com/tags-page.png)

![Emails](https://clickclick-project.s3.amazonaws.com/emails.png)

---

Enjoy sharing and discovering photos with ClickClick!
