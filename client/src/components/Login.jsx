import { useForm } from "react-hook-form";
import { useState } from "react";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data) => console.log(data);

  return (
    <div className="flex items-center justify-center bg-gray-100 h-screen">
      <form
        className="mt-5 shadow-md rounded-xl px-12 py-8 flex items-center justify-center flex-col w-[26rem] bg-white"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-2xl font-semibold mb-4">Login</h2>

        <div className="w-full">
          <div className="my-2 w-full">
            <label>Email ID</label>
            <input
              type="email"
              className="block p-2 border border-gray-400 outline-blue-700 w-full"
              placeholder="Enter Email ID"
              {...register("email")}
            />
          </div>
          <div className="my-2 relative">
            <div>
              <label>Password</label>
              <input
                type={showPassword? "text" : "password"}
                className="block p-2 border border-gray-400 outline-blue-700 w-full"
                placeholder="Enter Password"
                {...register("password")}
              />
            </div>
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="absolute bottom-2.5 left-[17.6rem] text-[12px] text-blue-600 cursor-pointer"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <p className="relative left-[13.2rem] text-sm text-blue-600">
            Forgot Password?
          </p>
        </div>

        <button
          type="submit"
          className="bg-blue-400 font-semibold py-2 w-full mt-12 text-white cursor-pointer"
        >
          Login
        </button>
      </form>
    </div>
  );
};
export default Login;
