import { db } from '../firebase/config'
import { getDocs, collection } from 'firebase/firestore'

function compare(a, b) {
    return b.dataOrd - a.dataOrd;
}

export async function FetchPosts() {
    const postsRef = collection(db, 'posts')

    const data = await getDocs(postsRef)

    let dataLiquida = []
    await data.docs.map(post => {

        const p = {
            id: post.id,
            uid: post.data().uid,
            title: post.data().description,
            imageLink: post.data().imageLink,
            hashtags: post.data().hashtags,
            data: post.data().data,
            likes: post.data().likes,
            dataOrd: post._document.createTime.timestamp.toDate()
        }
        dataLiquida.push(p)
    })
    dataLiquida = dataLiquida.sort(compare)
    return dataLiquida
}