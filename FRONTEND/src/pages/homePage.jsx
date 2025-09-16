import { Link, useNavigate } from "react-router-dom";
import { deletePostById, getAllPosts } from "../services/postService.js";
import { useState, useEffect } from "react";
import { Loading } from "../components/loading.jsx";

export const HomePage = () => {
  const [posts, setPosts] = useState(null);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user")); // parsea el usuario si está guardado como JSON
  const isAdmin = user?.role === "admin";

  const handleDeletePost = async(postId)=>{
    await deletePostById(postId, localStorage.getItem("token"));
    setPosts((prevPosts) => prevPosts.filter((post) => post.postId !== postId)); // Actualiza el estado para eliminar el post sin recargar la página
  }

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
    return <Loading />;
  }
  return (
    <>
      <h1 className="mt-3 mb-9 ">Welcome to my blog</h1>
      <section className="max-w-2xl mx-auto flex flex-col gap-6 pb-9">
        {posts.map((post) => (
  <article
    className="p-6 border rounded-lg shadow-sm bg-gray-800 border-gray-700 hover:bg-gray-700 hover:shadow-md transition"
    key={post.postId}
  >
    <div className="cursor-default">
      <div className="flex justify-between mb-4 items-center">
        <h2 className="mb-2 text-2xl font-bold tracking-tight text-white">
          {post.title}
        </h2>
        <p className="date">
          {new Date(post.createdAt).toLocaleString()}
        </p>
      </div>
      <p className="mb-3 font-normal text-gray-400">
        {post.messagePost}
      </p>

      <div className="flex justify-between mb-2">
        <button
          className="cursor-pointer inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-800"
          onClick={() => navigate(`post/${post.postId}/comments`)}
        >
          See comments
        </button>

        {isAdmin && (
          <div className="flex gap-5">
            <button
              className="cursor-pointer inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-800"
              onClick={() => navigate(`post/${post.postId}/edit`)}
            >
              Edit
            </button>
            <button
              className="cursor-pointer inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-800"
              onClick={() => handleDeletePost(post.postId)}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  </article>
        ))}
      </section>
    </>
  );
};
