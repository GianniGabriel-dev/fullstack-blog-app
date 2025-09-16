import { useState } from "react";
import { validateSignup } from "../services/validations.js";
import { useNavigate } from "react-router-dom";

export const SignUpPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value }); //cada vez que se cambia un iput, se actualiza el estado
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateSignup(formData); //validate se encarga de encontrarr errores en el fromulario y pasrar un objeto ocn los errores encontraddos
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    try {
      const res = await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        navigate("/login");
      } else {
        setErrors({ general: data.errors[0].msg });
        console.log(errors);
      }
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <>
      <h1 className="mt-3 mb-9 ">Sign Up</h1>
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
              errors.username || errors.general
                ? "border-red-500"
                : "border-gray-600"
            }  text-sm rounded-lg  block w-full p-2.5 outline-none bg-gray-700 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500`}
            placeholder="Username"
          />
          {errors.username && <p className="text-red-500">{errors.username}</p>}
          {errors.general && <p className="text-red-500">{errors.general}</p>}
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
              errors.password ? "border-red-500" : "border-gray-600"
            }  text-sm rounded-lg  block w-full p-2.5 outline-none bg-gray-700 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500`}
          />
          {errors.password && <p className="text-red-500">{errors.password}</p>}
        </div>
        <div className="mb-5">
          <label
            htmlFor="confirmPassword"
            className="block mb-2 text-xl font-medium  text-white"
          >
            Confirm password:
          </label>
          <input
            type="password"
            id="confirmPassword"
            onChange={handleChange}
            value={formData.confirmPassword}
            className={`border ${
              errors.confirmPassword ? "border-red-500" : "border-gray-600"
            } text-sm rounded-lg  outline-none block w-full p-2.5 bg-gray-700 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500`}
          />
          {errors.confirmPassword && (
            <p className="text-red-500">{errors.confirmPassword}</p>
          )}
        </div>

        <button
          type="submit"
          className="text-white  focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
        >
          Register
        </button>
      </form>
    </>
  );
};
