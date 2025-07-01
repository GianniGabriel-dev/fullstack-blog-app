import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPostById } from "../services/postService.js";
import { WriteComment } from "../components/writeComment.jsx";
import { Loading } from "../components/loading.jsx";

export const CommentsPage = () => {
  const { postId } = useParams();
  const [data, setData] = useState(null);

  const token = localStorage.getItem("token");

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
    return <Loading />;
  }

  return (
    <>
      <div className="flex flex-col items-center gap-6">
        <section className="w-7xl mt-7  p-6 border rounded-lg shadow-sm bg-gray-800 border-gray-700 ">
          <div className="flex justify-between mb-4 items-center ">
            <h2 className="mb-2 text-3xl font-bold tracking-tight text-white">
              {data.post.title}
            </h2>
            <p className="text-xl">
              {new Date(data.post.createdAt).toLocaleString()}
            </p>
          </div>
          <p className="text-lg ">{data.post.messagePost}</p>
          {token && (
            <WriteComment
              addComment={(newComment) => {
                setData((prev) => ({
                  ...prev,
                  comments: [newComment, ...prev.comments], // añade el nuevo comentario al principio del array y luego el resto de cometarioas
                }));
              }}
            />
          )}
        </section>

        <section className="w-6xl p-6 bg-gray-800 border border-gray-700 rounded-lg shadow-sm">
          <h3 className="text-2xl font-semibold text-white mb-4">Comments:</h3>
          {data.comments.length === 0 ? (
            <p className="text-gray-400">No comments yet</p>
          ) : (
            data.comments.map((comment) => (
              <article
                className="mb-4 p-4 bg-gray-700 rounded-md border border-gray-600 hover:bg-gray-600 transition"
                key={comment.commentId}
              >
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm font-medium text-blue-300">
                    {comment.user.username}
                  </p>
                  <p className="text-xs text-gray-400">
                    {new Date(comment.createdAt).toLocaleString()}
                  </p>
                </div>
                <p className="text-gray-200">{comment.message}</p>
              </article>
            ))
          )}
        </section>
      </div>
    </>
  );
};
