import Image from "next/image";
import bg from "@/public/background/projects-background.png";
import ProjectList from "@/components/projects";
import RenderModel from "@/components/RenderModel";
import dynamic from "next/dynamic";
import { projectsData } from "@/lib/data";

const Staff = dynamic(() => import("@/components/models/Staff"), {
  ssr: false,
});

export const metadata = {
  title: "Projects",
};

export default function Home() {
  return (
    <>
      <Image
        src={bg}
        alt="Project page background image"
        className="-z-50 fixed top-0 left-0 w-full h-full object-cover object-center opacity-50"
        priority
        sizes="100vw"
      />

      <ProjectList projects={projectsData} />

      <div className="flex items-center justify-center top-16  lg:top-20 -z-10 left-1/2 lg:-left-24">
        <RenderModel>
          <Staff />
        </RenderModel>
      </div>
    </>
  );
}
