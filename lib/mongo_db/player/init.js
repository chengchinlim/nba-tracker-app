"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var stream_chain_1 = require("stream-chain");
var stream_json_1 = require("stream-json");
var StreamValues_1 = require("stream-json/streamers/StreamValues");
var Pick_1 = require("stream-json/filters/Pick");
/* Only use locally
*
* */
var readDataFromLocalStorage = function () {
    var filePath = "".concat(process.cwd(), "/data/external/players.json");
    console.log("Reading data from ".concat(filePath));
    var pipeline = (0, stream_chain_1.chain)([
        fs_1.default.createReadStream(filePath),
        // zlib.createGunzip(),
        (0, stream_json_1.parser)({}),
        (0, Pick_1.pick)({ filter: 'league.standard' }),
        // ignore({ filter: /\b_meta\b/i }),
        (0, StreamValues_1.streamValues)(),
        function (data) { return data; }
    ]);
    pipeline.on('data', function (data) { console.log(data); });
    pipeline.on('end', function () { console.log('end'); });
};
readDataFromLocalStorage();
