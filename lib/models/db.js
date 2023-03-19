"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectMongoDb = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var config_1 = require("../config");
var connectMongoDb = function () {
    var mongoDbUrl = "mongodb+srv://".concat(config_1.configs.mongoDB.username) +
        ":".concat(config_1.configs.mongoDB.password) +
        "@".concat(config_1.configs.mongoDB.host) +
        "/".concat(config_1.configs.mongoDB.db);
    mongoose_1.default.connect(mongoDbUrl).then().catch(function (e) {
        console.error(e);
    });
    mongoose_1.default.connection
        .once('open', function () {
        console.log('MongoDB is running');
    })
        .on('error', function (e) {
        console.warn(e);
    });
};
exports.connectMongoDb = connectMongoDb;
