import {
  createPost,
  deletePostById,
  updatePostById,
} from "../services/adminServices.js";
import { getPosts } from "../services/userServices.js";

export const getAllPosts = async (req, res) => {
  try {
    const posts = await getPosts();
    return res.json(posts);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching posts" });
  }
};
export const createNewPost = async (req, res) => {
  const { title, messagePost } = req.body;
  try {
    const newPost = await createPost(title, messagePost);
    return res.json({
      message: "Post Created",
      post: {
        id: newPost.postId,
        title: newPost.title,
        messagePost: newPost.messagePost,
        created_at: newPost.createdAt,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Error creating the post" });
  }
};

export const deletePost = async (req, res) => {
  const postId = parseInt(req.params.postId, 10); // pasa de string a entero
  try {
    await deletePostById(postId);
    return res.json({ message: "Post deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting the post" });
  }
};

export const udpatePost = async (req, res) => {
  const postId = parseInt(req.params.postId, 10); // pasa de string a entero
  const { title, messagePost } = req.body;

  try {
    const updatedPost = await updatePostById(postId, title, messagePost);
    return res.json({
      message: "Post updated successfully",
      post: {
        id: updatedPost.postId,
        title: updatedPost.title,
        messagePost: updatedPost.messagePost,
        created_at: updatedPost.createdAt,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Error updating the post" });
  }
};
