"use client";

import { savePost } from "@/services/posts.client";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface postFormProps{
    postID?: string,
    title?: string,
    body?: string
}

export default function PostForm(props:postFormProps) {
  const [title, setTitle] = useState<string>(props?.title || "");
  const [body, setBody] = useState<string>(props?.body || "");
  const {push} = useRouter();
 
  async function onSubmit(e: React.FormEvent) {
    const postOrEdit=props.postID?"edited": "pushing"
    e.preventDefault();
    await savePost({id:props.postID, title, body });
    alert(`post ${postOrEdit} successfully`)
    push("/posts")
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="post-form-block">
        <label className="post-form-label">Title</label>
        <input
          className="post-form-input"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
      </div>
      <div className="post-form-block">
        <label className="post-form-label">Body</label>
        <textarea
          className="post-form-input"
          rows={20}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Body"
        />
      </div>
      <button type="submit" className="btn">
        SEND
      </button>
    </form>
  );
}
