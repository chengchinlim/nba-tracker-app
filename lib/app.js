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
var config_1 = require("./config");
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var main_1 = require("./mongo_db/main");
var model_1 = require("./mongo_db/player/model");
var main_2 = require("./third_party/main");
var swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
var fs_1 = __importDefault(require("fs"));
var service_1 = require("./mongo_db/player/service");
(0, main_1.connectMongoDb)();
var app = (0, express_1.default)();
app.use(express_1.default.json(), express_1.default.urlencoded({ extended: true }), (0, cors_1.default)({ origin: true }));
app.use('/doc', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(JSON.parse(fs_1.default.readFileSync("".concat(process.cwd(), "/lib/swagger_output.json"), 'utf-8'))));
app.get('/health', function (req, res) {
    res.status(200).send('Express + TypeScript Server');
});
app.post('/player', function (req, res) {
    void (function () { return __awaiter(void 0, void 0, void 0, function () {
        var player, created;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    player = new model_1.Player({
                        firstName: 'Cheng',
                        lastName: 'Lim',
                        rapidApiId: 1,
                        teamId: 1
                    });
                    return [4 /*yield*/, player.save()];
                case 1:
                    created = _a.sent();
                    res.status(200).send(created);
                    return [2 /*return*/];
            }
        });
    }); });
});
app.get('/search', function (req, res) {
    void (function () { return __awaiter(void 0, void 0, void 0, function () {
        var name, players;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    name = req.query.name;
                    return [4 /*yield*/, (0, service_1.searchPlayerByName)(name)];
                case 1:
                    players = _a.sent();
                    res.status(200).send(players);
                    return [2 /*return*/];
            }
        });
    }); })();
});
// app.get('/stats', async (req: Request, res: Response) => {
//   try {
//
//     res.status(200).send('Got the data')
//   } catch (err) {
//     res.status(500).send(err)
//   }
// })
app.post('/stats', function (req, res) {
    void (function () { return __awaiter(void 0, void 0, void 0, function () {
        var season, team, statsPerGames, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    season = parseInt(req.query.season);
                    team = parseInt(req.query.team);
                    return [4 /*yield*/, (0, main_2.getPlayerStatsData)({ season: season, team: team })];
                case 1:
                    statsPerGames = _a.sent();
                    console.log(statsPerGames);
                    /*
                    * Learned to write data to local utils
                    * and write it to S3 bucket
                    * but it's not necessary for now since the data size is small
                    * */
                    // const filePaths = await writeDataToLocalStorage({
                    //   externalFilePath: `seasons/${season}/teams/${team}.json`,
                    //   response: statsPerGames
                    // })
                    // await writeToS3Bucket(filePaths)
                    res.status(200).send('Done');
                    return [3 /*break*/, 3];
                case 2:
                    err_1 = _a.sent();
                    res.status(500).send(err_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
});
app.listen(config_1.configs.port, function () {
    console.log("\u26A1\uFE0FServer is running at port ".concat(config_1.configs.port));
});
