import { getAllPosts } from "../services/postService.js"
import { useState, useEffect } from "react";

export const HomePage = () => {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getAllPosts();
        setPosts(data);
      } catch (error) {
        console.error("Error al obtener los posts:", error);
      }
    };

    fetchPosts();
  
  }, []);

  if (!posts) {
    return <div>Loading...</div>;
  }
    return(
        <main>
            <h1>Welcome to my blog</h1>
            <section className="posts">
                {posts.map((post)=>(
                    <article className="post" key={post.postId}>
                        <div className="titleAndDate">
                            <h2>{post.title}</h2>
                            <p className="date">{new Date(post.createdAt).toLocaleString()}</p>
                        </div>
                        <p>{post.messagePost}</p>
                        <a href={`post/${post.postId}/comments`}>See comments</a>
                    </article>
                ))}
            </section>
        </main>
    )
}
