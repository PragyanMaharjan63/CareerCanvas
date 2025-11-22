import { useEffect, useState } from "react";
import GoalSection from "./goals";
import ProjectSection from "./projects";
import SkillSection from "./skill";
import axios from "axios";

type userDetails = {
  _id: string;
  UserName: string;
  Email: string;
  ProfilePicture: string;
};

export default function Home() {
  const [user, setUser] = useState<userDetails>();
  useEffect(() => {
    const isAuth = async () => {
      const req = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/me`,
        { withCredentials: true }
      );
      if (req.status === 200) {
        setUser(req.data.user);
        console.log(req.data.user);
      }
    };
    isAuth();
  }, []);
  return (
    <>
      <div className="absolute w-full top-10">
        <div className="grid  gap-4">
          <div className="flex items-center  justify-between  bg-neutral-800 rounded-2xl p-3 mx-3">
            <div>
              <p className="text-xl font-bold">{user?.UserName}</p>
              <p>{user?.Email}</p>
            </div>
            <div className="size-20 bg-neutral-700 rounded-full flex justify-center items-center overflow-hidden cursor-pointer">
              <img src={user?.ProfilePicture} alt="picture" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-4 mx-3">
            <div className="flex items-center  justify-between  bg-neutral-800 rounded-2xl p-3 ">
              <SkillSection />
            </div>
            <div className="flex items-center  justify-between  bg-neutral-800 rounded-2xl p-3">
              <ProjectSection />
            </div>
            <div className="flex items-center  justify-between  bg-neutral-800 rounded-2xl p-3">
              <GoalSection />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
