import express from "express";
import {
  addPost,
  deletePostById,
  getAllPosts,
  updatePostById,
} from "../controllers/postControllers";
import { protect } from "../controllers/userControllers";

const router = express.Router();

router.use(protect);

router.route("/").get(getAllPosts).post(addPost);

router.route("/:id").delete(deletePostById).patch(updatePostById);

export default router;
