import axios from "axios";
import { useForm, type SubmitHandler } from "react-hook-form";

type Inputs = {
  Username: string;
  Email: string;
  Password: string;
};

export default function Signin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {};
  return (
    <>
      <div className="min-h-screen flex items-center justify-center p-4 bg-neutral-950">
        <div className="rounded-2xl flex ring-1 ring-neutral-500 w-full max-w-6xl overflow-hidden">
          {/* Left side banner - hidden on mobile */}
          <div className="hidden md:flex md:w-2/5 lg:w-1/2 bg-neutral-700 items-center justify-center p-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-4">Welcome</h2>
              <p className="text-neutral-300">Join us today and get started</p>
            </div>
          </div>

          {/* Form section */}
          <div className="w-full md:w-3/5 lg:w-1/2 p-6 sm:p-8 lg:p-12">
            <div className="flex flex-col items-start gap-6 max-w-md mx-auto">
              <div className="flex flex-col items-center text-center w-full">
                <h1 className="text-2xl sm:text-3xl font-semibold mb-2">
                  Create an account
                </h1>
                <p className="text-sm sm:text-base font-normal text-neutral-400">
                  Enter the following details to create new account
                </p>
              </div>

              <div className="w-full flex flex-col items-start gap-1 text-sm">
                <label htmlFor="username" className="font-medium">
                  Username
                </label>
                <input
                  id="username"
                  {...register("Username", { required: "Enter Username" })}
                  type="text"
                  className="ring-1 ring-neutral-600 focus:ring-neutral-400 py-2.5 px-3 w-full bg-neutral-900 rounded-lg outline-none transition-all"
                  placeholder="Username"
                />
                {errors.Username && (
                  <p className="text-sm text-red-500">
                    {errors.Username.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col items-start gap-1 text-sm w-full">
                <label htmlFor="email" className="font-medium">
                  Email Address
                </label>
                <input
                  id="email"
                  {...register("Email", { required: "Enter Email" })}
                  type="email"
                  className="ring-1 ring-neutral-600 focus:ring-neutral-400 py-2.5 px-3 w-full rounded-lg bg-neutral-900 outline-none transition-all"
                  placeholder="example@gmail.com"
                />
                {errors.Email && (
                  <p className="text-sm text-red-500">{errors.Email.message}</p>
                )}
              </div>

              <div className="flex flex-col items-start gap-1 text-sm w-full">
                <label htmlFor="password" className="font-medium">
                  Password
                </label>
                <input
                  id="password"
                  {...register("Password", { required: "Enter Password" })}
                  type="password"
                  className="ring-1 ring-neutral-600 focus:ring-neutral-400 py-2.5 px-3 w-full bg-neutral-900 rounded-lg outline-none transition-all"
                  placeholder="*****************"
                />
                {errors.Password && (
                  <p className="text-sm text-red-500">
                    {errors.Password.message}
                  </p>
                )}
              </div>

              <button
                onClick={handleSubmit(onSubmit)}
                className="bg-white hover:bg-neutral-100 text-black font-medium w-full py-2.5 rounded-lg cursor-pointer transition-colors mt-2"
              >
                Sign up
              </button>

              <p className="text-center text-sm text-neutral-400 w-full">
                Already have an account?{" "}
                <a href="#" className="text-white hover:underline">
                  Login
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
