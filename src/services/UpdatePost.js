import { db } from '../firebase/config'
import { updateDoc, doc } from 'firebase/firestore'

export default async function UpdatePost(postId, postUpdated){
    const postDoc = doc(db, 'posts', postId)
    await updateDoc(postDoc, postUpdated)
}