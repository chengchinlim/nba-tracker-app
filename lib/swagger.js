"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var swagger_autogen_1 = __importDefault(require("swagger-autogen"));
var outputFile = '../lib/swagger_output.json';
var endpointsFiles = ['../lib/app.js'];
var doc = {
    servers: [
        {
            url: 'http://localhost:8080/',
            description: 'local server'
        },
        {
            url: 'https://api.nbatracker.app',
            description: 'main server'
        }
    ]
};
(0, swagger_autogen_1.default)({ openapi: '3.0.0' })(outputFile, endpointsFiles, doc)
    .then(function (_) { console.log('Generated swagger file!'); })
    .catch(function (err) { console.log(err); });
