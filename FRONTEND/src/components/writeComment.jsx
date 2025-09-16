import { useState } from "react";
import { validateComment } from "../services/validations.js";
import { useParams } from "react-router-dom";

export const WriteComment = ({ addComment }) => {
  const [comment, setComment] = useState("");
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  const user = JSON.parse(localStorage.getItem("user")) || {};

  const { postId } = useParams();

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateComment(comment);
    if (Object.keys(validationErrors).length > 0) {
      setError(validationErrors);
      return;
    }
    setError(null);
    try {
      const res = await fetch(`http://localhost:3000/post/${postId}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, //se añade el token al header para que el server pueda identificar al usuario
        },
        body: JSON.stringify({
          message: comment,
        }),
      });
  
      const data = await res.json();

      if (res.ok) {
        setComment("");
        //se añade el comentario a un  array de comentarios que se va a mostrar en la pagina
        addComment({
          ...data.comment,
          createdAt: data.comment.created_at,
          user: {
            username: user.username,
          },
        });
      }
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <form className="mt-14" onSubmit={handleSubmit}>
      <label htmlFor="message" className="sr-only">
        Your message
      </label>
      <div className=" w-5xl flex items-center px-3 py-2 rounded-lg bg-gray-700">
        <textarea
          value={comment}
          onChange={handleChange}
          id="message"
          rows="1"
          className="block mx-4 p-2.5 w-full text-sm   rounded-lg border   bg-gray-800 border-gray-600 placeholder-gray-400 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder="Write a comment"
        ></textarea>
        <button
          type="submit"
          className="inline-flex justify-center p-2  rounded-full cursor-pointer text-blue-500 hover:bg-gray-600"
        >
          <svg
            className="w-5 h-5 rotate-90 rtl:-rotate-90"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 18 20"
          >
            <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
          </svg>
          <span className="sr-only">Send message</span>
        </button>
      </div>
      {error && (
        <p className="text-red-500 mt-2 text-center">{error.message}</p>
      )}
    </form>
  );
};
