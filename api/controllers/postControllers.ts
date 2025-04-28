import { Request, Response } from "express";
import Post from "../models/postModal";

const getAllPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Post.find();

    res.status(200).json(posts);
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
};

const addPost = async (req: Request, res: Response) => {
  try {
    const newPost = await Post.create(req.body);

    res.status(201).json(newPost);
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
};

const deletePostById = async (req: Request, res: Response) => {
  try {
    await Post.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Post deleted successfully." });
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
};

const updatePostById = async (req: Request, res: Response) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json(updatedPost);
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
};

export { getAllPosts, addPost, deletePostById, updatePostById };
