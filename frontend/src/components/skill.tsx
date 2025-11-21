import { useState } from "react";
import Popup from "../assets/ui/popup";

export default function SkillSection() {
  const [datas, setData] = useState();
  const [showPopup, setShowPopup] = useState(true);
  return (
    <>
      {showPopup && (
        <div className="fixed inset-0 w-full top-0 left-0 bg-black/60">
          <Popup
            inpType="Skill"
            input1={true}
            input4={true}
            setData={setData}
            showPopup={setShowPopup}
          />
        </div>
      )}
      {JSON.stringify(datas)}
      Skill section
    </>
  );
}
