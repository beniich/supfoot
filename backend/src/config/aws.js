// server/src/config/aws.js
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');
const sharp = require('sharp');

// Configure AWS
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION || 'eu-west-1',
});

const s3 = new AWS.S3();

// Multer S3 storage
const uploadS3 = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.AWS_S3_BUCKET,
        acl: 'public-read',
        metadata: (req, file, cb) => {
            cb(null, { fieldName: file.fieldname });
        },
        key: (req, file, cb) => {
            const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
            const ext = path.extname(file.originalname);
            cb(null, `uploads/${file.fieldname}/${uniqueName}${ext}`);
        },
    }),
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
    },
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|gif|webp/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);

        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error('Only images are allowed'));
    },
});

// Image optimization middleware
const optimizeImage = async (req, res, next) => {
    if (!req.file) return next();

    try {
        const optimized = await sharp(req.file.buffer)
            .resize(1920, 1080, {
                fit: 'inside',
                withoutEnlargement: true,
            })
            .jpeg({ quality: 85 })
            .toBuffer();

        // Upload optimized version
        const params = {
            Bucket: process.env.AWS_S3_BUCKET,
            Key: req.file.key,
            Body: optimized,
            ACL: 'public-read',
            ContentType: 'image/jpeg',
        };

        await s3.upload(params).promise();
        next();
    } catch (error) {
        console.error('Image optimization error:', error);
        next(error);
    }
};

// Delete file from S3
const deleteFromS3 = async (fileKey) => {
    try {
        await s3.deleteObject({
            Bucket: process.env.AWS_S3_BUCKET,
            Key: fileKey,
        }).promise();
        console.log(`✅ Deleted from S3: ${fileKey}`);
    } catch (error) {
        console.error('S3 delete error:', error);
    }
};

module.exports = {
    uploadS3,
    optimizeImage,
    deleteFromS3,
    s3,
};
