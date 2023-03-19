"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.configs = void 0;
var dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.configs = {
    port: (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 8080,
    env: (_b = process.env.NODE_ENV) !== null && _b !== void 0 ? _b : 'dev',
    mongoDB: {
        db: process.env.MONGODB_DB,
        host: process.env.MONGODB_HOST,
        username: process.env.MONGODB_USERNAME,
        password: process.env.MONGODB_PASSWORD
    },
    aws: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_REGION,
        s3Bucket: process.env.AWS_S3_BUCKET
    },
    rapidApi: {
        nbaDataUrl: process.env.RAPID_API_NBA_DATA_URL,
        host: process.env.RAPID_API_HOST,
        apiKey: process.env.RAPID_API_KEY
    }
};
