"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.linkModel = exports.ContentModel = exports.TagModel = exports.UserModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const ObjectId = mongoose_1.Schema.Types.ObjectId;
// ✅ Connect to MongoDB
mongoose_1.default.connect('mongodb+srv://Mukul:fRQc8NLbccqwkPmV@cluster0.nbxxwdx.mongodb.net/barinly');
// ✅ User Schema
const Users = new mongoose_1.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
// ✅ Tag Schema
const Tags = new mongoose_1.Schema({
    title: String
});
// ✅ Content Schema
const Content = new mongoose_1.Schema({
    link: String,
    title: String,
    type: String,
    tags: [{ type: ObjectId, ref: "TagModel" }],
    userId: { type: ObjectId, ref: "UserModel", required: true }
});
// ✅ Link Schema
const link = new mongoose_1.Schema({
    hash: String,
    userId: { type: ObjectId, ref: "UserModel", required: true, unique: true }
});
// ✅ Export models
exports.UserModel = (0, mongoose_1.model)("UserModel", Users);
exports.TagModel = (0, mongoose_1.model)("TagModel", Tags);
exports.ContentModel = (0, mongoose_1.model)("ContentModel", Content);
exports.linkModel = (0, mongoose_1.model)("linkModel", link);
