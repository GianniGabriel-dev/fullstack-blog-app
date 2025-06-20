import { createPost} from '../services/adminServices.js'
import { getPosts } from '../services/userServices.js';

export const getAllPosts = async (req, res)=>{
    try{
        const posts = await getPosts()
        return res.json(posts);
    }
    catch(error){
        return res.status(500).json({message: "Error fetching posts"});
    }
}
export const createNewPost = async (req, res)=>{
    const { title, messagePost} = req.body
    try{
        const newPost= await createPost(title, messagePost);
        return res.json({
            message: "Post Created",
            post: {
                id: newPost.postId,
                title: newPost.title,
                messagePost: newPost.messagePost,
                created_at: newPost.createdAt,
            }
        });
    }
    catch(error){
        console.log(error)
        return res.status(500).json({message: "Error creating the post"});
    }
}