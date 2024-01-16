import { NextRequest, NextResponse } from "next/server";
import { firestore } from "@/firebase";
import Post from "@/types/Post";
import {isPostValid} from '@/services/posts.server';
import revalidate from '@/services/revalidate';
import {getServerSession} from 'next-auth'
import { authOptions } from "../../auth/[...nextauth]/route";
import admin  from 'firebase-admin'



//PUT/api/posts/:postId
export async function PUT(
  request: NextRequest,
  Context: { params: { postId: string } }
) {
  try {
    const { postId } = Context.params;
    const post: Post = await request.json();
    const session= await getServerSession(authOptions)



    if (!(postId && isPostValid(post))) {
      return new NextResponse("bad request: it`s not valid post", { status: 400 });
    }

    await firestore.collection("posts").doc(postId).set({
      title: post.title,
      body: post.body,
      updatedBy: session?.user,
      updatedAt: admin.firestore.Timestamp.now()
    });

   await revalidate(['/posts',`/posts/${postId}`,`/posts/${postId}/edit`])
    

    console.log(" post edited successfuly");
    return NextResponse.json({message: " post edited successfuly"})
  } catch (error) {
    console.error("Error editing post:", error)
    return new NextResponse("internal Server Error",{status: 500})
  }
}

//DELETE/api/posts/:postId
export async function DELETE(
  request: NextRequest,
  Context: { params: { postId: string } }
) {
  const {postId}=Context.params;

  if(!postId){
    return new NextResponse('bad request: not postid find',{status:400})
  }

  try {
    await firestore.collection('posts').doc(postId).delete();
    await revalidate(['/posts',`/posts/${postId}`])
    console.log('Post Deleted successfully');
    return NextResponse.json({message:'Post Deleted successfully' })
    
  } catch (error) {
    console.error("Error deleting post:", error)
    return new NextResponse("internal Server Error",{status: 500})
  }


}


