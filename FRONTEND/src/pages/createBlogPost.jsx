import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateCreatePost } from "../services/validations.js";

export const CreateBlogPost = () => {
  const isAdmin = JSON.parse(localStorage.getItem("user")).role === "admin"; // comprobar si el usuario es admin
  const token = localStorage.getItem("token")
  const [formData, SetFormData] = useState({
    title: "",
    messagePost: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate()
  console.log(isAdmin);

  useEffect(()=>{
    if (!isAdmin) navigate("/"); //si no se es admin el usario er redirigido al inicio
  }, [isAdmin, navigate]) 
  

  const handleChange = (e) => {
    SetFormData({ ...formData, [e.target.id]: e.target.value }); 
  }
const handleSubmit = async (e)=>{
    e.preventDefault()
    const validationErrors = validateCreatePost(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({})
    try{
      const res = await fetch("http://localhost:3000/create-post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization" : `Bearer ${token}`
        },
        body: JSON.stringify({
          title: formData.title,
          messagePost: formData.messagePost,
        }),
      });
    const data = await res.json();
      console.log(data);

      if (res.ok){
        navigate("/")
      }
    }catch(err){
        alert ("Error:"+ err.message)
    }
}

  return (
    <>
      <h1 className="mt-3 mb-9 ">Create a new post</h1>
      <form
        className="w-full max-w-screen-md mx-auto px-4"
        onSubmit={handleSubmit}
      >
        <div className="mb-5">
          <label
            htmlFor="username"
            className="block mb-2 text-xl font-medium text-gray-900 dark:text-white"
          >
            Title:
          </label>
          <input
            onChange={handleChange}
            type="text"
            id="title"
            value={formData.title}
            className={`border ${
              errors.title
                ? "border-red-500"
                : "border-gray-600"
            } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-700 outline-none placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
            placeholder="Title..."
          />
          {errors.title && <p className="text-red-500">{errors.title}</p>}
        </div>
        <div className="mb-5">
          <label
            htmlFor="messagePost"
            className="block mb-2 text-xl font-medium text-gray-900 dark:text-white"
          >
            Message of post:
          </label>
          <textarea
            
            id="messagePost"
             onChange={handleChange}
            value={formData.messagePost}
            rows={3}
            placeholder="Write your post here..."
            className={`border ${
              errors.messagePost 
                ? "border-red-500"
                : "border-gray-600"
            }  text-lg rounded-lg outline-none block w-full p-4 bg-gray-700 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 resize-x`}
          />
          {errors.messagePost && <p className="text-red-500">{errors.messagePost}</p>}

        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Create
        </button>
      </form>
    </>
  );
};
