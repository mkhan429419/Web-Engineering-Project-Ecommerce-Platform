import { useState } from "react";

const Login = () => {
  const [loggedInOrSignIn, setloggedInOrSignIn] = useState("Sign up");
  const formHandler=async(e)=>{
    e.preventDefault();
  }
  return (
    <div className="flex justify-center 
    items-center md:my-20 my-10 ">
      <div className="bg-[var(--LightBrown)] rounded-md p-5 w-[90%] sm:w-[80%] md:w-[60%] lg:w-[40%] xl:w-[30%] min-w-[18rem]">
        <h1 className="text-2xl font-semibold text-center">{loggedInOrSignIn}</h1>
        <form className="grid grid-cols-1 gap-5 mt-5" onSubmit={formHandler}>
          {loggedInOrSignIn === "Sign up" && (
            <div className="flex flex-col">
              <label className="text-lg font-semibold" htmlFor="name">
                Name:
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="h-10 rounded-md p-4 border border-gray-300"
                required
                placeholder="e.g Aimen"
              />
            </div>
          )}
          <div className="flex flex-col">
            <label className="text-lg font-semibold" htmlFor="email">
              Email:
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="h-10 rounded-md p-4 border border-gray-300"
              required
              placeholder="e.g aimenmunawarofficial@gmail.com"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-lg font-semibold" htmlFor="password">
              Password:
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="h-10 rounded-md p-4 border border-gray-300"
              required
            />
          </div>
          <div className="mt-5 flex justify-between text-sm">
            <p className="cursor-pointer">
              Forgot Password?
            </p>
            <p
              className="cursor-pointer"
              onClick={() =>
                setloggedInOrSignIn(
                  loggedInOrSignIn === "Sign up" ? "Login" : "Sign up"
                )
              }
            >
              {loggedInOrSignIn === "Sign up" ? "Login" : "Create Account"}
            </p>
          </div>
          <button className="bg-white p-3 rounded-md max-w-30 justify-self-center" type="submit"> <p className="text-lg font-semibold">{loggedInOrSignIn}</p></button>
        </form>
      </div>
    </div>
  );
};

export default Login;
