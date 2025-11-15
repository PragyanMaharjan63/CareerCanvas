import { useForm, type SubmitHandler } from "react-hook-form";

type Inputs = {
  Username: string;
  Email: string;
  Password: string;
};

export default function Login() {
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
          <form className=" grid gap-6 w-full md:w-3/5 lg:w-1/2 p-6 sm:p-8 lg:p-12">
            <div className="flex flex-col justify-center items-center ">
              <h2 className="text-3xl font-bold text-white mb-4">
                Welcome Back
              </h2>
              <p className="text-neutral-300 text-center">
                Enter the following details to login
              </p>
            </div>
            <div className="grid gap-6">
              <div>
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  name="Username"
                  id="username"
                  placeholder="Username "
                  className="ring-1 ring-neutral-600 focus:ring-neutral-400 py-2.5 px-3 w-full bg-neutral-900 rounded-lg outline-none transition-all"
                />
                {errors.Username && (
                  <p className="text-sm text-red-500">
                    {errors.Username.message}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="*****************"
                  className="ring-1 ring-neutral-600 focus:ring-neutral-400 py-2.5 px-3 w-full bg-neutral-900 rounded-lg outline-none transition-all"
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
            </div>
            <p className="text-center text-sm text-neutral-400 w-full">
              Don't have an account?{" "}
              <a href="#" className="text-white hover:underline">
                Sign in
              </a>
            </p>
          </form>
          <div className="hidden md:flex md:w-2/5 lg:w-1/2 bg-neutral-700 items-center justify-center p-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                Welcome Back
              </h2>
              <p className="text-neutral-300">We are glad to have you back</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
