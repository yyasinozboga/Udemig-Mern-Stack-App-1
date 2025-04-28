import mongoose, { Schema } from "mongoose";

interface IPost {
  _id: Schema.Types.ObjectId;
  title: string;
  description: string;
  username: string;
  createdAt: Date;
  updatedAt: Date;
}

const postSchema = new Schema<IPost>(
  {
    title: {
      type: String,
      required: [true, "Title is required!"],
      maxlength: [20, "Title length must be less than 20 characters!"],
    },

    description: {
      type: String,
      required: [true, "Description is required!"],
      maxlength: [50, "Description length must be less than 50 characters!"],
    },

    username: {
      type: String,
      required: [true, "Username is required!"],
      maxlength: [20, "Username length must be less than 20 characters!"],
    },
  },
  {
    timestamps: true,
  },
);

const Post = mongoose.model<IPost>("Post", postSchema);

export default Post;
