import { useEffect, useState } from "react";
import Popup from "../assets/ui/popup";
import axios from "axios";
import { Trash2 } from "lucide-react";
import Toast from "../assets/ui/toast";

type Projects = {
  Title: string;
  Description: string;
  Link: string;
  PreviewLink: string;
  _id: string;
};

export default function ProjectSection() {
  const [ToastMessage, setToastMessage] = useState("");
  const [datas, setData] = useState<Projects[]>([]);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const req = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/projects`,
        { withCredentials: true }
      );
      setData(req.data.message[0].projects);
    };
    getData();
  }, []);

  const HandleSubmitProject = async (value: any) => {
    const transformData = {
      Title: value.Inp1,
      Description: value.Inp5,
      Link: value.Inp2,
      PreviewLink: value.Inp3,
    };

    try {
      const req = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/projects`,
        {
          Title: transformData.Title,
          Description: transformData.Description,
          Link: transformData.Link,
          PreviewLink: transformData.PreviewLink,
        },
        { withCredentials: true }
      );
      setData((prev) => [...prev, req.data.Project]);
      setToastMessage(req.data.message);
    } catch (err) {
      console.log(err);
    }
  };
  const handleDeleteProject = async (_id: string) => {
    const req = await axios.delete(
      `${import.meta.env.VITE_BACKEND_URL}/api/projects/${_id}`,
      { withCredentials: true }
    );
    setData((prev) => prev.filter((Project) => Project._id !== _id));
    setToastMessage(req.data.message);
  };
  return (
    <>
      {ToastMessage && <Toast message={ToastMessage} exit={setToastMessage} />}
      <div className="grid gap-4 w-full">
        {showPopup && (
          <div className="fixed inset-0 w-full top-0 left-0 bg-black/60">
            <Popup
              inpType="Project"
              input1={true}
              input2={true}
              input3={true}
              input5={true}
              showPopup={setShowPopup}
              handleSubmit={HandleSubmitProject}
            />
          </div>
        )}
        <div className="w-full grid gap-4">
          <div className="grid gap-4">
            {datas?.map((Project, idx) => (
              <div
                className="ring-1 ring-teal-600/40 p-2 rounded-lg bg-teal-700/10"
                key={Project._id || idx}
              >
                <div className="flex justify-between">
                  <p className="font-bold text-xl">{Project.Title}</p>
                  <Trash2
                    className="p-1 size-8 cursor-pointer hover:ring-red-600 hover:ring-1 rounded-lg hover:bg-red-700/60"
                    onClick={() => handleDeleteProject(Project._id)}
                  />
                </div>
                <div>{Project.Description}</div>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <a
                    href={`${Project.Link}`}
                    className="ring-1 ring-teal-700 cursor-pointer bg-teal-700/20 rounded-sm p-1 text-center"
                    target="_blank"
                  >
                    Code
                  </a>

                  <a
                    href={`${Project.PreviewLink}`}
                    className="ring-1 ring-teal-700 cursor-pointer bg-teal-700 rounded-sm p-1 text-center"
                    target="_blank"
                  >
                    Preview
                  </a>
                </div>
              </div>
            ))}
          </div>
          <button
            className="bg-white text-black w-full rounded-lg p-2 font-semibold cursor-pointer"
            onClick={() => {
              setShowPopup(true);
            }}
          >
            + Add Project
          </button>
        </div>
      </div>
    </>
  );
}
