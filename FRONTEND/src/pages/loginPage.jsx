import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateLogin } from "../services/validations.js";

export const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateLogin(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    try {
      const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      });

      const data = await res.json();
      console.log(data);

      if (res.ok) {
        localStorage.setItem("token", data.token); //almacena el token en el localeStorage para identificar al usuario en la pagina
        localStorage.setItem("user", JSON.stringify(data.user)); //almacena el username en el localeStorage para identificar al usuario en la pagina
        navigate("/");
      } else {
        //si el server devuelve un array de errores, significa que el usario no existe, si en cambio delvuelve solo un mensaje significa que las creedenciales son incorrectas
        if (data.errors && Array.isArray(data.errors)) {
          setErrors({ username: data.errors[0].msg });
        } else if (data.message) {
          setErrors({ wrongCredentials: data.message });
        }

        console.log(errors);
      }
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <>
      <h1 className="mt-3 mb-9 ">Login</h1>
      <form
        className="w-full max-w-screen-md mx-auto px-4"
        onSubmit={handleSubmit}
      >
        <div className="mb-5">
          <label
            htmlFor="username"
            className="block mb-2 text-xl font-medium  text-white"
          >
            Username:
          </label>
          <input
            type="text"
            id="username"
            onChange={handleChange}
            value={formData.username}
            className={`border ${
              errors.username || errors.usernameNotFound
                ? "border-red-500"
                : "border-gray-600"
            }  text-sm rounded-lg  block w-full p-2.5  outline-none bg-gray-700 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500`}
            placeholder="Username"
          />
          {errors.username && <p className="text-red-500">{errors.username}</p>}
          {errors.usernameNotFound && (
            <p className="text-red-500">{errors.usernameNotFound}</p>
          )}
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-xl font-medium  text-white"
          >
            Password:
          </label>
          <input
            type="password"
            id="password"
            onChange={handleChange}
            value={formData.password}
            className={`border ${
              errors.password || errors.wrongCredentials
                ? "border-red-500"
                : "border-gray-600"
            }  text-sm rounded-lg   block w-full p-2.5 outline-none bg-gray-700 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500`}
          />
          {errors.password && <p className="text-red-500">{errors.password}</p>}
          {errors.wrongCredentials && (
            <p className="text-red-500">{errors.wrongCredentials}</p>
          )}
        </div>
        <button
          type="submit"
          className="text-white   focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
        >
          Login
        </button>
      </form>
    </>
  );
};
