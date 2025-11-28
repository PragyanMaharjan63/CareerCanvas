import { useForm, type SubmitHandler } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import Toast from "../assets/ui/toast";
import { useBackend } from "../context/globalcontext";
import { Eye, EyeClosed } from "lucide-react";
type Inputs = {
  Email: string;
  Password: string;
};

export default function Login() {
  const [ToastMessage, setToastMessage] = useState("");
  const { checkAuth } = useBackend();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      console.log(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`);
      const req = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,
        { Email: data.Email, Password: data.Password },
        { withCredentials: true, validateStatus: () => true }
      );
      if (req.status === 200) {
        console.log(req.data.message);
        setToastMessage(req.data.message);
        await checkAuth();
      }
      console.log(req.data.message);
      setToastMessage(req.data.message);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {ToastMessage && <Toast message={ToastMessage} exit={setToastMessage} />}
      <div className="min-h-screen flex items-center justify-center p-4 bg-neutral-950">
        <div className="rounded-2xl flex ring-1 ring-neutral-500 w-full max-w-6xl overflow-hidden">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className=" grid gap-6 w-full md:w-3/5 lg:w-1/2 p-6 sm:p-8 "
          >
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
                <label htmlFor="Email">Email</label>
                <input
                  {...register("Email", { required: "Enter Email" })}
                  type="email"
                  name="Email"
                  id="Email"
                  placeholder="Email "
                  className="ring-1 ring-neutral-600 focus:ring-neutral-400 py-2.5 px-3 w-full bg-neutral-900 rounded-lg outline-none transition-all"
                />
                {errors.Email && (
                  <p className="text-sm text-red-500">{errors.Email.message}</p>
                )}
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <div className="relative">
                  <div
                    className="absolute right-4 top-3 cursor-pointer"
                    onClick={() => {
                      setShowPassword((prev) => !prev);
                    }}
                  >
                    {showPassword ? <Eye /> : <EyeClosed />}
                  </div>

                  <input
                    {...register("Password", {
                      required: "Enter Password",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters ",
                      },
                    })}
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder="*****************"
                    className="ring-1 ring-neutral-600 focus:ring-neutral-400 py-2.5 px-3 w-full bg-neutral-900 rounded-lg outline-none transition-all"
                  />
                </div>
                {errors.Password && (
                  <p className="text-sm text-red-500">
                    {errors.Password.message}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="bg-white hover:bg-neutral-100 text-black font-medium w-full py-2.5 rounded-lg cursor-pointer transition-colors mt-2"
              >
                Log In
              </button>
            </div>
            <p className="text-center text-sm text-neutral-400 w-full">
              Don't have an account?{" "}
              <a href="/signin" className="text-white hover:underline">
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
