'use client'

import React from "react";
import { convertHeadingsToFormat } from "@/lib/utils";

interface TableOfContentsProps {
  headings: string[];
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ headings }) => {
  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    heading: string
  ) => {
    e.preventDefault();
    const targetElement = document.getElementById(heading);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="mt-8 rounded-lg">
      <h2 className="text-xl md:text-2xl text-left w-full capitalize">
        Table of Contents
      </h2>
      <ul className="space-y-2">
        {headings.map((heading, index) => (
          <li key={index}>
            <a
              href={`#${convertHeadingsToFormat(heading)}`}
              className="text-yellow-200 hover:underline"
              onClick={(e) => scrollToSection(e, `${convertHeadingsToFormat(heading)}`)}
            >
              {heading}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TableOfContents;
