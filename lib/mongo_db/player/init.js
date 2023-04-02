"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var stream_chain_1 = require("stream-chain");
var stream_json_1 = require("stream-json");
var Pick_1 = require("stream-json/filters/Pick");
var StreamArray_1 = require("stream-json/streamers/StreamArray");
var model_1 = require("./model");
var main_1 = require("../main");
(0, main_1.connectMongoDb)();
/* Only use locally
*  Init players data from a JSON file to MongoDB database
* */
(function () {
    var _this = this;
    var filePath = "".concat(process.cwd(), "/data/external/players.json");
    console.log("Reading data from ".concat(filePath));
    var pipeline = (0, stream_chain_1.chain)([
        fs_1.default.createReadStream(filePath),
        (0, stream_json_1.parser)(),
        (0, Pick_1.pick)({ filter: 'league.standard' }),
        (0, StreamArray_1.streamArray)()
    ]);
    pipeline.on('data', function (data) {
        void (function () { return __awaiter(_this, void 0, void 0, function () {
            var player, newPlayer;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pipeline.pause();
                        player = data.value;
                        if (!player.isActive) return [3 /*break*/, 2];
                        newPlayer = new model_1.Player({
                            firstName: player.firstName,
                            lastName: player.lastName,
                            personId: player.personId,
                            isActive: player.isActive,
                            teamId: -1,
                            playerId: -1
                        });
                        return [4 /*yield*/, newPlayer.save()];
                    case 1:
                        _a.sent();
                        console.log("Saving new player: ".concat(JSON.stringify(newPlayer)));
                        _a.label = 2;
                    case 2:
                        pipeline.resume();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    pipeline.on('end', function () { console.log('end'); });
}());
