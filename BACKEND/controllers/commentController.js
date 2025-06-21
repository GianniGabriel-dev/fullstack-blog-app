import { validationResult } from 'express-validator';
import { createComment, getComments, getPostById } from '../services/userServices.js';

export const getAllComments = async(req, res)=>{
    const postId = parseInt(req.params.postId, 10); // pasa de string a entero
    try{
        const comments = await getComments(postId)
        const blogPost= await getPostById(postId)
        return res.json({
            comments: comments,
            post: blogPost
        });
    }
    catch(error){
        console.error(error)
        return res.status(500).json({message: "Error fetching comments"});
    }
}

export const createNewComment = async (req, res)=>{
    const { message } = req.body
    const postId = parseInt(req.params.postId, 10); // pasa de string a entero
    const userId = req.user.userId;   

    //se comprueba que el mensaje no esté vacío
    const errors = validationResult(req); 
      if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
      }

    try{
        const newMessage= await createComment( postId, userId, message );
        console.log(newMessage)
        return res.json({
            message: "Comment Created",
            comment: {
                commentId: newMessage.commentId,
                postId: newMessage.postId,
                userId: newMessage.userId,
                title: newMessage.title,
                message: newMessage.message,
                created_at: newMessage.createdAt,
            }
        });
    }
    catch(error){
        console.error(error);
        return res.status(500).json({message: "Error creating the comment"});
    }
}