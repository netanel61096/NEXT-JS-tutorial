//domain.co.il/posts/:postID/edit

import PostForm from "@/components/PostForm"
import { getPost } from "@/services/posts.server";

export const metadata = {
    title: "Edit Post | Next.js tutorial",
    description: "Edit Post description | Next.js tutorial",
  };

  export const dynamic= 'force-static'


interface PostEdit{
    params:{
        postID:string
    }
}

export default async function PostEditPage(props:PostEdit){
    const {postID}=props.params
    const post =await getPost(postID)
    return(
        <>
        <header>
            <h1>PostEdit {postID} page</h1>
        </header>

        <PostForm postID={postID} title={post.title} body={post.body}/>
        </>
    )
}