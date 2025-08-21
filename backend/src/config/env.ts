import dotenv from "dotenv";
dotenv.config();

export const ENV = {
  PORT: process.env.PORT || "4000",
  MONGODB_URI: process.env.MONGODB_URI || "",
  // Placeholders para después:
  COGNITO_REGION: process.env.COGNITO_REGION || "",
  COGNITO_USER_POOL_ID: process.env.COGNITO_USER_POOL_ID || "",
  S3_BUCKET_NAME: process.env.S3_BUCKET_NAME || "",
  AWS_REGION: process.env.AWS_REGION || ""
};
