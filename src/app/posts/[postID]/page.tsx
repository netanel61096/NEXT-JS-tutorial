//domain.co.il/posts/:postID

import { getPost } from "@/services/posts.server";
import PostActions from "@/components/PostActions";



interface PostView {
  params: {
    postID: string;
  };
}

export const dynamic= 'force-static'



export function generateMetadata(props: PostView) {
  return {
    title: `post ${props.params.postID}`,
    description: `post description ${props.params.postID}`,
  };
}


export default async function PostViewPage(props: PostView) {
  const { postID } = props.params;
  const { title, body ,updatedAt,updatedBy} = await getPost(postID);
  const updatedAtString=updatedAt.toDate().toLocaleString('en-GB')
  return (
    <>
      <header className="flex items-center mb-6">
        <div>
        <h1>{title}</h1>
        <div className="text-sm">{updatedBy.name} {updatedAtString}</div>

        </div>
        <PostActions postId={postID}/>
      </header>
      <p>{body}</p>
    </>
  );
}
