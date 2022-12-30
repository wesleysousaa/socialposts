import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase/config";

export async function DeletePost(post){
    const postDoc = doc(db, 'posts', post.id)
    await deleteDoc(postDoc)
}