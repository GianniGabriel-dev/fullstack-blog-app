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
        <>
            <h1 className="mt-3 mb-9 " >Welcome to my blog</h1>
            <section className="max-w-2xl mx-auto flex flex-col gap-6">
                {posts.map((post)=>(
                    <article className="p-6 border rounded-lg shadow-sm bg-gray-800 border-gray-700 hover:bg-gray-700 hover:shadow-md transition" key={post.postId}>
                      <a className="cursor-default" href={`post/${post.postId}/comments`}>
                          <div className="flex justify-between mb-4 items-center">
                              <h2 className="mb-2 text-2xl font-bold tracking-tight text-white">
                                {post.title}
                              </h2>
                              <p className="date">{new Date(post.createdAt).toLocaleString()}</p>
                          </div>
                          <p className="mb-3 font-normaltext-gray-400">{post.messagePost}</p>
                          <div className="flex justify-items-start">
                            <button className="cursor-pointer mt-2 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" 
                            onClick={()=> window.location.href="post/${post.postId}/comments`"}>
                              See comments
                              <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                              </svg>
                            </button>
                          </div>
                        </a>
                    </article>
                ))}
            </section>
        </>
    )
}
