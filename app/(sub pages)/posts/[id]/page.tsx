import { getPostData, getAllPostIds } from "@/lib/posts";
import TableOfContents from "@/components/TableOfContents";
import '../../../../style/post-content.css';


export async function generateStaticParams() {
  const paths = getAllPostIds();
  return paths;
}

export default async function Post({ params }: { params: { id: string } }) {
  const postData = await getPostData(`${params.id}.md`);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <aside className="sticky top-8">
            <h1 className="text-3xl font-bold mb-4">{postData.title}</h1>
            <div className="text-gray-500 mb-2">
              Published on {postData.published}
            </div>
            {postData.edited !== postData.published && (
              <div className="text-gray-500 mb-4">
                Last edited on {postData.edited}
              </div>
            )}
            <TableOfContents headings={postData.headings} />
          </aside>
        </div>
        <div className="md:col-span-2">
          <article
            className="prose lg:prose-xl max-w-none post-content"
            dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
          />
        </div>
      </div>
    </div>
  );
}

