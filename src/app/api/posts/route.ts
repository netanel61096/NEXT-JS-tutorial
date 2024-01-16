import { NextRequest, NextResponse } from "next/server";
import Post from "@/types/Post";
import {firestore} from "@/firebase/index";
import { isPostValid } from "@/services/posts.server";
import revalidate from '@/services/revalidate'
import {getServerSession} from 'next-auth'
import { authOptions } from "../auth/[...nextauth]/route";
import admin  from 'firebase-admin'


export async function POST(request: NextRequest) {
  const post: Post = await request.json();
  const session= await getServerSession(authOptions)



  if (!isPostValid(post)) {
    return new NextResponse("bad request: it`s not valid post", { status: 400 });
  }
  try {
    await firestore.collection("posts").doc().set({
      ...post,
      updatedBy: session?.user,
      updatedAt: admin.firestore.Timestamp.now()
    })

   await revalidate(['/posts'])

    console.log('post added successfully');
    return NextResponse.json({message:'post added successfully'})
  } catch (error) {
    console.error('Error adding post: ', error)
    return new NextResponse('internal Server Error', {status: 500});
    
  }
}
