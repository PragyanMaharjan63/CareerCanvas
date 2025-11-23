import { useEffect, useState } from "react";
import Popup from "../assets/ui/popup";
import axios from "axios";
import { Trash2 } from "lucide-react";
import Toast from "../assets/ui/toast";

type Goal = {
  Name: string;
  Description: string;
  _id: string;
};

export default function GoalSection() {
  const [ToastMessage, setToastMessage] = useState("");
  const [datas, setData] = useState<Goal[]>([]);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const req = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/goals`,
        { withCredentials: true }
      );
      setData(req.data.message[0].goals);
    };
    getData();
  }, []);

  const HandleAddGoal = () => {
    setShowPopup(true);
  };
  const HandleSubmitGoal = async (value: any) => {
    const transformData = {
      Name: value.Inp1,
      Description: value.Inp5,
    };

    try {
      const req = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/goals`,
        { Name: transformData.Name, Description: transformData.Description },
        { withCredentials: true }
      );
      setData((prev) => [...prev, req.data.Goals]);
      setToastMessage(req.data.message);
    } catch (err) {
      console.log(err);
    }
  };
  const handleDeleteGoal = async (_id: string) => {
    const req = await axios.delete(
      `${import.meta.env.VITE_BACKEND_URL}/api/goals/${_id}`,
      { withCredentials: true }
    );
    setData((prev) => prev.filter((Goal) => Goal._id !== _id));
    setToastMessage(req.data.message);
  };
  return (
    <>
      {ToastMessage && <Toast message={ToastMessage} exit={setToastMessage} />}
      <div className="grid gap-4 w-full">
        {showPopup && (
          <div className="fixed inset-0 w-full top-0 left-0 bg-black/60">
            <Popup
              inpType="Goal"
              input1={true}
              input5={true}
              showPopup={setShowPopup}
              handleSubmit={HandleSubmitGoal}
            />
          </div>
        )}
        <div className="w-full grid gap-4">
          <div className="grid gap-4">
            {datas?.map((Goal, idx) => (
              <div
                className="ring-1 ring-orange-600/40 p-2 rounded-lg bg-orange-700/10"
                key={Goal._id || idx}
              >
                <div className="flex justify-between">
                  <p className="font-bold text-xl">{Goal.Name}</p>
                  <Trash2
                    className="p-1 size-8 cursor-pointer hover:ring-red-600 hover:ring-1 rounded-lg hover:bg-red-700/60"
                    onClick={() => handleDeleteGoal(Goal._id)}
                  />
                </div>
                <div className="flex justify-between text-neutral-400">
                  {Goal.Description}
                </div>
              </div>
            ))}
          </div>
          <button
            className="bg-white text-black w-full rounded-lg p-2 font-semibold cursor-pointer"
            onClick={() => {
              HandleAddGoal();
            }}
          >
            + Add Goal
          </button>
        </div>
      </div>
    </>
  );
}
