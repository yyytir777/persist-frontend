import AWS from 'aws-sdk';

AWS.config.update({
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
    region: process.env.REACT_APP_AWS_REGION,
})

const uploadImage = async (file) => {
    const s3 = new AWS.S3();

    const uuid = crypto.randomUUID();
    const params = {
        Bucket: process.env.REACT_APP_S3_BUCKET_NAME,
        Key: `persist/${uuid}`,
        Body: file,
        ContentType: file.type,
    };

    try {
        const uploadResult = await s3.upload(params).promise();
        return uploadResult.Location;
    } catch (error) {
        console.log(error);
    }
}

export default uploadImage;