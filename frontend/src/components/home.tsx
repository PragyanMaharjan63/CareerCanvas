import GoalSection from "./goals";
import ProjectSection from "./projects";
import SkillSection from "./skill";

export default function Home() {
  return (
    <>
      <div className="absolute w-full top-10">
        <div className="grid  gap-4">
          <div className="flex items-center  justify-between  bg-neutral-800 rounded-2xl p-3 mx-3">
            <div>
              <p className="text-xl font-bold">UserName</p>
              <p>Position</p>
            </div>
            <div className="size-20 bg-neutral-700 rounded-full flex justify-center items-center">
              photo
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
