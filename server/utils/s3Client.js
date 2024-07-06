const { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const crypto = require("crypto"); //to generate a unique file name
require('dotenv').config();


const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;


// Generate default image name, by default 32 bytes
const randomImageName = (bytes = 32) => {
    return crypto.randomBytes(bytes).toString('hex');
}


// create new s3 object
const s3 = new S3Client({
    credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretAccessKey
    },
    region: bucketRegion
});


// Get signed URL for an S3 object
const getSignedUrlForObject = async (key) => {
    const getObjectParams = {
        Bucket: bucketName,
        Key: key
    };
    const command = new GetObjectCommand(getObjectParams);
    const url = getSignedUrl(s3, command, { expiresIn: 3600 });
    return url;
};


// Upload image to S3 bucket
const uploadImage = async (buffer, mimeType) => {
    const imageName = randomImageName();
    const params = {
        Bucket: bucketName,
        Key: imageName,
        Body: buffer,
        ContentType: mimeType
    };
    const command = new PutObjectCommand(params);
    await s3.send(command);
    return imageName;
};


// Delete image from S3 bucket
const deleteImage = async (key) => {
    const params = {
        Bucket: bucketName,
        Key: key
    };
    const command = new DeleteObjectCommand(params);
    await s3.send(command);
};


module.exports = {
    getSignedUrlForObject,
    uploadImage,
    deleteImage
};