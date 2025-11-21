import Popup from "../assets/ui/popup";

export default function SkillSection() {
  return (
    <>
      <div className="fixed inset-0 w-full top-0 left-0 bg-black/60">
        <Popup inpType="Skill" />
      </div>
      Skill section
    </>
  );
}
