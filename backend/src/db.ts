import mongoose, { Schema, model } from "mongoose";
import { string } from "zod";

const ObjectId = Schema.Types.ObjectId;

// ✅ Connect to MongoDB
mongoose.connect('mongodb+srv://Mukul:fRQc8NLbccqwkPmV@cluster0.nbxxwdx.mongodb.net/barinly');

// ✅ User Schema
const Users = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// ✅ Tag Schema
const Tags = new Schema({
  title: String
});

// ✅ Content Schema
const Content = new Schema({
  link: String,
  title: String,
  type : String,
  tags: [{ type: ObjectId, ref: "TagModel" }],
  userId: { type: ObjectId, ref: "UserModel", required: true }
});

// ✅ Link Schema
const link = new Schema({
  hash: String,
  userId: { type: ObjectId, ref: "UserModel", required: true, unique: true }
});

// ✅ Export models
export const UserModel = model("UserModel", Users);
export const TagModel = model("TagModel", Tags);
export const ContentModel = model("ContentModel", Content);
export const linkModel = model("linkModel", link);
