import * as AWS from "aws-sdk";
import { DataExchange } from "aws-sdk";
import { v4 as uuidv4 } from "uuid";

AWS.config.update({ region: "us-east-2" });

const s3 = new AWS.S3();
const docClient = new AWS.DynamoDB.DocumentClient();

const BUCKET_NAME = process.env.QUESTIONS_BUCKET_NAME;
const TABLE_NAME = process.env.QUESTIONS_TABLE_NAME;

const uploadImageToS3 = async ({ file, fileType }) => {
  if (!file) {
    return null;
  }

  const decodedFile = Buffer.from(
    file.replace(/^data:image\/\w+;base64,/, ""),
    "base64"
  );

  const params = {
    Bucket: BUCKET_NAME,
    Key: `images/${new Date().toISOString()}.${fileType.split("/")[1]}`, // Putting date in object name is a good idea
    Body: decodedFile,
    ContentType: fileType,
  };

  return s3.upload(params).promise();
};

module.exports.handler = async (event) => {
  console.log(event);

  let response;
  try {
    const parsedBody = JSON.parse(event.body);

    // Concurrently uploading images to s3
    const [questionUploadResult, solutionUploadResult] = Promise.all([
      uploadImageToS3(parsedBody.question),
      uploadImageToS3(parsedBody.solution),
    ]);

    const putData = await docClient
      .put({
        TableName: TABLE_NAME,
        Item: {
          user_id: event.pathParameters.user_id,
          question_id: uuidv4(),
          questionUrl: questionUploadResult.Location,
          solutionUrl: solutionUploadResult.Location,
          name: parsedBody.name,
          course: parsedBody.course,
          instructor: parsedBody.instructor,
          unit: parsedBody.unit,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      })
      .promise();

    response = {
      statusCode: 200,
      body: JSON.stringify({
        message: "Successful upload",
      }),
    };
  } catch (e) {
    response = {
      statusCode: 500,
      body: JSON.stringify({
        message: "Question/Solution failed to upload",
        error: e,
      }),
    };
  }

  return response;
};