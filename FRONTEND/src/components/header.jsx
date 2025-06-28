import { Link, useNavigate } from "react-router-dom";

export const Header = () => {
    const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem("user"));
  const logout = () =>{
    localStorage.removeItem("token")
    localStorage.removeItem("user");
    navigate("/")
  }

  return (
    <header className="w-full flex flex-wrap items-center justify-between mx-auto p-4 bg-blue-950">
      {user ?(
      <div className="">
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Welcome Back{" "}
            <span className="ml-2 text-blue-300">{user.username}</span>
          </span>
        </Link>
      </div>
      ):
        <Link to="/" className=" space-x-3 rtl:space-x-reverse">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Welcome To my blog{" "}
          </span>
        </Link>

      }

      {user && <button onClick={()=>{logout()}} className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">Logout</button>}
      {!user &&
        <div className="flex gap-3">
            <button onClick={()=>{navigate("/login")}} className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">Login</button>
            <button onClick={()=>{navigate("/signup")}} className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">Sign Up</button>
        </div>

      }
    </header>
  );
};
