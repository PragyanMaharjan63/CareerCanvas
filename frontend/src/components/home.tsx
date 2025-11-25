import { useEffect, useState } from "react";
import GoalSection from "./goals";
import ProjectSection from "./projects";
import SkillSection from "./skill";
import axios from "axios";
import Toast from "../assets/ui/toast";
import { useNavigate } from "react-router-dom";

type userDetails = {
  _id: string;
  UserName: string;
  Email: string;
  ProfilePicture: string;
};

export default function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState<userDetails>();
  const [dropdown, setDropdown] = useState(false);
  const [ToastMessage, setToastMessage] = useState("");
  useEffect(() => {
    const isAuth = async () => {
      try {
        const req = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/auth/me`,
          { withCredentials: true }
        );
        if (req.status === 200) {
          setUser(req.data.user);
        }
      } catch (err) {
        navigate("/login");
      }
    };
    isAuth();
  }, []);
  const handleLogout = async () => {
    let req = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/auth/logout`,
      {},
      { withCredentials: true }
    );
    setToastMessage(req.data.message);
    navigate("/login");
  };
  return (
    <>
      {ToastMessage && <Toast message={ToastMessage} exit={setToastMessage} />}
      <div className="absolute w-full top-10">
        <div className="grid  gap-4">
          <div className="flex relative items-center  justify-between  bg-neutral-800 rounded-2xl p-3 mx-3">
            <div>
              <p className="text-xl font-bold">{user?.UserName}</p>
              <p>{user?.Email}</p>
            </div>
            <div
              className="size-20 bg-neutral-700 rounded-full flex justify-center items-center overflow-hidden cursor-pointer"
              onClick={() => {
                setDropdown((prev) => !prev);
              }}
            >
              <img src={user?.ProfilePicture} alt="picture" />
            </div>
            {dropdown && (
              <div className="absolute grid gap-3 bottom-0 translate-y-15 rounded-xl w-40 right-0 p-2 z-20 bg-neutral-800/90">
                <div
                  className="bg-neutral-700 hover:bg-neutral-600 rounded-lg p-2 cursor-pointer"
                  onClick={() => {
                    handleLogout();
                  }}
                >
                  logout
                </div>
              </div>
            )}
          </div>
          <div className="grid items-start grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-4 mx-3">
            <div className="flex items-center  justify-between  bg-neutral-800 rounded-2xl p-3 ">
              <SkillSection />
            </div>
            <div className="flex items-center justify-between  bg-neutral-800 rounded-2xl p-3">
              <ProjectSection />
            </div>
            <div className="flex items-center justify-between  bg-neutral-800 rounded-2xl p-3">
              <GoalSection />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
