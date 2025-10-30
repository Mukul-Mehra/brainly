import express from "express";
import { ContentModel, linkModel, UserModel } from "./db";
import z from "zod"
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { AuthRequest, userMiddleware } from "./middleware";
import { random } from "./utils";
import cors  from 'cors';
const JWT_SECRET = "mukul@!2004"
const app = express();
app.use(express.json())
app.use(cors())

app.post("/api/v1/signup", async function (req, res) {

    const requireBody = z.object({
        username: z.string().min(3).max(20),
        password: z.string()
    })

    const safeParsedBody = requireBody.safeParse(req.body)

    if (!safeParsedBody.success) {
        res.json({
            message: "incorrect Format"
        })
        return
    }
    const username = req.body.username
    const password = req.body.password

    const hashedPass = await bcrypt.hash(password, 10)
    try {
        await UserModel.create({
            username,
            password: hashedPass
        })
        res.json({
            message: "Successfully Signed In"
        })
    } catch (error) {
        res.json({
            message: "User Exists Already"
        })
    }

})
app.post("/api/v1/signin", async function (req, res) {
    const { username, password } = req.body;

    // Find user by username only
    const existingUser = await UserModel.findOne({ username });

    if (!existingUser) {
        return res.json({ message: "Incorrect Credentials" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, existingUser.password);

    if (isMatch) {
        const token = jwt.sign({ id: existingUser._id }, JWT_SECRET);
        res.json({ token }); 
    } else {
        res.json({ message: "Incorrect Credentials" });
    }
});

app.post("/api/v1/content", userMiddleware, async function (req: AuthRequest, res) {
    const link = req.body.link;
    const type = req.body.type;

    try {
        await ContentModel.create({
            link,
            type,
            userId: req.userId,
            title : req.body.title,
            tags: []
        });

        res.json({ message: "Content added" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Content not added", error });
    }
});
app.get("/api/v1/content", userMiddleware, async function (req: AuthRequest, res) {
    //@ts-ignore
    const userId = req.userId

    const content = await ContentModel.find({
        userId: userId
    }).populate("userId", "username")
    res.json({
        content
    })

})
app.delete("/api/v1/content", userMiddleware, async function (req, res) {
    const contentId = req.body.contentId

    await ContentModel.deleteMany({
        contentId,
        //@ts-ignore
        userId: req.userId
    })
    res.json({
        message: "deleted"
    })

})
app.post("/api/v1/share", userMiddleware, async function (req, res) {

    const share = req.body.share

    if (share) {
        let hash = random(20)
        await linkModel.create({
            //@ts-ignore
            userId: req.userId,
            hash: hash
        })
         res.json({
        message: "updated Sharable Link",
        hash : hash

    })
    } else {
        await linkModel.deleteOne({
            //@ts-ignore
            userId: req.userId
        })
         res.json({
        message: "removed Sharable Link"

    })
    }

   
})
app.post("/api/v1/:shareLink", async function (req, res) {
    const hash = req.params.shareLink

    const link = await linkModel.findOne({
        hash
    })
    if (!link) {
        res.status(411).json({
            message: "incorrect link or Input"
        })
        return;
    }


    const content = await ContentModel.find({
        userId: link.userId
    })

    const user= await UserModel.find({
        _id: link.userId
    })

    if (!user) {
        res.json({
            message : "user Not found ,error should ideally not happen"
        })
        return;
    }
    res.json({
        //@ts-ignore
        username : user.username,
        content : content
    })

})
app.listen(3000);