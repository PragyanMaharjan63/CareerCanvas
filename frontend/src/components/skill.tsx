import { useEffect, useState } from "react";
import Popup from "../assets/ui/popup";
import axios from "axios";
import { Trash2 } from "lucide-react";
import Toast from "../assets/ui/toast";

type skill = {
  name: string;
  level: number;
  _id: string;
};

export default function SkillSection() {
  const [ToastMessage, setToastMessage] = useState("");
  const [datas, setData] = useState<skill[]>([]);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const req = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/skills`,
        { withCredentials: true }
      );
      setData(req.data.message[0].skills);
    };
    getData();
  }, []);

  const HandleAddSkill = () => {
    setShowPopup(true);
  };
  const HandleSubmitSkill = async (value: any) => {
    const transformData = {
      name: value.Inp1,
      level: value.Inp4,
    };

    try {
      const req = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/skills`,
        { name: transformData.name, level: transformData.level },
        { withCredentials: true }
      );
      setData((prev) => [...prev, req.data.skill]);
      setToastMessage(req.data.message);
    } catch (err) {
      console.log(err);
    }
  };
  const handleDeleteSkill = async (_id: string) => {
    const req = await axios.delete(
      `${import.meta.env.VITE_BACKEND_URL}/api/skills/${_id}`,
      { withCredentials: true }
    );
    setData((prev) => prev.filter((skill) => skill._id !== _id));
    setToastMessage(req.data.message);
  };
  return (
    <>
      {ToastMessage && <Toast message={ToastMessage} exit={setToastMessage} />}
      <div className="grid gap-4 w-full">
        {showPopup && (
          <div className="fixed inset-0 w-full top-0 left-0 bg-black/60">
            <Popup
              inpType="Skill"
              input1={true}
              input4={true}
              showPopup={setShowPopup}
              handleSubmit={HandleSubmitSkill}
            />
          </div>
        )}
        <div className="w-full grid gap-4">
          <div className="grid gap-4">
            {datas?.map((skill, idx) => (
              <div
                className="ring-1 ring-indigo-600/40 p-2 rounded-lg bg-indigo-700/10"
                key={skill._id || idx}
              >
                <div className="flex justify-between">
                  <p className="font-bold text-xl">{skill.name}</p>
                  <Trash2
                    className="p-1 size-8 cursor-pointer hover:ring-red-600 hover:ring-1 rounded-lg hover:bg-red-700/60"
                    onClick={() => handleDeleteSkill(skill._id)}
                  />
                </div>
                <div className="flex justify-between text-neutral-400">
                  <p>Skill Confidence</p>
                  {skill.level}
                </div>
                <div className="size-2 bg-indigo-200 w-full mb-2">
                  <div
                    className="size-2 bg-indigo-600/80"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          <button
            className="bg-white text-black w-full rounded-lg p-2 font-semibold cursor-pointer"
            onClick={() => {
              HandleAddSkill();
            }}
          >
            + Add Skill
          </button>
        </div>
      </div>
    </>
  );
}
