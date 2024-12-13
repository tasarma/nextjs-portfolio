import { BtnListProps } from "@/types/navigation";
import { ProjectsDataProps } from "@/types/projects";

export const projectsData: ProjectsDataProps[] = [
  {
    id: 1,
    name: "E-commercce",
    description: "Tailored E-commerce for Pharmacies",
    date: "2024-12-05",
    demoLink: "https://github.com/tasarma/e-commerce",
  },
  {
    id: 2,
    name: "GraphQL",
    description: "GraphQL and Apollo Server",
    date: "2022-11-22",
    demoLink: "https://github.com/tasarma/GraphQL-and-Apollo-Server",
  },
  {
    id: 3,
    name: "NVIM",
    description: "Setting Up Nvim",
    date: "2023-02-15",
    demoLink: "https://github.com/tasarma/nvim",
  },
];

export const BtnList: BtnListProps[] = [
  { label: "Home", link: "/", icon: "home", newTab: false },
  { label: "About", link: "/about", icon: "about", newTab: false },
  { label: "Projects", link: "/projects", icon: "projects", newTab: false },
  { label: "Contact", link: "/contact", icon: "mail", newTab: false },
  { label: "Articles", link: "/posts", icon: "library", newTab: false },
  {
    label: "Github",
    link: "https://www.github.com/tasarma",
    icon: "github",
    newTab: true,
  },
  {
    label: "LinkedIn",
    link: "https://www.linkedin.com/in/daratasar/",
    icon: "linkedin",
    newTab: true,
  },
];


