import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPostById } from "../services/postService.js";

export const CommentsPage = () => {
  const { postId } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const data = await getPostById(postId);
        setData(data);
      } catch (error) {
        console.error("Error al obtener los posts:", error);
      }
    };

    fetchdata();
  }, [postId]);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
        <main>
            <section className="post">
                <div className="titleAndDate">
                    <h2>{data.post.title}</h2>
                    <p className="date">{new Date(data.post.createdAt).toLocaleString()}</p>
                </div>
                    <p>{data.post.messagePost}</p>
            </section>
            <section className="comments">
                {data.comments.map((comment)=>(
                    <article className="comment" key={comment.commentId}>
                        <div className="userAndDate">
                            <p>{comment.user.username}</p>
                            <p className="date">{new Date(comment.createdAt).toLocaleString()}</p>
                        </div>
                        <p>{comment.message}</p>
                    </article>
                ))}
            </section>
        </main>
  );
};
