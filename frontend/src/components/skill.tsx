import { useState } from "react";
import Popup from "../assets/ui/popup";

type skill = {
  Inp1: string;
  Inp4: string | number;
};

export default function SkillSection() {
  const [datas, setData] = useState<skill[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const HandleAddSkill = () => {
    setShowPopup(true);
  };
  return (
    <>
      <div className="grid gap-4 w-full">
        {showPopup && (
          <div className="fixed inset-0 w-full top-0 left-0 bg-black/60">
            <Popup
              inpType="Skill"
              input1={true}
              input4={true}
              setData={(value) => {
                setData((prev) => [...prev, value]);
              }}
              showPopup={setShowPopup}
            />
          </div>
        )}
        <div className="w-full grid gap-4">
          <div className="grid gap-4">
            {datas?.map((skill, idx) => (
              <div
                className="ring-1 ring-indigo-600/40 p-2 rounded-lg bg-indigo-700/10"
                key={idx}
              >
                <p className="font-bold text-xl">{skill.Inp1}</p>
                <div className="flex justify-between text-neutral-400">
                  <p>Skill Confidence</p>
                  {skill.Inp4}
                </div>
                <div className="size-2 bg-indigo-200 w-full mb-2">
                  <div
                    className="size-2 bg-indigo-600/80"
                    style={{ width: `${skill.Inp4}%` }}
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
