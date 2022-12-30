import { db } from '../firebase/config'
import { addDoc, collection, Timestamp } from 'firebase/firestore'
import UploadImage from './UploadImage'
import UpdatePost from './UpdatePost'

export async function AddPost(post, image, userId) {

    const postsRef = collection(db, 'posts')
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    const postId = await (await addDoc(postsRef, post)).id
    post.imageLink = await UploadImage(image, (postId + "+" + userId), false)
    post.data = Timestamp.now().toDate().toLocaleDateString(undefined, options)

    await UpdatePost(postId, post)

}