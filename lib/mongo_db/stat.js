"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stat = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema;
var StatSchema = new Schema({
    teamId: {
        type: Number,
        required: true
    },
    playerId: {
        type: Number,
        required: true
    },
    points: {
        type: Number,
        required: true
    }
});
exports.Stat = mongoose_1.default.model('stat', StatSchema);
