import axios from "axios";
import { useForm, type SubmitHandler } from "react-hook-form";

type Inputs = {
  Username: string;
  Email: string;
  Password: string;
};

export function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const req = await axios.post("");
  };
  return (
    <>
      <div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="ring-[0.5px] p-6 rounded-lg md:w-[27rem] w-96 flex flex-col items-start gap-6"
        >
          <h1 className="flex justify-center text-2xl font-semibold w-full mb-4">
            Create an account
          </h1>

          <div className="w-full flex md:flex-row flex-col items-start md:justify-between gap-4">
            <div className="flex flex-col items-start gap-1 text-[0.85rem] w-full">
              <label htmlFor="input">UserName</label>
              <input
                {...register("Username", { required: "Enter UserName" })}
                type="text"
                className="ring-[0.5px] py-2 px-3 w-full bg-neutral-900 rounded-lg"
                placeholder="Username"
              />
              <p className="text-sm text-red-500">{errors.Username?.message}</p>
            </div>
          </div>

          <div className="flex flex-col items-start gap-1 text-[0.85rem] w-full">
            <label htmlFor="input">Email Address</label>
            <input
              {...register("Email", { required: "Enter Email" })}
              type="email"
              className="ring-[0.5px] py-2 px-3 w-full rounded-lg bg-neutral-900"
              placeholder="sabin@gmail.com"
            />
            <p className="text-sm text-red-500">{errors.Email?.message}</p>
          </div>

          <div className="flex flex-col items-start gap-1 text-[0.85rem] w-full">
            <label htmlFor="input">Password</label>
            <input
              {...register("Password", { required: "Enter Password" })}
              type="password"
              className="ring-[0.5px] py-2 px-3 w-full bg-neutral-900 rounded-lg"
              placeholder="*****************"
            />
            <p className="text-sm text-red-500">{errors.Password?.message}</p>
          </div>

          <button
            type="submit"
            className="dark:bg-zinc-200 dark:hover:bg-zinc-50 bg-black ring-[0.5px] border-black dark:text-black text-white w-full py-2 rounded-lg"
          >
            {" "}
            Sign up
          </button>
        </form>
      </div>
    </>
  );
}

export function Signin() {
  return <>Signin</>;
}
