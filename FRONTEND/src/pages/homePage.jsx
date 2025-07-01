import { Link, useNavigate } from "react-router-dom";
import { getAllPosts } from "../services/postService.js";
import { useState, useEffect } from "react";
import { Loading } from "../components/loading.jsx";

export const HomePage = () => {
  const [posts, setPosts] = useState(null);
  const navigate = useNavigate();

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
      <section className="max-w-2xl mx-auto flex flex-col gap-6">
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
              <p className="mb-3 font-normaltext-gray-400">
                {post.messagePost}
              </p>
              <div className="flex justify-items-start">
                <button
                  className="cursor-pointer mt-2 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white  rounded-lg  focus:ring-4 focus:outline-none  bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
                  onClick={() => navigate(`post/${post.postId}/comments`)}
                >
                  See comments
                  <svg
                    className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </article>
        ))}
      </section>
    </>
  );
};
