import { PostProps } from "@/types/posts";
import { motion } from "framer-motion";
import Link from "next/link";

const item = {
  hidden: { opacity: 0, y: 100 },
  show: { opacity: 1, y: 0 },
};


const BlogLink = motion.create(Link);

const BlogLayout: React.FC<PostProps> = ({title, description,published, link }) => {
  return (
    <BlogLink
      variants={item}
      href={link}
      target={"_self"}
      className=" text-sm md:text-base flex  items-center justify-between w-full relative rounded-lg overflow-hidden p-4 md:p-6 custom-bg"
    >
      <div className="flex items-center justify-center space-x-2">
        <h2 className="text-foreground">{title}</h2>
        <p className="text-muted hidden sm:inline-block">{description}</p>
      </div>
      <div className="self-end flex-1 mx-2 mb-1 bg-transparent border-b border-dashed border-muted" />
      <p className="text-muted sm:text-foreground">
        {new Date(published).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
      </p>
    </BlogLink>
  );
};

export default BlogLayout;
