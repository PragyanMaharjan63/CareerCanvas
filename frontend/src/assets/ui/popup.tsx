import { X } from "lucide-react";
import React, { useState, type SetStateAction } from "react";
type popupProps = {
  inpType: string;
  input1?: boolean;
  input2?: boolean;
  input3?: boolean;
  input4?: boolean;
  input5?: boolean;
  setData: React.Dispatch<SetStateAction<any>>;
  showPopup: React.Dispatch<SetStateAction<boolean>>;
  handleSubmit: (data: any) => void;
};
export default function Popup({
  inpType,
  input1,
  input2,
  input3,
  input4,
  input5,
  setData,
  showPopup,
  handleSubmit,
}: popupProps) {
  const [Inp1, setInp1] = useState("");
  const [Inp2, setInp2] = useState("");
  const [Inp3, setInp3] = useState("");
  const [Inp4, setInp4] = useState("0");
  const [Inp5, setInp5] = useState("");

  const submitData = () => {
    const data: { [key: string]: string | number } = {};
    if (input1) data.Inp1 = Inp1;
    if (input2) data.Inp2 = Inp2;
    if (input3) data.Inp3 = Inp3;
    if (input4) data.Inp4 = Number(Inp4);
    if (input5) data.Inp5 = Inp5;
    setData(data);
    handleSubmit(data);
    showPopup(false);
  };

  return (
    <>
      <div className="grid place-items-center h-svh">
        <div className="grid bg-neutral-800 p-5 rounded-lg gap-4">
          <div className="flex items-center justify-between">
            <p className="font-bold text-2xl">{inpType} Input</p>
            <X
              className="cursor-pointer hover:bg-neutral-500 rounded-lg p-2 size-10 transition-all"
              onClick={() => showPopup(false)}
            />
          </div>
          {/* inp1 -heading  */}
          {input1 && (
            <div className="grid gap-1">
              <p className="text-sm font-light">{inpType} Name</p>
              <input
                className="bg-neutral-700 ring-1 ring-neutral-500 rounded-md px-3 py-1 focus:ring-2 transition-all outline-none"
                type="text"
                value={Inp1}
                onChange={(e) => setInp1(e.target.value)}
                placeholder="Input 1"
              />
            </div>
          )}
          {/* inp2 - code link */}
          {input2 && (
            <div className="grid gap-1">
              <p className="text-sm font-light">InputLabel1</p>
              <input
                className="bg-neutral-700 ring-1 ring-neutral-500 rounded-md px-3 py-1 focus:ring-2 transition-all outline-none"
                type="text"
                value={Inp2}
                onChange={(e) => setInp2(e.target.value)}
                placeholder="Input 1"
              />
            </div>
          )}
          {/* inp-3 - github link */}
          {input3 && (
            <div className="grid gap-1">
              <p className="text-sm font-light">InputLabel1</p>
              <input
                className="bg-neutral-700 ring-1 ring-neutral-500 rounded-md px-3 py-1 focus:ring-2 transition-all outline-none"
                type="text"
                value={Inp3}
                onChange={(e) => setInp3(e.target.value)}
                placeholder="Input 1"
              />
            </div>
          )}
          {/* inp-4 - level */}
          {input4 && (
            <div className="grid gap-1">
              <div className="flex justify-between">
                <p className="text-sm font-light">Confidence level</p>
                <p className="text-sm font-light">{Inp4}</p>
              </div>
              <input
                className="accent-neutral-700 "
                min={0}
                max={100}
                value={Inp4}
                onChange={(e) => setInp4(e.target.value)}
                type="range"
                placeholder="Input 2"
              />
            </div>
          )}
          {/* inp-5 - extra */}
          {input5 && (
            <div className="grid gap-1">
              <p className="text-sm font-light">InputLabel1</p>
              <input
                className="bg-neutral-700 ring-1 ring-neutral-500 rounded-md px-3 py-1 focus:ring-2 transition-all outline-none"
                type="text"
                value={Inp5}
                onChange={(e) => setInp5(e.target.value)}
                placeholder="Input 1"
              />
            </div>
          )}
          <button
            className="bg-white cursor-pointer px-3 py-2 w-full text-black font-semibold rounded-lg"
            onClick={() => {
              submitData();
            }}
          >
            Add {inpType}
          </button>
        </div>
      </div>
    </>
  );
}
