"use client";

import { motion } from "framer-motion";
import BlogLayout from "./BlogLayout";
import React from "react";
import { PostDataProps } from "@/types/posts";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 1.5,
    },
  },
};

type PostListProps = {
  posts: Omit<PostDataProps, 'contentHtml'>[];
}

const BlogList: React.FC<PostListProps> = ({ posts }) => {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="w-full max-w-auto  xl:max-w-4xl px-4 mx-auto lg:px-16 space-y-6 md:space-y-8 flex flex-col items-center"
    >
      {posts.map((post, index) => {
        return <BlogLayout key={index} {...post} />;
      })}
    </motion.div>
  );
};

export default BlogList;
