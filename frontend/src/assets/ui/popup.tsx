import { X } from "lucide-react";
type popupProps = {
  inpType: string;
};
export default function Popup({ inpType }: popupProps) {
  return (
    <>
      <div className="grid place-items-center h-svh">
        <div className="grid bg-neutral-800 p-3 rounded-lg ring-[1px] ring-neutral-700 gap-4">
          <div className="flex items-center justify-between">
            <p className="font-bold text-2xl">{inpType} Input</p>
            <X />
          </div>
          {/* inp1 -heading  */}
          <div className="grid gap-1">
            <p className="text-sm font-light">InputLabel1</p>
            <input
              className="bg-neutral-700 ring-1 ring-neutral-500 rounded-md px-3 py-1 focus:ring-2 transition-all outline-none"
              type="text"
              placeholder="Input 1"
            />
          </div>
          {/* inp2 - code link */}

          {/* inp-3 - github link */}

          {/* inp-4 - level */}
          <div className="grid gap-1">
            <p className="text-sm font-light">level</p>
            <input
              className="accent-neutral-700 "
              min={0}
              max={100}
              type="range"
              placeholder="Input 2"
            />
          </div>
          {/* inp-5 - extra */}

          <button className="bg-white px-3 py-1 w-full text-black font-semibold rounded-lg">
            submit
          </button>
        </div>
      </div>
    </>
  );
}
