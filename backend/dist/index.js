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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./db");
const zod_1 = __importDefault(require("zod"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const middleware_1 = require("./middleware");
const utils_1 = require("./utils");
const cors_1 = __importDefault(require("cors"));
const JWT_SECRET = "mukul@!2004";
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.post("/api/v1/signup", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const requireBody = zod_1.default.object({
            username: zod_1.default.string().min(3).max(20),
            password: zod_1.default.string()
        });
        const safeParsedBody = requireBody.safeParse(req.body);
        if (!safeParsedBody.success) {
            res.json({
                message: "incorrect Format"
            });
            return;
        }
        const username = req.body.username;
        const password = req.body.password;
        const hashedPass = yield bcrypt_1.default.hash(password, 10);
        try {
            yield db_1.UserModel.create({
                username,
                password: hashedPass
            });
            res.json({
                message: "Successfully Signed In"
            });
        }
        catch (error) {
            res.json({
                message: "User Exists Already"
            });
        }
    });
});
app.post("/api/v1/signin", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { username, password } = req.body;
        // Find user by username only
        const existingUser = yield db_1.UserModel.findOne({ username });
        if (!existingUser) {
            return res.json({ message: "Incorrect Credentials" });
        }
        // Compare passwords
        const isMatch = yield bcrypt_1.default.compare(password, existingUser.password);
        if (isMatch) {
            const token = jsonwebtoken_1.default.sign({ id: existingUser._id }, JWT_SECRET);
            res.json({ token });
        }
        else {
            res.json({ message: "Incorrect Credentials" });
        }
    });
});
app.post("/api/v1/content", middleware_1.userMiddleware, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const link = req.body.link;
        const type = req.body.type;
        try {
            yield db_1.ContentModel.create({
                link,
                type,
                userId: req.userId,
                title: req.body.title,
                tags: []
            });
            res.json({ message: "Content added" });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: "Content not added", error });
        }
    });
});
app.get("/api/v1/content", middleware_1.userMiddleware, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        //@ts-ignore
        const userId = req.userId;
        console.log("UserID from middleware:", userId);
        const content = yield db_1.ContentModel.find({
            userId: userId
        }).populate("userId", "username");
        res.json({
            content
        });
    });
});
app.delete("/api/v1/content", middleware_1.userMiddleware, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const contentId = req.body.contentId;
        yield db_1.ContentModel.deleteMany({
            contentId,
            //@ts-ignore
            userId: req.userId
        });
        res.json({
            message: "deleted"
        });
    });
});
app.post("/api/v1/share", middleware_1.userMiddleware, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const share = req.body.share;
        if (share) {
            let hash = (0, utils_1.random)(20);
            yield db_1.linkModel.create({
                //@ts-ignore
                userId: req.userId,
                hash: hash
            });
            res.json({
                message: "updated Sharable Link",
                hash: hash
            });
        }
        else {
            yield db_1.linkModel.deleteOne({
                //@ts-ignore
                userId: req.userId
            });
            res.json({
                message: "removed Sharable Link"
            });
        }
    });
});
app.post("/api/v1/:shareLink", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const hash = req.params.shareLink;
        const link = yield db_1.linkModel.findOne({
            hash
        });
        if (!link) {
            res.status(411).json({
                message: "incorrect link or Input"
            });
            return;
        }
        const content = yield db_1.ContentModel.find({
            userId: link.userId
        });
        const user = yield db_1.UserModel.find({
            _id: link.userId
        });
        if (!user) {
            res.json({
                message: "user Not found ,error should ideally not happen"
            });
            return;
        }
        res.json({
            //@ts-ignore
            username: user.username,
            content: content
        });
    });
});
app.listen(3000);
