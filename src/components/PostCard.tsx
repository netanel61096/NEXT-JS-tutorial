import Link from "next/link"
import Image from "next/image"
import Post from "@/types/Post"




export default function POstCard(props: Post){
    const {id:postId,title,body}=props;
    const titleForImage =title.replace(' ', '').slice(0,2).toUpperCase();
    return(
        <li className="rounded-3xl shadow-lg bg-neutral-700">
            <Image className="rounded-t-3xl	" src={`https://fakeimg.pl/600x400?text=${titleForImage}&font=bebas`} width="600" height="400"  alt={title}/>
            <Link href={`/posts/${postId}`}>
                <div className="p-4">
                    <h4 className="text-xl text-neutral-50 font-medium">{title}</h4>
                    <p className="text-neutral-300">{body.slice(0,50)}</p>
                </div>
            </Link>
        </li>
    )
}