//domain.co.il/posts/new

import PostForm from "@/components/PostForm";

export const metadata = {
    title: "New Post | Next.js tutorial",
    description: "New Post description | Next.js tutorial",
  };

export const dynamic= 'force-static'


export default function NewPage(){
    return(
        <>
        <header>
            <h1>new Post page</h1>
        </header>

        <PostForm/>
        </>
    )
}