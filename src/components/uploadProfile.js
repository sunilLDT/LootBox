import { S3, util } from 'aws-sdk';

const AWS_BUCKET = 'e-com';
const AWS_ACCESS_KEY = 'AKIAUGIVWEYTT4E6ZCOC';
const AWS_ACCESS_SECRET = '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';

const makeid = (length) => {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
};

export const uploadImageOnS3 = (fileName, contentType, base64string, location, response) => {
  const s3bucket = new S3({
    accessKeyId: AWS_ACCESS_KEY,
    secretAccessKey: AWS_ACCESS_SECRET,
    Bucket: AWS_BUCKET,
    signatureVersion: 'v4',
  });
  s3bucket.createBucket(() => {
    const params = {
      Bucket: AWS_BUCKET,
      Key: location.concat(makeid(6)).concat('.').concat(contentType.split('/')[1]),
      Body: util.base64.decode(base64string),
      ContentType: contentType,
      CORSConfiguration: rule,
    };
    s3bucket.upload(params, response);
  });
};

export const downloadImagefromS3 = (key, response) => {
  const s3bucket = new S3({
    accessKeyId: AWS_ACCESS_KEY,
    secretAccessKey: AWS_ACCESS_SECRET,
    Bucket: AWS_BUCKET,
    signatureVersion: 'v4',
  });
  s3bucket.createBucket(() => {
    const params = {
      Bucket: AWS_BUCKET,
      Key: key,
    };
    s3bucket.getObject(params, response);
  });
};